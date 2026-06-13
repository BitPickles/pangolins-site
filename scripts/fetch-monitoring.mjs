// Fetch live monitoring data for the Pangolins USDC vault and write a static
// snapshot to lib/content/monitoring-live.json.
//
// Sources (all public, no API keys):
//   - Morpho GraphQL  : vault TVL (+ daily history), net APY, market utilization
//   - Base JSON-RPC   : cbBTC supply, Base USDC supply, gas price, block cadence
//   - CoinGecko       : BTC / cbBTC spot price -> price basis
//   - DeFiLlama       : Morpho protocol multi-chain TVL (+ daily history)
//
// Every source is wrapped so a single failure never aborts the run: the field
// falls back to the previous snapshot, and the source is flagged in `sources`.
// Self-accumulated series (cbBTC supply, USDC supply, gas, utilization, block
// time) grow by one point per run; on first run they are seeded flat at the
// current value so charts always have enough points to render.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../lib/content/monitoring-live.json");

const VAULT = "0x1401d1271C47648AC70cBcdfA3776D4A87CE006B";
const CHAIN_ID = 8453; // Base
const BASE_RPC = process.env.BASE_RPC_URL || "https://mainnet.base.org";
const CBBTC = "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf"; // cbBTC on Base (8 decimals)
const USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // USDC on Base (6 decimals)

const SERIES_MAX = 14; // ~3.5 days of history at the 6h cadence
const SERIES_SEED = 7; // minimum points so sparklines render on first run

