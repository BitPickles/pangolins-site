// Fetch live monitoring data for the Pangolins USDT vault on Lista Lending (BSC)
// and write a static snapshot to lib/content/monitoring-live-usdt.json.
//
// Sources (all public, no API keys):
//   - BSC JSON-RPC      : vault ERC4626 reads (TVL, share price), BSC USDT supply,
//                         gas price, block cadence
//   - DeFiLlama yields  : vault APY + TVL daily history (pool uuid)
//   - DeFiLlama protocol: Lista Lending multi-chain TVL (+ history) and utilization
//   - CoinGecko         : USDT peg and BNB price
//
// Mirrors scripts/fetch-monitoring.mjs: every source fails over to the previous
// snapshot, and self-accumulated series seed flat on first run.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../lib/content/monitoring-live-usdt.json");

const VAULT = "0xeb4f6ffb1038e1cca701e7d53083b37ec5b6ba33";
const USDT = "0x55d398326f99059fF775485246999027B3197955"; // USDT on BSC (18 decimals)
const YIELDS_POOL = "3b24b57f-0be8-4e4a-a6d6-a69d3cbd87fc"; // DeFiLlama yields pool for this vault
const BSC_RPCS = [
  process.env.BSC_RPC_URL,
  "https://bsc-dataseed.bnbchain.org",
  "https://bsc-dataseed1.binance.org",
  "https://rpc.ankr.com/bsc"
].filter(Boolean);

const SERIES_MAX = 14;
const SERIES_SEED = 7;

async function getJson(url, init) {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

// Try each BSC RPC in turn until one answers.
async function rpc(method, params) {
  let lastErr;
  for (const url of BSC_RPCS) {
    try {
      const data = await getJson(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params })
      });
      if (data.error) throw new Error(data.error.message);
      return data.result;
    } catch (err) {
      lastErr = err;
    }
  }
  throw new Error(`all BSC RPCs failed for ${method}: ${lastErr?.message}`);
}

async function ethCall(to, data) {
  return rpc("eth_call", [{ to, data }, "latest"]);
}

function pushSeries(prev, value, max = SERIES_MAX, seed = SERIES_SEED) {
  const base = Array.isArray(prev) && prev.length > 0 ? prev.slice() : Array(seed).fill(value);
  base.push(value);
  return base.slice(-max).map((n) => Number(Number(n).toFixed(8)));
}

function seriesFromPoints(points, count = 8) {
  return points
    .slice()
    .sort((a, b) => a.x - b.x)
    .slice(-count)
    .map((p) => Number(p.y));
}

