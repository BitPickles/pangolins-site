import liveData from "./monitoring-live.json";

export type MonitoringTone = "normal" | "watch" | "alert";

export type MonitoringSummaryItem = {
  label: string;
  value: string;
  detail: string;
};

export type MonitoringStatusCard = {
  title: string;
  value: string;
  note: string;
  tone: MonitoringTone;
};

export type MonitoringDomainStatus = "active" | "planned";

export type MonitoringDomain = {
  title: string;
  scope: string;
  status: MonitoringDomainStatus;
  description: string;
  signals: string[];
};

export type MonitoringDataPoint = {
  label: string;
  value: string;
  detail: string;
  tone: MonitoringTone;
};

export type MonitoringDataPanel = {
  title: string;
  description: string;
  points: MonitoringDataPoint[];
};

export type MonitoringSeriesPoint = {
  label: string;
  value: number;
};

export type MonitoringChartSeries = {
  name: string;
  points: MonitoringSeriesPoint[];
};

export type MonitoringChart = {
  id: string;
  title: string;
  value: string;
  unit: string;
  detail: string;
  tone: MonitoringTone;
  series: MonitoringChartSeries[];
};

export type MonitoringModuleId = "cbbtc" | "morpho" | "base";

export type MonitoringCheck = {
  label: string;
  value: string;
  source: string;
  tone: MonitoringTone;
};

export type MonitoringModule = {
  id: MonitoringModuleId;
  navLabel: string;
  navSubLabel: string;
  title: string;
  status: string;
  statusTone: MonitoringTone;
  description: string;
  updatedAt: string;
  metrics: MonitoringDataPoint[];
  charts: MonitoringChart[];
  checks: MonitoringCheck[];
  events: string[];
};

export type MonitoringSection = {
  slug: string;
  title: string;
  body: string;
  bullets: string[];
};

export type MonitoringSnapshot = {
  asOf: string;
  vault: {
    name: string;
    address: string;
    chain: string;
    curator: string;
    link: string;
  };
  headline: string;
  summary: MonitoringSummaryItem[];
  statusCards: MonitoringStatusCard[];
  monitoringDomains: MonitoringDomain[];
  dataPanels: MonitoringDataPanel[];
  monitoringModules: MonitoringModule[];
  sections: MonitoringSection[];
  liquidity: MonitoringSummaryItem[];
  riskSignals: MonitoringStatusCard[];
  recentEvents: string[];
};