async function getJson(url, init) {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

async function rpc(method, params) {
  const body = { jsonrpc: "2.0", id: 1, method, params };
  const data = await getJson(BASE_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (data.error) throw new Error(`RPC ${method}: ${data.error.message}`);
  return data.result;
}

async function erc20TotalSupply(token, decimals) {
  const hex = await rpc("eth_call", [{ to: token, data: "0x18160ddd" }, "latest"]);
  return Number(BigInt(hex)) / 10 ** decimals;
}

async function morphoQuery(query) {
  const data = await getJson("https://api.morpho.org/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });
  if (data.errors) throw new Error(`Morpho: ${data.errors[0]?.message}`);
  return data.data;
}

// Push a fresh sample onto a rolling series, seeding flat on first observation.
function pushSeries(prev, value, max = SERIES_MAX, seed = SERIES_SEED) {
  const base = Array.isArray(prev) && prev.length > 0 ? prev.slice() : Array(seed).fill(value);
  base.push(value);
  return base.slice(-max).map((n) => Number(Number(n).toFixed(6)));
}

// Convert a [{x,y}] timeseries (oldest..newest in either order) to a values array.
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

  // helper: run a source, fall back to previous values on failure
  const tryRun = async (key, fn, fallback) => {
    try {
      const out = await fn();
      sources[key] = "ok";
      return out;
    } catch (err) {
      sources[key] = `error: ${err.message}`;
      console.error(`[fetch-monitoring] ${key} failed:`, err.message);
      return fallback;
    }
  };

  // --- Morpho vault: TVL, APY, utilization, daily TVL history ---
  const morpho = await tryRun(
    "morpho",
    async () => {
      const d = await morphoQuery(`query {
        vaultByAddress(address: "${VAULT}", chainId: ${CHAIN_ID}) {
          state {
            totalAssetsUsd
            netApy
            allocation { market { collateralAsset { symbol } state { utilization } } supplyAssetsUsd }
          }
          historicalState { totalAssetsUsd(options: { interval: DAY }) { x y } }
        }
      }`);
      const v = d.vaultByAddress;
      const st = v.state;
      // utilization weighted by supplied USD across funded markets
      let wSum = 0;
      let wTot = 0;
      for (const a of st.allocation || []) {
        const u = a.market?.state?.utilization;
        if (u != null && a.supplyAssetsUsd > 0) {
          wSum += u * a.supplyAssetsUsd;
          wTot += a.supplyAssetsUsd;
        }
      }
      const utilization = wTot > 0 ? wSum / wTot : 0;
      const tvlSeries = seriesFromPoints(v.historicalState?.totalAssetsUsd || []);
      return {
        tvlUsd: st.totalAssetsUsd,
        netApy: st.netApy,
        utilization,
        tvlSeries
      };
    },
    {
      tvlUsd: prevCurrent.vaultTvlUsd,
      netApy: prevCurrent.netApy,
      utilization: prevCurrent.utilization,
      tvlSeries: prevSeries.vaultTvl
    }
  );

  // --- DeFiLlama: Morpho multi-chain TVL (Ethereum / Base / Others) ---
  const multichain = await tryRun(
    "defillama",
    async () => {
      const d = await getJson("https://api.llama.fi/protocol/morpho-blue");
      const ct = d.currentChainTvls || {};
      const isTvlKey = (k) => !k.includes("-") && !/staking|pool2|borrowed/i.test(k);
      const eth = ct.Ethereum || 0;
      const base = ct.Base || 0;
      let total = 0;
      for (const [k, val] of Object.entries(ct)) {
        if (isTvlKey(k) && typeof val === "number") total += val;
      }
      const other = Math.max(0, total - eth - base);

      // historical per-chain series (totalLiquidityUSD by day)
      const chainHist = d.chainTvls || {};
      const histArr = (chain) => (chainHist[chain]?.tvl || []).map((p) => ({ x: p.date, y: p.totalLiquidityUSD }));
      const ethHist = seriesFromPoints(histArr("Ethereum"));
      const baseHist = seriesFromPoints(histArr("Base"));
      return {
        eth,
        base,
        other,
        total,
        ethSeries: ethHist.length ? ethHist : undefined,
        baseSeries: baseHist.length ? baseHist : undefined
      };
    },
    {
      eth: prevCurrent.multichainEth,
      base: prevCurrent.multichainBase,
      other: prevCurrent.multichainOther,
      total: prevCurrent.multichainTotal,
      ethSeries: prevSeries.multichainEth,
      baseSeries: prevSeries.multichainBase
    }
  );

  // --- Base RPC: cbBTC supply, USDC supply, gas, block cadence ---
  const cbbtcSupply = await tryRun(
    "baseRpc",
    () => erc20TotalSupply(CBBTC, 8),
    prevCurrent.cbbtcSupply
  );
  // USDC supply, gas and block cadence reuse the same RPC; only flag baseRpc once.
  let usdcSupply = prevCurrent.usdcSupply;
  let gasGwei = prevCurrent.gasGwei;
  let blockNumber = prevCurrent.blockNumber;
  let blockTime = prevCurrent.blockTime;
  if (sources.baseRpc === "ok") {
    try {
      usdcSupply = await erc20TotalSupply(USDC, 6);
      gasGwei = Number(BigInt(await rpc("eth_gasPrice", [])).toString()) / 1e9;
      const latest = await rpc("eth_getBlockByNumber", ["latest", false]);
      const latestNum = Number(BigInt(latest.number));
      const back = 200;
      const earlier = await rpc("eth_getBlockByNumber", ["0x" + (latestNum - back).toString(16), false]);
      const dt = Number(BigInt(latest.timestamp)) - Number(BigInt(earlier.timestamp));
      blockNumber = latestNum;
      blockTime = Number((dt / back).toFixed(3));
    } catch (err) {
      sources.baseRpc = `partial: ${err.message}`;
      console.error("[fetch-monitoring] baseRpc partial:", err.message);
    }
  }

  // --- CoinGecko: BTC / cbBTC price basis ---
  const prices = await tryRun(
    "coingecko",
    async () => {
      const d = await getJson(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,coinbase-wrapped-btc&vs_currencies=usd"
      );
      const btc = d.bitcoin?.usd;
      const cb = d["coinbase-wrapped-btc"]?.usd;
      if (!btc || !cb) throw new Error("missing price");
      return { btcPrice: btc, cbbtcPrice: cb, basisPct: (cb / btc - 1) * 100 };
    },
    {
      btcPrice: prevCurrent.btcPrice,
      cbbtcPrice: prevCurrent.cbbtcPrice,
      basisPct: prevCurrent.basisPct
    }
  );

  // cbBTC notional held on Base (supply * price) — a transparent proxy for
  // "Base liquidity" until a real DEX-depth source is wired in (phase 2).
  const cbbtcBaseNotional =
    cbbtcSupply != null && prices.cbbtcPrice != null ? cbbtcSupply * prices.cbbtcPrice : prevCurrent.cbbtcBaseNotional;

  const series = {
    vaultTvl: morpho.tvlSeries && morpho.tvlSeries.length ? morpho.tvlSeries : prevSeries.vaultTvl,
    multichainEth: multichain.ethSeries && multichain.ethSeries.length ? multichain.ethSeries : prevSeries.multichainEth,
    multichainBase: multichain.baseSeries && multichain.baseSeries.length ? multichain.baseSeries : prevSeries.multichainBase,
    utilization: pushSeries(prevSeries.utilization, (morpho.utilization || 0) * 100),
    cbbtcSupply: pushSeries(prevSeries.cbbtcSupply, cbbtcSupply || 0),
    cbbtcBaseNotional: pushSeries(prevSeries.cbbtcBaseNotional, cbbtcBaseNotional || 0),
    cbbtcBasis: pushSeries(prevSeries.cbbtcBasis, prices.basisPct || 0),
    usdcSupply: pushSeries(prevSeries.usdcSupply, usdcSupply || 0),
    blockTime: pushSeries(prevSeries.blockTime, blockTime || 0),
    gas: pushSeries(prevSeries.gas, gasGwei || 0)
  };

  const snapshot = {
    generatedAt: new Date().toISOString(),
    sources,
    current: {
      vaultTvlUsd: morpho.tvlUsd,
      netApy: morpho.netApy,
      utilization: morpho.utilization,
      multichainEth: multichain.eth,
      multichainBase: multichain.base,
      multichainOther: multichain.other,
      multichainTotal: multichain.total,
      cbbtcSupply,
      cbbtcBaseNotional,
      btcPrice: prices.btcPrice,
      cbbtcPrice: prices.cbbtcPrice,
      basisPct: prices.basisPct,
      usdcSupply,
      gasGwei,
      blockNumber,
      blockTime
    },
    series
  };

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(snapshot, null, 2) + "\n");

  const okCount = Object.values(sources).filter((s) => s === "ok").length;
  console.log(`[fetch-monitoring] wrote ${OUT_PATH}`);
  console.log(`[fetch-monitoring] sources: ${JSON.stringify(sources)} (${okCount} ok)`);
  console.log(
    `[fetch-monitoring] vault TVL $${(morpho.tvlUsd / 1e6).toFixed(2)}M · APY ${(morpho.netApy * 100).toFixed(2)}% · ` +
      `cbBTC ${(cbbtcSupply / 1e3).toFixed(2)}K · basis ${prices.basisPct?.toFixed(3)}% · USDC $${(usdcSupply / 1e9).toFixed(2)}B`
  );
}

main().catch((err) => {
  console.error("[fetch-monitoring] fatal:", err);
  process.exit(1);
});
