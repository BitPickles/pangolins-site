import type { MonitoringModuleId, MonitoringTone, MonitoringVaultId } from "@/lib/content/monitoring-data";
import type { SiteLanguage } from "@/lib/content/site-copy";

type LocalizedText = Record<SiteLanguage, string>;

type LocalizedStatusCard = {
  title: LocalizedText;
  value: LocalizedText;
  note: LocalizedText;
  tone: MonitoringTone;
};

type LocalizedModuleCopy = {
  navLabel: LocalizedText;
  navSubLabel: LocalizedText;
  title: LocalizedText;
  status: LocalizedText;
  description: LocalizedText;
  metrics: Array<{
    label: LocalizedText;
    detail: LocalizedText;
  }>;
  charts: Record<
    string,
    {
      title: LocalizedText;
      unit: LocalizedText;
      detail: LocalizedText;
      seriesNames: LocalizedText[];
    }
  >;
  checks: Array<{
    label: LocalizedText;
    value: LocalizedText;
    source: LocalizedText;
  }>;
  events: LocalizedText[];
};

export const monitoringCopy = {
  controls: {
    collapseSidebar: { zh: "折叠侧栏", en: "Collapse sidebar" },
    expandSidebar: { zh: "展开侧栏", en: "Expand sidebar" },
    openModules: { zh: "打开监控模块", en: "Open monitor modules" },
    closeModules: { zh: "关闭监控模块", en: "Close monitor modules" },
    moduleButton: { zh: "模块", en: "Modules" }
  },
  nav: {
    home: { zh: "首页", en: "Home" },
    monitoring: { zh: "监控与透明度", en: "Monitoring" }
  },
  tone: {
    normal: { zh: "正常", en: "Normal" },
    watch: { zh: "观察", en: "Watch" },
    alert: { zh: "升高", en: "Elevated" }
  },
  layout: {
    productLabel: { zh: "Pangolins 风控运行", en: "Pangolins Risk Operations" },
    dataCenter: { zh: "数据中心", en: "Data Center" },
    dataCenterTitle: { zh: "Pangolins 数据中心", en: "Pangolins Data Center" },
    headline: {
      zh: "这里是 Pangolins 监控体系的公开一隅。抵押资产、协议运行与链环境之下，是一套更深、更广的持续监控。",
      en: "A public glimpse into the Pangolins monitoring system. Beneath collateral, protocol, and chain runs a deeper, broader layer of continuous monitoring."
    },
    dataNotice: {
      zh: "公开展示视图，仅为完整监控的一部分。",
      en: "Public showcase — a subset of our full monitoring."
    },
    monitorTree: { zh: "监控结构", en: "Monitor Tree" },
    monitorTreeBody: {
      zh: "点开金库即可展开它的子监控。",
      en: "Select a vault to expand its child monitors."
    },
    nextModules: { zh: "可扩展模块", en: "Expansion slots" },
    futureModules: {
      zh: ["新抵押资产", "新协议", "新执行环境"],
      en: ["New collateral", "New protocol", "New venue"]
    },
    vaultOverview: { zh: "金库总览", en: "Vault overview" },
    vaultOverviewTitle: { zh: "Pangolins USDC Vault 总览", en: "Pangolins USDC Vault Overview" },
    vaultOverviewBody: {
      zh: "这是面向公众的展示视图，呈现当前 Vault 的公开状态与部分监控路径；实际运营监控覆盖的维度远多于此，更细的执行阈值与时序也不会作为公开信号暴露。",
      en: "A public-facing showcase of the vault's status and selected monitor paths. Our operational monitoring covers far more, and finer execution thresholds and timing are never exposed as public signals."
    },
    vaultLabel: { zh: "金库", en: "Vault" },
    chainLabel: { zh: "链", en: "Chain" },
    curatorLabel: { zh: "Curator", en: "Curator" },
    feedLabel: { zh: "数据", en: "Feed" },
    statusSummary: { zh: "状态", en: "Summary" },
    moduleSuffix: { zh: "监控", en: "monitor" },
    currentSnapshot: { zh: "当前状态", en: "Current snapshot" },
    vaultStatus: { zh: "Vault 状态", en: "Vault Status" },
    eventLog: { zh: "事件日志", en: "Event Log" },
    vaultLog: { zh: "Vault 日志", en: "Vault log" },
    publicModule: { zh: "公开模块", en: "Public module" },
    scope: { zh: "范围", en: "Scope" },
    scopeBody: {
      zh: "这是面向公众的展示视图；真实运营监控覆盖更多维度、更高频率。",
      en: "A public-facing showcase; real operational monitoring covers more dimensions at higher frequency."
    },
    checks: { zh: "检查项", en: "Checks" },
    timeSeries: { zh: "时间序列", en: "Time Series" },
    history: { zh: "历史趋势", en: "History" },
    signalMatrix: { zh: "信号矩阵", en: "Signal Matrix" },
    moduleLog: { zh: "模块日志", en: "Module log" },
    dataPolicy: { zh: "数据边界", en: "Data Policy" },
    dataPolicyBody: {
      zh: "公开状态、风险路径与系统健康；保护会影响执行质量的阈值和时序。",
      en: "Status, risk paths, and system health are public; execution-sensitive thresholds and timing remain protected."
    }
  },
  statusCards: [
    {
      title: { zh: "Vault 状态", en: "Vault Status" },
      value: { zh: "正常", en: "Normal" },
      note: { zh: "未观察到需要升级披露的公开事件。", en: "No public event currently requires escalation." },
      tone: "normal"
    },
    {
      title: { zh: "展示模式", en: "Display Mode" },
      value: { zh: "公开展示", en: "Showcase" },
      note: { zh: "对外展示样本；实际监控的维度与深度远不止于此。", en: "A public sample; our operational monitoring goes far deeper." },
      tone: "normal"
    }
  ] satisfies LocalizedStatusCard[],
  recentEvents: [
    {
      zh: "Vault 实时监控已接入。",
      en: "Vault live monitoring connected."
    },
    {
      zh: "当前未观察到需要升级披露的公开事件。",
      en: "No public event currently requires escalation."
    },
    {
      zh: "cbBTC、Morpho、Base 子监控已启用。",
      en: "cbBTC, Morpho, and Base child monitors are active."
    }
  ],
  vaults: {
    usdc: {
      recentEvents: [
        { zh: "Vault 实时监控已接入。", en: "Vault live monitoring connected." },
        { zh: "当前未观察到需要升级披露的公开事件。", en: "No public event currently requires escalation." },
        { zh: "cbBTC、Morpho、Base 子监控已启用。", en: "cbBTC, Morpho, and Base child monitors are active." }
      ]
    },
    usdt: {
      recentEvents: [
        { zh: "Vault 实时监控已接入。", en: "Vault live monitoring connected." },
        { zh: "当前未观察到需要升级披露的公开事件。", en: "No public event currently requires escalation." },
        { zh: "USDT、Lista、BSC 子监控已启用。", en: "USDT, Lista, and BSC child monitors are active." }
      ]
    }
  } satisfies Record<MonitoringVaultId, { recentEvents: LocalizedText[] }>,
  modules: {
    cbbtc: {
      navLabel: { zh: "cbBTC", en: "cbBTC" },
      navSubLabel: { zh: "抵押资产", en: "Collateral asset" },
      title: { zh: "cbBTC 资产监控", en: "cbBTC Asset Monitor" },
      status: { zh: "正常", en: "Normal" },
      description: {
        zh: "跟踪发行量、Base 流动性、与 BTC 的价格偏离，以及异常流转。",
        en: "Tracks supply, Base liquidity, BTC price basis, and unusual asset flows."
      },
      metrics: [
        { label: { zh: "发行量监控", en: "Supply Monitor" }, detail: { zh: "长期记录链上发行量变化。", en: "Long-term onchain supply history." } },
        { label: { zh: "流动性深度", en: "Liquidity Depth" }, detail: { zh: "记录 Base 上可观察的流动性深度。", en: "Tracks observable liquidity depth on Base." } },
        { label: { zh: "价格偏离", en: "Price Basis" }, detail: { zh: "观察 cbBTC 与 BTC 的公开价格差。", en: "Observes public cbBTC versus BTC price basis." } },
        { label: { zh: "异常流转", en: "Flow Anomaly" }, detail: { zh: "关注大额转移与集中度变化。", en: "Watches large transfers and concentration changes." } }
      ],
      charts: {
        "cbbtc-onchain-supply": {
          title: { zh: "链上发行量", en: "Onchain Supply" },
          unit: { zh: "cbBTC", en: "cbBTC" },
          detail: { zh: "Base 链上 cbBTC 发行量的公开序列。", en: "Public Base cbBTC supply series." },
          seriesNames: [{ zh: "Base 发行量", en: "Base supply" }]
        },
        "cbbtc-base-liquidity": {
          title: { zh: "Base 流动性", en: "Base Liquidity" },
          unit: { zh: "名义价值（近似）", en: "notional (proxy)" },
          detail: {
            zh: "以 Base 上 cbBTC 名义价值（发行量 × 价格）作为流动性近似；真实 DEX 深度为二期接入。",
            en: "On-Base cbBTC notional (supply × price) as a liquidity proxy; true DEX depth lands in phase 2."
          },
          seriesNames: [{ zh: "cbBTC 名义价值", en: "cbBTC notional" }]
        },
        "cbbtc-btc-price-basis": {
          title: { zh: "BTC 价格偏离", en: "BTC Price Basis" },
          unit: { zh: "cbBTC vs BTC", en: "cbBTC vs BTC" },
          detail: { zh: "cbBTC 与交易所 BTC 价格之间的公开偏离。", en: "Public basis between cbBTC and exchange BTC prices." },
          seriesNames: [{ zh: "价格偏离", en: "Basis" }]
        }
      },
      checks: [
        { label: { zh: "发行量变化", en: "Supply change" }, value: { zh: "未见突变", en: "No abrupt move" }, source: { zh: "Base cbBTC 发行量序列", en: "Base cbBTC supply series" } },
        { label: { zh: "流动性回撤", en: "Liquidity drawdown" }, value: { zh: "处于观察范围", en: "Within watch band" }, source: { zh: "Base 市场深度序列", en: "Base market depth series" } },
        { label: { zh: "价格偏离", en: "Price basis" }, value: { zh: "接近锚定", en: "Near parity" }, source: { zh: "cbBTC 链上价格与交易所 BTC 对照", en: "cbBTC onchain price versus exchange BTC" } },
        { label: { zh: "发行方依赖", en: "Issuer dependency" }, value: { zh: "单独标记", en: "Explicit" }, source: { zh: "发行方依赖清单", en: "Issuer dependency register" } }
      ],
      events: [
        { zh: "cbBTC 发行量与价格偏离已接入实时监控。", en: "cbBTC supply and price basis are connected to live monitoring." },
        { zh: "当前未观察到需要升级披露的公开事件。", en: "No public event currently requires escalation." },
        { zh: "Base 流动性当前以名义价值近似，真实 DEX 深度为二期。", en: "Base liquidity is a notional proxy for now; true DEX depth is phase 2." }
      ]
    },
    morpho: {
      navLabel: { zh: "Morpho", en: "Morpho" },
      navSubLabel: { zh: "协议运行", en: "Protocol runtime" },
      title: { zh: "Morpho 市场监控", en: "Morpho Market Monitor" },
      status: { zh: "正常", en: "Normal" },
      description: {
        zh: "跟踪 Morpho 多链 TVL、市场利用率、Vault TVL、预言机状态与执行准备。",
        en: "Tracks Morpho multi-chain TVL, utilization, vault TVL, oracle sanity, and execution readiness."
      },
      metrics: [
        { label: { zh: "多链 TVL", en: "Multi-chain TVL" }, detail: { zh: "观察主要链上的 TVL 变化。", en: "Tracks TVL changes across major chains." } },
        { label: { zh: "市场利用率", en: "Market Utilization" }, detail: { zh: "观察底层市场利用率。", en: "Tracks weighted market utilization." } },
        { label: { zh: "预言机状态", en: "Oracle Sanity" }, detail: { zh: "观察公开预言机状态。", en: "Observes public oracle sanity signals." } },
        { label: { zh: "执行准备", en: "Allocator Readiness" }, detail: { zh: "保留操作准备状态。", en: "Keeps the response layer ready." } }
      ],
      charts: {
        "morpho-multichain-tvl": {
          title: { zh: "多链 TVL", en: "Multi-chain TVL" },
          unit: { zh: "追踪 TVL", en: "tracked TVL" },
          detail: { zh: "Morpho 在 Ethereum 与 Base 上的 TVL（来自 DeFiLlama）。", en: "Morpho TVL on Ethereum and Base (via DeFiLlama)." },
          seriesNames: [
            { zh: "Ethereum", en: "Ethereum" },
            { zh: "Base", en: "Base" }
          ]
        },
        "morpho-market-utilization": {
          title: { zh: "市场利用率", en: "Market Utilization" },
          unit: { zh: "加权", en: "weighted" },
          detail: { zh: "底层市场利用率变化。", en: "Weighted utilization across underlying markets." },
          seriesNames: [{ zh: "利用率", en: "Utilization" }]
        },
        "morpho-vault-tvl": {
          title: { zh: "Pangolins Vault TVL", en: "Pangolins Vault TVL" },
          unit: { zh: "USDC", en: "USDC" },
          detail: { zh: "Pangolins Vault 的公开规模序列。", en: "Public size series for the Pangolins Vault." },
          seriesNames: [{ zh: "Vault TVL", en: "Vault TVL" }]
        }
      },
      checks: [
        { label: { zh: "跨链 TVL", en: "Cross-chain TVL" }, value: { zh: "未见异常外流", en: "No abrupt outflow" }, source: { zh: "Morpho 多链 TVL 序列", en: "Morpho multi-chain TVL series" } },
        { label: { zh: "市场利用率", en: "Market utilization" }, value: { zh: "处于可观察区间", en: "Contained" }, source: { zh: "加权市场利用率", en: "Weighted market utilization" } },
        { label: { zh: "预言机状态", en: "Oracle sanity" }, value: { zh: "未见异常", en: "Nominal" }, source: { zh: "公开预言机状态观察", en: "Public oracle sanity signals" } },
        { label: { zh: "执行窗口", en: "Execution window" }, value: { zh: "内部保护", en: "Protected" }, source: { zh: "内部响应层", en: "Internal response layer" } }
      ],
      events: [
        { zh: "Morpho 多链 TVL、利用率与 Vault TVL 已接入实时监控。", en: "Morpho multi-chain TVL, utilization, and vault TVL are connected to live monitoring." },
        { zh: "当前未观察到需要升级披露的公开事件。", en: "No public event currently requires escalation." },
        { zh: "预言机状态模块已预留实时接入。", en: "The oracle sanity module is prepared for live source integration." }
      ]
    },
    base: {
      navLabel: { zh: "Base", en: "Base" },
      navSubLabel: { zh: "链环境", en: "Chain environment" },
      title: { zh: "Base 链环境监控", en: "Base Chain Monitor" },
      status: { zh: "正常", en: "Normal" },
      description: {
        zh: "跟踪 Base 上 USDC 发行量、出块连续性、Gas 压力、RPC 与 Sequencer 状态。",
        en: "Tracks Base USDC supply, block cadence, gas pressure, RPC, and sequencer conditions."
      },
      metrics: [
        { label: { zh: "USDC 发行量", en: "USDC Supply" }, detail: { zh: "记录 Base USDC 发行量。", en: "Tracks Base USDC supply." } },
        { label: { zh: "出块连续性", en: "Block Cadence" }, detail: { zh: "观察出块是否稳定。", en: "Observes whether block production remains stable." } },
        { label: { zh: "Gas 压力", en: "Gas Pressure" }, detail: { zh: "关注链上费用是否异常升高。", en: "Watches for abnormal fee pressure." } },
        { label: { zh: "RPC / Sequencer", en: "RPC / Sequencer" }, detail: { zh: "观察基础设施可用性。", en: "Observes infrastructure availability." } }
      ],
      charts: {
        "base-usdc-supply": {
          title: { zh: "Base USDC 发行量", en: "Base USDC Supply" },
          unit: { zh: "USDC 发行", en: "USDC issued" },
          detail: { zh: "Base 链 USDC 总发行量。", en: "Total USDC supply on Base." },
          seriesNames: [{ zh: "USDC 发行量", en: "USDC supply" }]
        },
        "base-block-production": {
          title: { zh: "出块连续性", en: "Block Production" },
          unit: { zh: "平均出块时间", en: "avg block time" },
          detail: { zh: "Base 出块连续性。", en: "Base block production cadence." },
          seriesNames: [{ zh: "出块时间", en: "Block time" }]
        },
        "base-gas-pressure": {
          title: { zh: "Gas 压力", en: "Gas Pressure" },
          unit: { zh: "费用压力", en: "fee pressure" },
          detail: { zh: "Base 费用压力指数。", en: "Base fee pressure index." },
          seriesNames: [{ zh: "Base fee 指数", en: "Base fee index" }]
        }
      },
      checks: [
        { label: { zh: "USDC 发行", en: "USDC issuance" }, value: { zh: "未见突变", en: "No abrupt move" }, source: { zh: "Base USDC 发行量序列", en: "Base USDC supply series" } },
        { label: { zh: "出块连续性", en: "Block continuity" }, value: { zh: "稳定", en: "Stable" }, source: { zh: "Base 出块状态观察", en: "Base block production monitor" } },
        { label: { zh: "Gas 压力", en: "Gas pressure" }, value: { zh: "观察中", en: "Watch" }, source: { zh: "链上费用观察", en: "Onchain fee monitor" } },
        { label: { zh: "RPC 延迟", en: "RPC latency" }, value: { zh: "未见异常", en: "Nominal" }, source: { zh: "基础设施可用性观察", en: "Provider telemetry monitor" } }
      ],
      events: [
        { zh: "Base USDC、出块与 Gas 指标已接入实时监控。", en: "Base USDC, block cadence, and gas metrics are connected to live monitoring." },
        { zh: "当前未观察到需要升级披露的公开事件。", en: "No public event currently requires escalation." },
        { zh: "Sequencer 健康遥测模块已预留实时接入。", en: "The sequencer health telemetry module is prepared for live source integration." }
      ]
    },
    usdt: {
      navLabel: { zh: "USDT", en: "USDT" },
      navSubLabel: { zh: "金库资产", en: "Vault asset" },
      title: { zh: "USDT 资产监控", en: "USDT Asset Monitor" },
      status: { zh: "正常", en: "Normal" },
      description: {
        zh: "跟踪 USDT 脱锚、BSC 链上发行量，以及金库份额净值增长。",
        en: "Tracks USDT peg, BSC issuance, and vault share-price growth."
      },
      metrics: [
        { label: { zh: "脱锚监控", en: "Peg Monitor" }, detail: { zh: "观察 USDT 与 $1 的公开价差。", en: "Observes public USDT versus $1 basis." } },
        { label: { zh: "份额净值", en: "Share Price" }, detail: { zh: "金库份额净值的累积增长。", en: "Vault share-price accrual over time." } },
        { label: { zh: "链上发行量", en: "Onchain Supply" }, detail: { zh: "记录 BSC 上 USDT 发行量。", en: "Tracks USDT supply on BSC." } },
        { label: { zh: "异常流转", en: "Flow Anomaly" }, detail: { zh: "关注大额转移与集中度变化。", en: "Watches large transfers and concentration changes." } }
      ],
      charts: {
        "usdt-peg": {
          title: { zh: "USDT 脱锚", en: "USDT Peg" },
          unit: { zh: "USDT vs $1", en: "USDT vs $1" },
          detail: { zh: "USDT 公开价格与 $1 的偏离。", en: "USDT public price versus $1." },
          seriesNames: [{ zh: "脱锚幅度", en: "Peg basis" }]
        },
        "usdt-share-price": {
          title: { zh: "份额净值", en: "Share Price" },
          unit: { zh: "份额净值", en: "share price" },
          detail: { zh: "金库份额净值（totalAssets / totalSupply）。", en: "Vault share price (totalAssets / totalSupply)." },
          seriesNames: [{ zh: "份额净值", en: "Share price" }]
        },
        "usdt-onchain-supply": {
          title: { zh: "BSC USDT 发行量", en: "BSC USDT Supply" },
          unit: { zh: "USDT 发行", en: "USDT issued" },
          detail: { zh: "BSC 链 USDT 总发行量。", en: "Total USDT supply on BSC." },
          seriesNames: [{ zh: "BSC USDT", en: "BSC USDT" }]
        }
      },
      checks: [
        { label: { zh: "脱锚幅度", en: "Peg deviation" }, value: { zh: "接近锚定", en: "Near parity" }, source: { zh: "USDT 公开价格 vs $1", en: "USDT public price vs $1" } },
        { label: { zh: "份额净值", en: "Share price" }, value: { zh: "持续累积", en: "Accruing" }, source: { zh: "金库 totalAssets / totalSupply", en: "Vault totalAssets / totalSupply" } },
        { label: { zh: "发行量变化", en: "Supply change" }, value: { zh: "未见突变", en: "No abrupt move" }, source: { zh: "BSC USDT 发行量序列", en: "BSC USDT supply series" } },
        { label: { zh: "发行方依赖", en: "Issuer dependency" }, value: { zh: "单独标记", en: "Explicit" }, source: { zh: "发行方依赖清单", en: "Issuer dependency register" } }
      ],
      events: [
        { zh: "USDT 脱锚与发行量已接入实时监控。", en: "USDT peg and supply are connected to live monitoring." },
        { zh: "当前未观察到需要升级披露的公开事件。", en: "No public event currently requires escalation." },
        { zh: "份额净值序列已接入实时监控。", en: "The share-price series is connected to live monitoring." }
      ]
    },
    lista: {
      navLabel: { zh: "Lista", en: "Lista" },
      navSubLabel: { zh: "协议运行", en: "Protocol runtime" },
      title: { zh: "Lista 借贷监控", en: "Lista Lending Monitor" },
      status: { zh: "正常", en: "Normal" },
      description: {
        zh: "跟踪 Lista 多链 TVL、协议利用率，以及 Pangolins 金库 TVL。",
        en: "Tracks Lista multi-chain TVL, protocol utilization, and the Pangolins vault TVL."
      },
      metrics: [
        { label: { zh: "多链 TVL", en: "Multi-chain TVL" }, detail: { zh: "观察 Lista 在 BSC 与 Ethereum 的 TVL。", en: "Tracks Lista TVL on BSC and Ethereum." } },
        { label: { zh: "协议利用率", en: "Utilization" }, detail: { zh: "借出 / 供给比例。", en: "Borrowed / supplied ratio." } },
        { label: { zh: "金库 TVL", en: "Vault TVL" }, detail: { zh: "Pangolins USDT 金库规模。", en: "Pangolins USDT vault size." } },
        { label: { zh: "执行准备", en: "Allocator Readiness" }, detail: { zh: "保留操作准备状态。", en: "Keeps the response layer ready." } }
      ],
      charts: {
        "lista-multichain-tvl": {
          title: { zh: "多链 TVL", en: "Multi-chain TVL" },
          unit: { zh: "追踪 TVL", en: "tracked TVL" },
          detail: { zh: "Lista Lending 在 BSC 与 Ethereum 上的 TVL（来自 DeFiLlama）。", en: "Lista Lending TVL on BSC and Ethereum (via DeFiLlama)." },
          seriesNames: [
            { zh: "BSC", en: "BSC" },
            { zh: "Ethereum", en: "Ethereum" }
          ]
        },
        "lista-utilization": {
          title: { zh: "协议利用率", en: "Protocol Utilization" },
          unit: { zh: "加权", en: "weighted" },
          detail: { zh: "Lista 借出 / 供给比例。", en: "Lista borrowed / supplied." },
          seriesNames: [{ zh: "利用率", en: "Utilization" }]
        },
        "lista-vault-tvl": {
          title: { zh: "Pangolins 金库 TVL", en: "Pangolins Vault TVL" },
          unit: { zh: "USDT", en: "USDT" },
          detail: { zh: "Pangolins USDT 金库规模（来自 DeFiLlama yields）。", en: "Pangolins USDT vault size (via DeFiLlama yields)." },
          seriesNames: [{ zh: "金库 TVL", en: "Vault TVL" }]
        }
      },
      checks: [
        { label: { zh: "跨链 TVL", en: "Cross-chain TVL" }, value: { zh: "未见异常外流", en: "No abrupt outflow" }, source: { zh: "Lista 多链 TVL 序列", en: "Lista multi-chain TVL series" } },
        { label: { zh: "利用率", en: "Utilization" }, value: { zh: "处于可观察区间", en: "Contained" }, source: { zh: "协议借出 / 供给", en: "Protocol borrowed / supplied" } },
        { label: { zh: "金库 TVL", en: "Vault TVL" }, value: { zh: "稳定", en: "Stable" }, source: { zh: "Pangolins 金库 TVL 序列", en: "Pangolins vault TVL series" } },
        { label: { zh: "执行窗口", en: "Execution window" }, value: { zh: "内部保护", en: "Protected" }, source: { zh: "内部响应层", en: "Internal response layer" } }
      ],
      events: [
        { zh: "Lista 多链 TVL 与利用率已接入实时监控。", en: "Lista multi-chain TVL and utilization are connected to live monitoring." },
        { zh: "当前未观察到需要升级披露的公开事件。", en: "No public event currently requires escalation." },
        { zh: "金库 TVL 与 APY 已接入实时监控。", en: "Vault TVL and APY are connected to live monitoring." }
      ]
    },
    bsc: {
      navLabel: { zh: "BSC", en: "BSC" },
      navSubLabel: { zh: "链环境", en: "Chain environment" },
      title: { zh: "BSC 链环境监控", en: "BSC Chain Monitor" },
      status: { zh: "正常", en: "Normal" },
      description: {
        zh: "跟踪 BSC Gas 压力、出块连续性与 BNB 价格。",
        en: "Tracks BSC gas pressure, block cadence, and BNB price."
      },
      metrics: [
        { label: { zh: "Gas 压力", en: "Gas Pressure" }, detail: { zh: "关注链上费用是否异常升高。", en: "Watches for abnormal fee pressure." } },
        { label: { zh: "出块连续性", en: "Block Cadence" }, detail: { zh: "观察出块是否稳定。", en: "Observes whether block production remains stable." } },
        { label: { zh: "BNB 价格", en: "BNB Price" }, detail: { zh: "观察原生代币价格。", en: "Observes the native token price." } },
        { label: { zh: "RPC / 验证人", en: "RPC / Validators" }, detail: { zh: "观察基础设施可用性。", en: "Observes infrastructure availability." } }
      ],
      charts: {
        "bsc-gas-pressure": {
          title: { zh: "Gas 压力", en: "Gas Pressure" },
          unit: { zh: "费用压力", en: "fee pressure" },
          detail: { zh: "BSC 费用压力指数。", en: "BSC fee pressure index." },
          seriesNames: [{ zh: "BSC gas", en: "BSC gas" }]
        },
        "bsc-block-production": {
          title: { zh: "出块连续性", en: "Block Production" },
          unit: { zh: "平均出块时间", en: "avg block time" },
          detail: { zh: "BSC 出块连续性。", en: "BSC block production cadence." },
          seriesNames: [{ zh: "出块时间", en: "Block time" }]
        },
        "bsc-bnb-price": {
          title: { zh: "BNB 价格", en: "BNB Price" },
          unit: { zh: "BNB / USD", en: "BNB / USD" },
          detail: { zh: "BNB 公开价格。", en: "BNB public price." },
          seriesNames: [{ zh: "BNB 价格", en: "BNB price" }]
        }
      },
      checks: [
        { label: { zh: "Gas 压力", en: "Gas pressure" }, value: { zh: "较低", en: "Low" }, source: { zh: "BSC 链上费用观察", en: "BSC onchain fee monitor" } },
        { label: { zh: "出块连续性", en: "Block continuity" }, value: { zh: "稳定", en: "Stable" }, source: { zh: "BSC 出块状态观察", en: "BSC block cadence monitor" } },
        { label: { zh: "BNB 价格", en: "BNB price" }, value: { zh: "持续观察", en: "Tracked" }, source: { zh: "BNB 公开价格", en: "Public BNB price" } },
        { label: { zh: "RPC 延迟", en: "RPC latency" }, value: { zh: "未见异常", en: "Nominal" }, source: { zh: "基础设施可用性观察", en: "Provider telemetry monitor" } }
      ],
      events: [
        { zh: "BSC Gas、出块与 BNB 指标已接入实时监控。", en: "BSC gas, block cadence, and BNB metrics are connected to live monitoring." },
        { zh: "当前未观察到需要升级披露的公开事件。", en: "No public event currently requires escalation." },
        { zh: "验证人健康遥测模块已预留实时接入。", en: "The validator health telemetry module is prepared for live source integration." }
      ]
    }
  } satisfies Record<MonitoringModuleId, LocalizedModuleCopy>
} as const;

export function localize(text: LocalizedText, language: SiteLanguage): string {
  return text[language];
}