const staticSnapshot: MonitoringSnapshot = {
  asOf: "Public preview · not live",
  vault: {
    name: "Pangolins USDC Vault",
    address: "0x1401d1271C47648AC70cBcdfA3776D4A87CE006B",
    chain: "Base",
    curator: "Pangolins",
    link:
      "https://app.morpho.org/base/vault/0x1401d1271C47648AC70cBcdfA3776D4A87CE006B/pangolins-usdc#overview"
  },
  headline:
    "当前 Vault 的公开数据总览。子模块分别跟踪 cbBTC 抵押品、Morpho 运行状态与 Base 链环境。",
  summary: [
    {
      label: "Vault Status",
      value: "Normal",
      detail: "未标记升级事件。"
    },
    {
      label: "Active Domains",
      value: "3 active / 1 planned",
      detail: "cbBTC / Morpho / Base 已启用。"
    },
    {
      label: "Feed Mode",
      value: "Public snapshot",
      detail: "公开快照；实时源待接入。"
    }
  ],
  statusCards: [
    {
      title: "Vault Status",
      value: "Normal",
      note: "未标记升级事件。",
      tone: "normal"
    },
    {
      title: "Feed Mode",
      value: "Snapshot",
      note: "实时源待接入。",
      tone: "watch"
    },
    {
      title: "Active Modules",
      value: "3",
      note: "cbBTC / Morpho / Base。",
      tone: "normal"
    },
    {
      title: "Expansion Slots",
      value: "Open",
      note: "新市场以模块接入。",
      tone: "normal"
    }
  ],
  monitoringDomains: [
    {
      title: "Coinbase 托管与赎回域",
      scope: "当前启用",
      status: "active",
      description: "托管、储备、赎回与公开事件。",
      signals: ["公开储备信息", "托管连续性", "赎回路径", "公开事件"]
    },
    {
      title: "Coinbase / cbBTC 依赖域",
      scope: "当前启用",
      status: "active",
      description: "发行、流转、集中度与流动性。",
      signals: ["发行路径", "链上流转", "集中度", "流动性"]
    },
    {
      title: "Morpho Vault 执行域",
      scope: "当前启用",
      status: "active",
      description: "Vault、市场、预言机与可回收流动性。",
      signals: ["配置边界", "可回收流动性", "异常响应", "链上动作"]
    },
    {
      title: "未来新增市场域",
      scope: "可扩展插槽",
      status: "planned",
      description: "新增抵押品、协议或链环境将独立接入。",
      signals: ["新抵押品", "新供应资产", "新协议依赖", "新市场组合"]
    }
  ],
  dataPanels: [
    {
      title: "Custody & Issuance",
      description: "托管与发行路径。只展示公开观察项。",
      points: [
        {
          label: "Reserve channel",
          value: "Observed",
          detail: "公开储备入口与异常公告。",
          tone: "normal"
        },
        {
          label: "Redemption path",
          value: "Watch",
          detail: "赎回连续性与公开事件。",
          tone: "watch"
        },
        {
          label: "Issuer dependency",
          value: "Explicit",
          detail: "发行方依赖独立展示。",
          tone: "watch"
        }
      ]
    },
    {
      title: "Onchain Asset Path",
      description: "发行、流转、集中度与流动性路径。",
      points: [
        {
          label: "Transfer activity",
          value: "Normal",
          detail: "大额转移与异常流向。",
          tone: "normal"
        },
        {
          label: "Holder concentration",
          value: "Tracked",
          detail: "集中度变化。",
          tone: "normal"
        },
        {
          label: "Liquidity route",
          value: "Mapped",
          detail: "链上深度与退出路径。",
          tone: "normal"
        }
      ]
    },
    {
      title: "Morpho Market Runtime",
      description: "Vault、市场、预言机与流动性状态。",
      points: [
        {
          label: "Market allocation",
          value: "Bounded",
          detail: "市场配置边界。",
          tone: "normal"
        },
        {
          label: "Withdrawable liquidity",
          value: "High",
          detail: "可用流动性入口。",
          tone: "normal"
        },
        {
          label: "Oracle sanity",
          value: "Nominal",
          detail: "预言机状态入口。",
          tone: "normal"
        }
      ]
    },
    {
      title: "System Readiness",
      description: "Watcher、告警路由和操作准备状态。",
      points: [
        {
          label: "Onchain watcher",
          value: "Online",
          detail: "事件监听入口。",
          tone: "normal"
        },
        {
          label: "Mempool layer",
          value: "Standby",
          detail: "Pending transaction 观察层。",
          tone: "watch"
        },
        {
          label: "Alert routing",
          value: "Ready",
          detail: "分级与通知链路。",
          tone: "normal"
        }
      ]
    }
  ],
  monitoringModules: [
    {
      id: "cbbtc",
      navLabel: "cbBTC",
      navSubLabel: "Collateral asset",
      title: "cbBTC Asset Monitor",
      status: "Normal",
      statusTone: "normal",
      description: "跟踪发行量、Base 流动性、BTC 价格偏离与异常流转。",
      updatedAt: "Public preview · not live",
      metrics: [
        {
          label: "Supply Monitor",
          value: "Active",
          detail: "发行量长期序列。",
          tone: "normal"
        },
        {
          label: "Liquidity Depth",
          value: "Tracked",
          detail: "Base 深度历史。",
          tone: "normal"
        },
        {
          label: "Price Basis",
          value: "Watch",
          detail: "cbBTC vs BTC 偏离。",
          tone: "watch"
        },
        {
          label: "Flow Anomaly",
          value: "Normal",
          detail: "大额转移与集中度。",
          tone: "normal"
        }
      ],
      charts: [
        {
          id: "cbbtc-onchain-supply",
          title: "Onchain Supply",
          value: "18.42K",
          unit: "cbBTC",
          detail: "Base 链上 cbBTC 发行量。",
          tone: "normal",
          series: [
            {
              name: "Base supply",
              points: [
                { label: "D-6", value: 18120 },
                { label: "D-5", value: 18164 },
                { label: "D-4", value: 18192 },
                { label: "D-3", value: 18240 },
                { label: "D-2", value: 18310 },
                { label: "D-1", value: 18388 },
                { label: "Now", value: 18420 }
              ]
            }
          ]
        },
        {
          id: "cbbtc-base-liquidity",
          title: "Base Liquidity",
          value: "$42.8M",
          unit: "USD depth",
          detail: "Base 链上 cbBTC 相关流动性深度。",
          tone: "normal",
          series: [
            {
              name: "Tracked liquidity",
              points: [
                { label: "D-6", value: 39.2 },
                { label: "D-5", value: 40.1 },
                { label: "D-4", value: 41.4 },
                { label: "D-3", value: 40.9 },
                { label: "D-2", value: 42.1 },
                { label: "D-1", value: 42.6 },
                { label: "Now", value: 42.8 }
              ]
            }
          ]
        },
        {
          id: "cbbtc-btc-price-basis",
          title: "BTC Price Basis",
          value: "+0.04%",
          unit: "cbBTC vs BTC",
          detail: "cbBTC 与交易所 BTC 价格差值。",
          tone: "normal",
          series: [
            {
              name: "Basis",
              points: [
                { label: "D-6", value: 0.02 },
                { label: "D-5", value: -0.01 },
                { label: "D-4", value: 0.03 },
                { label: "D-3", value: 0.08 },
                { label: "D-2", value: 0.05 },
                { label: "D-1", value: 0.01 },
                { label: "Now", value: 0.04 }
              ]
            }
          ]
        }
      ],
      checks: [
        { label: "Supply change", value: "No abrupt move", source: "Base cbBTC supply series", tone: "normal" },
        { label: "Liquidity drawdown", value: "Within watch band", source: "Base market depth series", tone: "normal" },
        { label: "Price basis", value: "Near parity", source: "cbBTC onchain price vs exchange BTC", tone: "normal" },
        { label: "Redemption dependency", value: "Explicit", source: "Issuer dependency register", tone: "watch" }
      ],
      events: [
        "CBBTC · Supply series initialized.",
        "CBBTC · No elevated public incident flag.",
        "CBBTC · Liquidity and basis modules prepared for live source integration."
      ]
    },
    {
      id: "morpho",
      navLabel: "Morpho",
      navSubLabel: "Protocol runtime",
      title: "Morpho Market Monitor",
      status: "Normal",
      statusTone: "normal",
      description: "跟踪 Morpho TVL、市场利用率、Vault TVL、预言机与执行准备。",
      updatedAt: "Public preview · not live",
      metrics: [
        {
          label: "Multi-chain TVL",
          value: "Tracked",
          detail: "主要链 TVL 变化。",
          tone: "normal"
        },
        {
          label: "Market Utilization",
          value: "Contained",
          detail: "底层市场利用率。",
          tone: "normal"
        },
        {
          label: "Oracle Sanity",
          value: "Nominal",
          detail: "预言机状态入口。",
          tone: "normal"
        },
        {
          label: "Allocator Readiness",
          value: "Ready",
          detail: "操作准备状态。",
          tone: "watch"
        }
      ],
      charts: [
        {
          id: "morpho-multichain-tvl",
          title: "Multi-chain TVL",
          value: "$4.82B",
          unit: "tracked TVL",
          detail: "Morpho 各条链 TVL 变化。",
          tone: "normal",
          series: [
            {
              name: "Ethereum",
              points: [
                { label: "D-6", value: 2.78 },
                { label: "D-5", value: 2.81 },
                { label: "D-4", value: 2.86 },
                { label: "D-3", value: 2.84 },
                { label: "D-2", value: 2.9 },
                { label: "D-1", value: 2.94 },
                { label: "Now", value: 2.96 }
              ]
            },
            {
              name: "Base",
              points: [
                { label: "D-6", value: 1.08 },
                { label: "D-5", value: 1.12 },
                { label: "D-4", value: 1.15 },
                { label: "D-3", value: 1.17 },
                { label: "D-2", value: 1.18 },
                { label: "D-1", value: 1.2 },
                { label: "Now", value: 1.21 }
              ]
            },
            {
              name: "Arbitrum",
              points: [
                { label: "D-6", value: 0.42 },
                { label: "D-5", value: 0.43 },
                { label: "D-4", value: 0.44 },
                { label: "D-3", value: 0.45 },
                { label: "D-2", value: 0.45 },
                { label: "D-1", value: 0.46 },
                { label: "Now", value: 0.46 }
              ]
            },
            {
              name: "Optimism",
              points: [
                { label: "D-6", value: 0.17 },
                { label: "D-5", value: 0.17 },
                { label: "D-4", value: 0.18 },
                { label: "D-3", value: 0.18 },
                { label: "D-2", value: 0.19 },
                { label: "D-1", value: 0.19 },
                { label: "Now", value: 0.19 }
              ]
            }
          ]
        },
        {
          id: "morpho-market-utilization",
          title: "Market Utilization",
          value: "61%",
          unit: "weighted",
          detail: "底层市场利用率。",
          tone: "normal",
          series: [
            {
              name: "Utilization",
              points: [
                { label: "D-6", value: 58 },
                { label: "D-5", value: 59 },
                { label: "D-4", value: 60 },
                { label: "D-3", value: 63 },
                { label: "D-2", value: 62 },
                { label: "D-1", value: 61 },
                { label: "Now", value: 61 }
              ]
            }
          ]
        },
        {
          id: "morpho-vault-tvl",
          title: "Pangolins Vault TVL",
          value: "$18.6M",
          unit: "USDC",
          detail: "Pangolins Vault 资金规模。",
          tone: "normal",
          series: [
            {
              name: "Vault TVL",
              points: [
                { label: "D-6", value: 17.9 },
                { label: "D-5", value: 18.1 },
                { label: "D-4", value: 18.2 },
                { label: "D-3", value: 18.4 },
                { label: "D-2", value: 18.5 },
                { label: "D-1", value: 18.6 },
                { label: "Now", value: 18.6 }
              ]
            }
          ]
        }
      ],
      checks: [
        { label: "Cross-chain TVL", value: "No abrupt outflow", source: "Morpho multi-chain TVL series", tone: "normal" },
        { label: "Market utilization", value: "Contained", source: "Weighted market utilization", tone: "normal" },
        { label: "Oracle sanity", value: "Nominal", source: "Public oracle signal watch", tone: "normal" },
        { label: "Execution window", value: "Protected", source: "Internal response layer", tone: "watch" }
      ],
      events: [
        "MORPHO · TVL and utilization indexed.",
        "MORPHO · No elevated public incident flag.",
        "MORPHO · Oracle and vault-position modules prepared for live source integration."
      ]
    },
    {
      id: "base",
      navLabel: "Base",
      navSubLabel: "Chain environment",
      title: "Base Chain Monitor",
      status: "Normal",
      statusTone: "normal",
      description: "跟踪 USDC 发行量、出块、Gas、RPC 与 Sequencer 状态。",
      updatedAt: "Public preview · not live",
      metrics: [
        {
          label: "USDC Supply",
          value: "Tracked",
          detail: "Base USDC 发行量。",
          tone: "normal"
        },
        {
          label: "Block Cadence",
          value: "Stable",
          detail: "出块连续性。",
          tone: "normal"
        },
        {
          label: "Gas Pressure",
          value: "Watch",
          detail: "链上费用压力。",
          tone: "watch"
        },
        {
          label: "RPC / Sequencer",
          value: "Nominal",
          detail: "基础设施可用性。",
          tone: "normal"
        }
      ],
      charts: [
        {
          id: "base-usdc-supply",
          title: "Base USDC Supply",
          value: "$3.71B",
          unit: "USDC issued",
          detail: "Base 链 USDC 总发行量。",
          tone: "normal",
          series: [
            {
              name: "USDC supply",
              points: [
                { label: "D-6", value: 3.62 },
                { label: "D-5", value: 3.64 },
                { label: "D-4", value: 3.66 },
                { label: "D-3", value: 3.68 },
                { label: "D-2", value: 3.69 },
                { label: "D-1", value: 3.7 },
                { label: "Now", value: 3.71 }
              ]
            }
          ]
        },
        {
          id: "base-block-production",
          title: "Block Production",
          value: "2.0s",
          unit: "avg block time",
          detail: "Base 出块连续性。",
          tone: "normal",
          series: [
            {
              name: "Block time",
              points: [
                { label: "H-6", value: 2.02 },
                { label: "H-5", value: 2.01 },
                { label: "H-4", value: 2.03 },
                { label: "H-3", value: 2.01 },
                { label: "H-2", value: 2 },
                { label: "H-1", value: 2.02 },
                { label: "Now", value: 2 }
              ]
            }
          ]
        },
        {
          id: "base-gas-pressure",
          title: "Gas Pressure",
          value: "Normal",
          unit: "fee pressure",
          detail: "Base fee pressure index.",
          tone: "watch",
          series: [
            {
              name: "Base fee index",
              points: [
                { label: "H-6", value: 1.1 },
                { label: "H-5", value: 1.2 },
                { label: "H-4", value: 1.4 },
                { label: "H-3", value: 1.3 },
                { label: "H-2", value: 1.5 },
                { label: "H-1", value: 1.7 },
                { label: "Now", value: 1.4 }
              ]
            }
          ]
        }
      ],
      checks: [
        { label: "USDC issuance", value: "No abrupt move", source: "Base USDC supply series", tone: "normal" },
        { label: "Block continuity", value: "Stable", source: "Base block cadence monitor", tone: "normal" },
        { label: "Gas pressure", value: "Watch", source: "Onchain fee monitor", tone: "watch" },
        { label: "RPC latency", value: "Nominal", source: "Provider telemetry monitor", tone: "normal" }
      ],
      events: [
        "BASE · USDC, blocks and gas indexed.",
        "BASE · No elevated public incident flag.",
        "BASE · Sequencer and RPC modules prepared for live source integration."
      ]
    }
  ],
  sections: [],
  liquidity: [
    {
      label: "Available liquidity",
      value: "High",
      detail: "可用流动性入口。"
    },
    {
      label: "Pressure level",
      value: "Contained",
      detail: "市场压力入口。"
    }
  ],
  riskSignals: [
    {
      title: "Custody reliance",
      value: "Explicitly tracked",
      note: "发行方依赖单独观察。",
      tone: "watch"
    },
    {
      title: "Liquidity drawdown watch",
      value: "Active",
      note: "退出深度持续观察。",
      tone: "normal"
    }
  ],
  recentEvents: [
    "VAULT · Public snapshot rendered.",
    "VAULT · No elevated public incident flag.",
    "VAULT · cbBTC, Morpho and Base modules active."
  ]
};

