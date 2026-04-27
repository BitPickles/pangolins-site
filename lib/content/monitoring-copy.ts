import type { MonitoringModuleId, MonitoringTone } from "@/lib/content/monitoring-data";
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
      zh: "当前页面汇总这个 Vault 相关的公开监控：抵押资产、Morpho 协议运行与 Base 链环境。",
      en: "This page summarizes the public monitors supporting the current vault: collateral, Morpho runtime, and Base chain conditions."
    },
    dataNotice: {
      zh: "公开预览，非实时数据源。",
      en: "Public preview, not a live feed."
    },
    monitorTree: { zh: "监控结构", en: "Monitor Tree" },
    monitorTreeBody: {
      zh: "一个 Vault，总览在上，子监控在下。",
      en: "One vault overview with dedicated child monitors."
    },
    nextModules: { zh: "可扩展模块", en: "Expansion slots" },
    futureModules: {
      zh: ["新抵押资产", "新协议", "新执行环境"],
      en: ["New collateral", "New protocol", "New venue"]
    },
    vaultOverview: { zh: "金库总览", en: "Vault overview" },
    vaultOverviewTitle: { zh: "Pangolins USDC Vault 总览", en: "Pangolins USDC Vault Overview" },
    vaultOverviewBody: {
      zh: "总览只呈现当前 Vault 的公开状态和监控路径。更细的执行阈值与时序不会作为公开信号暴露。",
      en: "The overview presents public status and monitor paths for the current vault. Execution thresholds and timing are not exposed as public signals."
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
      zh: "公开快照。接入实时数据后，模块结构保持不变。",
      en: "Public preview. The module structure remains stable when live sources are connected."
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
      title: { zh: "数据模式", en: "Feed Mode" },
      value: { zh: "公开预览", en: "Public preview" },
      note: { zh: "当前为演示数据层，不代表实时监控结果。", en: "Current data is a preview layer, not a live monitor output." },
      tone: "watch"
    },
    {
      title: { zh: "活跃模块", en: "Active Modules" },
      value: { zh: "3 个", en: "3" },
      note: { zh: "cbBTC、Morpho、Base 已独立拆分。", en: "cbBTC, Morpho, and Base are split into dedicated monitors." },
      tone: "normal"
    },
    {
      title: { zh: "扩展能力", en: "Expansion Slots" },
      value: { zh: "开放", en: "Open" },
      note: { zh: "未来新市场可以按模块接入。", en: "Future markets can be added as independent modules." },
      tone: "normal"
    }
  ] satisfies LocalizedStatusCard[],
  recentEvents: [
    {
      zh: "Vault 公开预览已生成。",
      en: "Vault public preview rendered."
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
          unit: { zh: "美元深度", en: "USD depth" },
          detail: { zh: "Base 上 cbBTC 相关流动性的公开深度。", en: "Public liquidity depth for cbBTC routes on Base." },
          seriesNames: [{ zh: "可观察流动性", en: "Tracked liquidity" }]
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
        { zh: "cbBTC 发行量曲线已纳入公开预览。", en: "cbBTC supply series is included in the public preview." },
        { zh: "当前未观察到需要升级披露的公开事件。", en: "No public event currently requires escalation." },
        { zh: "流动性与价格偏离模块已预留实时接入。", en: "Liquidity and basis modules are prepared for live source integration." }
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
          detail: { zh: "Morpho 在主要链上的 TVL 变化。", en: "Morpho TVL changes across major chains." },
          seriesNames: [
            { zh: "Ethereum", en: "Ethereum" },
            { zh: "Base", en: "Base" },
            { zh: "Arbitrum", en: "Arbitrum" },
            { zh: "Optimism", en: "Optimism" }
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
        { zh: "Morpho TVL 与利用率曲线已纳入公开预览。", en: "Morpho TVL and utilization are included in the public preview." },
        { zh: "当前未观察到需要升级披露的公开事件。", en: "No public event currently requires escalation." },
        { zh: "Vault 持仓与预言机模块已预留实时接入。", en: "Vault position and oracle modules are prepared for live source integration." }
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
        { zh: "Base USDC、出块与 Gas 指标已纳入公开预览。", en: "Base USDC, block, and gas metrics are included in the public preview." },
        { zh: "当前未观察到需要升级披露的公开事件。", en: "No public event currently requires escalation." },
        { zh: "Sequencer 与 RPC 模块已预留实时接入。", en: "Sequencer and RPC modules are prepared for live source integration." }
      ]
    }
  } satisfies Record<MonitoringModuleId, LocalizedModuleCopy>
} as const;

export function localize(text: LocalizedText, language: SiteLanguage): string {
  return text[language];
}
