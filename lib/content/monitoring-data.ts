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
  sections: MonitoringSection[];
  liquidity: MonitoringSummaryItem[];
  riskSignals: MonitoringStatusCard[];
  recentEvents: string[];
};

export const monitoringSnapshot: MonitoringSnapshot = {
  asOf: "Mock feed refreshed every 5 minutes",
  vault: {
    name: "Pangolins USDC Vault",
    address: "0x1401d1271C47648AC70cBcdfA3776D4A87CE006B",
    chain: "Base",
    curator: "Pangolins",
    link:
      "https://app.morpho.org/base/vault/0x1401d1271C47648AC70cBcdfA3776D4A87CE006B/pangolins-usdc#overview"
  },
  headline:
    "这个页面围绕 Pangolins 在 Morpho 上的具体 vault 展示当前风险姿态、监控重点与透明度边界。我们公开方法、维度与原则，但不公开全部执行阈值。",
  summary: [
    {
      label: "Coinbase / 托管路径",
      value: "主要链下依赖",
      detail: "我们把 Coinbase 的托管与运营连续性视作第一层外部风险控制点，而不是品牌背书。"
    },
    {
      label: "cbBTC / 抵押路径",
      value: "全链路跟踪",
      detail: "Mint、托管、赎回与链上抵押流转被视为同一条信任链来观察。"
    },
    {
      label: "Response / 响应准备",
      value: "分级升级",
      detail: "告警会映射到收缩暴露、人工复核、流动性评估与对外信息边界。"
    }
  ],
  statusCards: [
    {
      title: "Vault Status",
      value: "Normal",
      note: "当前未见触发异常响应流程的公开级别信号，维持保守风格与持续监控。",
      tone: "normal"
    },
    {
      title: "Risk Mode",
      value: "Conservative",
      note: "优先约束退出能力与风险边界，而不是为表面 APY 扩张风险敞口。",
      tone: "watch"
    },
    {
      title: "Market Focus",
      value: "USDC / cbBTC",
      note: "关注托管质量、抵押品路径清晰度与流动性退出条件更明确的市场结构。",
      tone: "normal"
    },
    {
      title: "Monitoring Stack",
      value: "Onchain + Mempool + Alerts",
      note: "我们公开监控维度与能力边界，但不公开全部触发器和执行时序。",
      tone: "normal"
    }
  ],
  sections: [
    {
      slug: "safety-logic",
      title: "为什么我们关注 Coinbase / cbBTC / Morpho 这条路径",
      body:
        "Pangolins 的保守逻辑不来自单一品牌，也不来自一句“安全”口号，而来自这条路径里每一层依赖都可以被拆开理解、单独监控并在必要时响应。",
      bullets: [
        "Coinbase 被视为明确命名的运营与托管依赖，而不是“因此无风险”的理由。",
        "cbBTC 被视为需要持续验证赎回完整性与托管连续性的 wrapped BTC 路径。",
        "Morpho 提供的是 vault 结构、风险参数与执行纪律，并不消除底层资产路径风险。"
      ]
    },
    {
      slug: "monitoring-dimensions",
      title: "我们在看什么",
      body:
        "监控不是堆指标，而是把真正影响退出能力与风险结构的信号归并成少数几个维度，让操作者先看见集中风险在哪里。",
      bullets: [
        "Counterparty continuity：托管、发行、赎回与关键主体的运营连续性。",
        "Market function：可用流动性、赎回假设、退出路径与市场压力变化。",
        "Protocol integrity：合约变更、参数变化、预言机假设与策略漂移。"
      ]
    },
    {
      slug: "principles",
      title: "Principles & Rules",
      body:
        "我们公开的是原则、方法论与边界，而不是所有内部阈值。真正重要的不是具体数字，而是有没有稳定的执行纪律。",
      bullets: [
        "流动性优先于收益率优化。",
        "风险边界优先于表面 APY。",
        "执行纪律优先于主观侥幸。"
      ]
    },
    {
      slug: "abnormal-response-flow",
      title: "当风险上升时，我们如何响应",
      body:
        "异常状态必须按阶段处理。第一反应不是 improvisation，而是收缩、确认、评估与分级响应。",
      bullets: [
        "发现异常信号，记录依赖点与当前暴露假设。",
        "提升监控等级，停止新增暴露并评估流动性回收条件。",
        "优先回收可回收资金，并进入持续观察 / 应急模式。"
      ]
    },
    {
      slug: "transparency-boundaries",
      title: "透明，不等于自废武功",
      body:
        "这个页面解释我们如何思考、监控什么、风险边界在哪里，但不会公开所有内部执行细节。",
      bullets: [
        "公开监控类别、逻辑与风险态度。",
        "不公开会削弱响应质量的阈值、触发器与执行时序。",
        "当前 mock 数据用于稳定未来真实数据接口。"
      ]
    },
    {
      slug: "risk-statement",
      title: "技术能力不能消灭风险，只能更早识别风险",
      body:
        "没有任何监控页面能消除托管、发行人、流动性、预言机、治理或智能合约风险。这个页面展示的是纪律，而不是保证。",
      bullets: [
        "保守定位会降低一部分损失路径，但不能消除损失场景。",
        "更深的监控提高的是响应速度与先手概率，不是市场本身的流动性。",
        "任何真实部署都仍应结合独立尽调与风险判断。"
      ]
    }
  ],
  liquidity: [
    {
      label: "Available liquidity",
      value: "High",
      detail: "mock: the page reserves a slot for liquidity depth and withdrawal resilience."
    },
    {
      label: "Pressure level",
      value: "Contained",
      detail: "mock: pressure classification will later be driven by live market feeds."
    }
  ],
  riskSignals: [
    {
      title: "Custody reliance",
      value: "Explicitly tracked",
      note: "Coinbase continuity is treated as a named dependency, not buried inside generic market risk.",
      tone: "watch"
    },
    {
      title: "Liquidity drawdown watch",
      value: "Active",
      note: "Withdrawal assumptions and secondary market depth are monitored as one exit problem.",
      tone: "normal"
    }
  ],
  recentEvents: [
    "Mock feed heartbeat refreshed.",
    "No elevated public-facing incident flag.",
    "Transparency copy synchronized with current conservative posture."
  ]
};