async function main() {
  let prev = {};
  try {
    prev = JSON.parse(await readFile(OUT_PATH, "utf8"));
  } catch {
    prev = {};
  }
  const prevSeries = prev.series || {};
  const prevCurrent = prev.current || {};
  const sources = {};

  const tryRun = async (key, fn, fallback) => {
    try {
      const out = await fn();
      sources[key] = "ok";
      return out;
    } catch (err) {
      sources[key] = `error: ${err.message}`;
      console.error(`[fetch-lista] ${key} failed:`, err.message);
      return fallback;
    }
  };

  // --- BSC RPC: vault ERC4626 reads, USDT supply, gas, block cadence ---
  const onchain = await tryRun(
    "bscRpc",
    async () => {
      const totalAssets = Number(BigInt(await ethCall(VAULT, "0x01e1d114"))) / 1e18; // totalAssets()
      const totalSupply = Number(BigInt(await ethCall(VAULT, "0x18160ddd"))) / 1e18; // totalSupply()
      const sharePrice = totalSupply > 0 ? totalAssets / totalSupply : 1;
      const usdtSupply = Number(BigInt(await ethCall(USDT, "0x18160ddd"))) / 1e18;
      const gasGwei = Number(BigInt(await rpc("eth_gasPrice", []))) / 1e9;
      const latest = await rpc("eth_getBlockByNumber", ["latest", false]);
      const latestNum = Number(BigInt(latest.number));
      const back = 200;
      const earlier = await rpc("eth_getBlockByNumber", ["0x" + (latestNum - back).toString(16), false]);
      const blockTime = Number(
        ((Number(BigInt(latest.timestamp)) - Number(BigInt(earlier.timestamp))) / back).toFixed(3)
      );
      return { totalAssets, totalSupply, sharePrice, usdtSupply, gasGwei, blockNumber: latestNum, blockTime };
    },
    {
      totalAssets: prevCurrent.vaultTvlUsd,
      totalSupply: prevCurrent.vaultShares,
      sharePrice: prevCurrent.sharePrice,
      usdtSupply: prevCurrent.bscUsdtSupply,
      gasGwei: prevCurrent.gasGwei,
      blockNumber: prevCurrent.blockNumber,
      blockTime: prevCurrent.blockTime
    }
  );

  // --- DeFiLlama yields: vault APY + TVL daily history ---
  const yields = await tryRun(
    "defillamaYields",
    async () => {
      const d = await getJson(`https://yields.llama.fi/chart/${YIELDS_POOL}`);
      const pts = (d.data || []).map((p) => ({
        x: Math.floor(new Date(p.timestamp).getTime() / 1000),
        tvl: p.tvlUsd,
        apy: p.apy
      }));
      const sorted = pts.sort((a, b) => a.x - b.x);
      const latest = sorted[sorted.length - 1] || {};
      return {
        apy: latest.apy != null ? latest.apy / 100 : undefined,
        tvlSeries: seriesFromPoints(sorted.map((p) => ({ x: p.x, y: p.tvl })))
      };
    },
    { apy: prevCurrent.vaultApy, tvlSeries: prevSeries.vaultTvl }
  );

  // --- DeFiLlama protocol: Lista Lending multi-chain TVL + utilization ---
  const lista = await tryRun(
    "defillama",
    async () => {
      const d = await getJson("https://api.llama.fi/protocol/lista-lending");
      const ct = d.currentChainTvls || {};
      const bsc = ct.Binance ?? ct.BSC ?? 0;
      const eth = ct.Ethereum ?? 0;
      const borrowed = ct.borrowed ?? (ct["Binance-borrowed"] ?? 0) + (ct["Ethereum-borrowed"] ?? 0);
      const isTvlKey = (k) => !k.includes("-") && !/staking|pool2|borrowed/i.test(k);
      let total = 0;
      for (const [k, v] of Object.entries(ct)) {
        if (isTvlKey(k) && typeof v === "number") total += v;
      }
      const utilization = total > 0 ? borrowed / total : 0;
      const chainHist = d.chainTvls || {};
      const histArr = (chain) =>
        (chainHist[chain]?.tvl || []).map((p) => ({ x: p.date, y: p.totalLiquidityUSD }));
      const bscHist = seriesFromPoints(histArr("Binance").length ? histArr("Binance") : histArr("BSC"));
      const ethHist = seriesFromPoints(histArr("Ethereum"));
      return {
        bsc,
        eth,
        total,
        borrowed,
        utilization,
        bscSeries: bscHist.length ? bscHist : undefined,
        ethSeries: ethHist.length ? ethHist : undefined
      };
    },
    {
      bsc: prevCurrent.listaBscTvl,
      eth: prevCurrent.listaEthTvl,
      total: prevCurrent.listaTotalTvl,
      borrowed: prevCurrent.listaBorrowed,
      utilization: prevCurrent.listaUtilization,
      bscSeries: prevSeries.listaBsc,
      ethSeries: prevSeries.listaEth
    }
  );

  // --- CoinGecko: USDT peg + BNB price ---
  const prices = await tryRun(
    "coingecko",
    async () => {
      const d = await getJson(
        "https://api.coingecko.com/api/v3/simple/price?ids=tether,binancecoin&vs_currencies=usd"
      );
      const usdt = d.tether?.usd;
      const bnb = d.binancecoin?.usd;
      if (!usdt || !bnb) throw new Error("missing price");
      return { usdtPrice: usdt, bnbPrice: bnb, pegBasisPct: (usdt - 1) * 100 };
    },
    {
      usdtPrice: prevCurrent.usdtPrice,
      bnbPrice: prevCurrent.bnbPrice,
      pegBasisPct: prevCurrent.pegBasisPct
    }
  );

  // --- Lista moolah API: this vault's own utilization + available liquidity ---
  const moolah = await tryRun(
    "listaApi",
    async () => {
      const d = await getJson(
        "https://api.lista.org/api/moolah/vault/list?sort=depositsUsd&order=desc&keyword=&zone=0&chain=bsc,ethereum"
      );
      const list = d?.data?.list ?? d?.data ?? [];
      const row = (Array.isArray(list) ? list : []).find(
        (v) => (v.address || "").toLowerCase() === VAULT.toLowerCase()
      );
      if (!row) throw new Error("vault not found in moolah list");
      const util = Number(row.utilization);
      const depositsUsd = Number(row.depositsUsd);
      // Single-curated lending pool: immediately withdrawable ≈ unborrowed deposits.
      return { vaultUtilization: util, availableLiquidityUsd: depositsUsd * (1 - util) };
    },
    {
      vaultUtilization: prevCurrent.vaultUtilization,
      availableLiquidityUsd: prevCurrent.availableLiquidityUsd
    }
  );

  const series = {
    vaultTvl: yields.tvlSeries && yields.tvlSeries.length ? yields.tvlSeries : prevSeries.vaultTvl,
    listaBsc: lista.bscSeries && lista.bscSeries.length ? lista.bscSeries : prevSeries.listaBsc,
    listaEth: lista.ethSeries && lista.ethSeries.length ? lista.ethSeries : prevSeries.listaEth,
    utilization: pushSeries(prevSeries.utilization, (lista.utilization || 0) * 100),
    sharePrice: pushSeries(prevSeries.sharePrice, onchain.sharePrice || 1),
    pegBasis: pushSeries(prevSeries.pegBasis, prices.pegBasisPct || 0),
    bscUsdtSupply: pushSeries(prevSeries.bscUsdtSupply, onchain.usdtSupply || 0),
    gas: pushSeries(prevSeries.gas, onchain.gasGwei || 0),
    blockTime: pushSeries(prevSeries.blockTime, onchain.blockTime || 0),
    bnbPrice: pushSeries(prevSeries.bnbPrice, prices.bnbPrice || 0)
  };

  const snapshot = {
    generatedAt: new Date().toISOString(),
    sources,
    current: {
      vaultTvlUsd: onchain.totalAssets,
      vaultShares: onchain.totalSupply,
      sharePrice: onchain.sharePrice,
      vaultApy: yields.apy,
      listaBscTvl: lista.bsc,
      listaEthTvl: lista.eth,
      listaTotalTvl: lista.total,
      listaBorrowed: lista.borrowed,
      listaUtilization: lista.utilization,
      vaultUtilization: moolah.vaultUtilization,
      availableLiquidityUsd: moolah.availableLiquidityUsd,
      usdtPrice: prices.usdtPrice,
      pegBasisPct: prices.pegBasisPct,
      bnbPrice: prices.bnbPrice,
      bscUsdtSupply: onchain.usdtSupply,
      gasGwei: onchain.gasGwei,
      blockNumber: onchain.blockNumber,
      blockTime: onchain.blockTime
    },
    series
  };

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(snapshot, null, 2) + "\n");

  const okCount = Object.values(sources).filter((s) => s === "ok").length;
  console.log(`[fetch-lista] wrote ${OUT_PATH}`);
  console.log(`[fetch-lista] sources: ${JSON.stringify(sources)} (${okCount} ok)`);
  console.log(
    `[fetch-lista] vault TVL $${(onchain.totalAssets / 1e6).toFixed(2)}M · APY ${((yields.apy || 0) * 100).toFixed(2)}% · ` +
      `share ${onchain.sharePrice?.toFixed(4)} · peg ${prices.pegBasisPct?.toFixed(3)}% · ` +
      `Lista $${(lista.total / 1e6).toFixed(0)}M (util ${(lista.utilization * 100).toFixed(1)}%)`
  );
}

main().catch((err) => {
  console.error("[fetch-lista] fatal:", err);
  process.exit(1);
});