// ---------------------------------------------------------------------------
// Live data overlay
//
// Real values are injected at build time from `monitoring-live.json`, refreshed
// every 6h by .github/workflows/refresh-monitoring.yml. Any field a source
// failed to provide stays at the static fallback above, so the build never
// breaks and the UI never renders an empty value.
// ---------------------------------------------------------------------------

type LiveMonitoringData = {
  generatedAt?: string;
  sources?: Record<string, string>;
  current?: Record<string, number | undefined>;
  series?: Record<string, number[] | undefined>;
};

function fmtUsd(n?: number): string | undefined {
  if (n == null || !Number.isFinite(n)) return undefined;
  const abs = Math.abs(n);
  if (abs >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function fmtUnitsK(n?: number): string | undefined {
  if (n == null || !Number.isFinite(n)) return undefined;
  return Math.abs(n) >= 1e3 ? `${(n / 1e3).toFixed(2)}K` : n.toFixed(2);
}

function fmtPct(n?: number, signed = false): string | undefined {
  if (n == null || !Number.isFinite(n)) return undefined;
  const body = `${n.toFixed(n != null && Math.abs(n) < 1 ? 3 : 1)}%`;
  return signed && n >= 0 ? `+${body}` : body;
}

function toPoints(values?: number[]): MonitoringSeriesPoint[] | undefined {
  if (!values || values.length === 0) return undefined;
  const last = values.length - 1;
  return values.map((value, i) => ({ label: i === last ? "Now" : `T-${last - i}`, value }));
}

function toneForBasis(pct?: number): MonitoringTone | undefined {
  if (pct == null) return undefined;
  const a = Math.abs(pct);
  return a > 1 ? "alert" : a > 0.3 ? "watch" : "normal";
}

function toneForGas(gwei?: number): MonitoringTone | undefined {
  if (gwei == null) return undefined;
  return gwei > 2 ? "alert" : gwei > 0.5 ? "watch" : "normal";
}

function applyLiveData(base: MonitoringSnapshot, live: LiveMonitoringData): MonitoringSnapshot {
  const snap = structuredClone(base);
  const cur = live.current ?? {};
  const series = live.series ?? {};

  if (live.generatedAt) {
    snap.asOf = live.generatedAt;
    for (const mod of snap.monitoringModules) {
      mod.updatedAt = live.generatedAt;
    }
  }

  const findChart = (moduleId: MonitoringModuleId, chartId: string) =>
    snap.monitoringModules.find((m) => m.id === moduleId)?.charts.find((c) => c.id === chartId);

  // One row per chart. `seriesValues` is aligned to the chart's existing series
  // order; `replaceSeries` rebuilds the series list (used to drop stale lines).
  const updates: Array<{
    moduleId: MonitoringModuleId;
    chartId: string;
    value?: string;
    tone?: MonitoringTone;
    seriesValues?: Array<number[] | undefined>;
    replaceSeries?: Array<number[] | undefined>;
  }> = [
    {
      moduleId: "cbbtc",
      chartId: "cbbtc-onchain-supply",
      value: fmtUnitsK(cur.cbbtcSupply),
      seriesValues: [series.cbbtcSupply]
    },
    {
      moduleId: "cbbtc",
      chartId: "cbbtc-base-liquidity",
      value: fmtUsd(cur.cbbtcBaseNotional),
      seriesValues: [series.cbbtcBaseNotional]
    },
    {
      moduleId: "cbbtc",
      chartId: "cbbtc-btc-price-basis",
      value: fmtPct(cur.basisPct, true),
      tone: toneForBasis(cur.basisPct),
      seriesValues: [series.cbbtcBasis]
    },
    {
      moduleId: "morpho",
      chartId: "morpho-multichain-tvl",
      value: fmtUsd(cur.multichainTotal),
      replaceSeries: [series.multichainEth, series.multichainBase]
    },
    {
      moduleId: "morpho",
      chartId: "morpho-market-utilization",
      value: fmtPct(cur.utilization != null ? cur.utilization * 100 : undefined),
      seriesValues: [series.utilization]
    },
    {
      moduleId: "morpho",
      chartId: "morpho-vault-tvl",
      value: fmtUsd(cur.vaultTvlUsd),
      seriesValues: [series.vaultTvl]
    },
    {
      moduleId: "base",
      chartId: "base-usdc-supply",
      value: fmtUsd(cur.usdcSupply),
      seriesValues: [series.usdcSupply]
    },
    {
      moduleId: "base",
      chartId: "base-block-production",
      value: cur.blockTime != null ? `${cur.blockTime.toFixed(1)}s` : undefined,
      seriesValues: [series.blockTime]
    },
    {
      moduleId: "base",
      chartId: "base-gas-pressure",
      value: cur.gasGwei != null ? `${cur.gasGwei.toFixed(3)} gwei` : undefined,
      tone: toneForGas(cur.gasGwei),
      seriesValues: [series.gas]
    }
  ];

  for (const u of updates) {
    const chart = findChart(u.moduleId, u.chartId);
    if (!chart) continue;
    if (u.value) chart.value = u.value;
    if (u.tone) chart.tone = u.tone;
    if (u.replaceSeries) {
      const rebuilt = u.replaceSeries
        .map((values, i) => {
          const pts = toPoints(values);
          if (!pts) return null;
          const name = chart.series[i]?.name ?? `series-${i}`;
          return { name, points: pts };
        })
        .filter((s): s is MonitoringChartSeries => s !== null);
      if (rebuilt.length > 0) chart.series = rebuilt;
    } else if (u.seriesValues) {
      chart.series = chart.series.map((s, i) => {
        const pts = toPoints(u.seriesValues?.[i]);
        return pts ? { ...s, points: pts } : s;
      });
    }
  }

  return snap;
}

export const monitoringSnapshot: MonitoringSnapshot = applyLiveData(
  staticSnapshot,
  liveData as LiveMonitoringData
);
