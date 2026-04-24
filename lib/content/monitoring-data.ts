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
    "围绕 Pangolins 在 Morpho 上的 USDC vault，公开 Coinbase / cbBTC / Morpho 三条关键风险路径。这里展示原则、状态和监控维度，不公开执行阈值。",
  summary: [
    {
      label: "Coinbase 安全路径",
      value: "托管与运营连续性",
      detail: "Coinbase 是明确依赖项，不是安全承诺。我们关注托管、赎回与运营连续性。"
    },
    {
      label: "cbBTC 链上路径",
      value: "Wrapped BTC 流转",
      detail: "持续观察 mint / redeem 假设、链上流动、抵押品质量与异常集中。"
    },
    {
      label: "Morpho Vault 状态",
      value: "Curator 风险纪律",
      detail: "关注市场配置、可回收流动性、风险姿态与公开响应边界。"
    }
  ],
  statusCards: [
    {
      title: "Vault Status",
      value: "Normal",
      note: "未见公开级异常信号。",
      tone: "normal"
    },
    {
      title: "Risk Mode",
      value: "Conservative",
      note: "退出能力优先于收益扩张。",
      tone: "watch"
    },
    {
      title: "Market Focus",
      value: "USDC / cbBTC",
      note: "聚焦 Coinbase / cbBTC / Morpho 依赖链。",
      tone: "normal"
    },
    {
      title: "Monitoring Stack",
      value: "Onchain + Mempool + Alerts",
      note: "公开监控维度，不公开触发细节。",
      tone: "normal"
    }
  ],
  sections: [
    {
      slug: "safety-logic",
      title: "三条风险路径",
      body:
        "安全看板不把风险压缩成一个分数，而是拆成可被持续观察的依赖路径。",
      bullets: [
        "Coinbase：托管、赎回、运营连续性。",
        "cbBTC：发行路径、链上流转、抵押品质量。",
        "Morpho Vault：市场配置、流动性回收、curator 纪律。"
      ]
    },
    {
      slug: "monitoring-dimensions",
      title: "我们的系统在看什么",
      body:
        "监控聚焦会影响退出能力和风险结构的变化，而不是堆砌无关指标。",
      bullets: [
        "攻击风险：异常交易、闪电贷路径、可疑交互。",
        "金融风险：预言机异常、流动性压力、借贷活动突变。",
        "运营风险：合约升级、权限变化、关键依赖异常。"
      ]
    },
    {
      slug: "principles",
      title: "Principles & Rules",
      body:
        "规则要短，执行要硬。风险先被说明，然后才谈收益。",
      bullets: [
        "风险先被说明。",
        "流动性优先。",
        "不公开削弱执行质量的触发细节。"
      ]
    },
    {
      slug: "abnormal-response-flow",
      title: "风险上升时如何响应",
      body:
        "异常响应按阶段处理：识别、收缩、复核、回收、观察。",
      bullets: [
        "发现异常信号，提升监控等级。",
        "停止新增暴露，评估可回收流动性。",
        "优先回收可回收资金，进入持续观察。"
      ]
    },
    {
      slug: "transparency-boundaries",
      title: "透明，不等于公开全部执行细节",
      body:
        "透明的目标是让用户理解风险边界，不是让市场反向预判执行动作。",
      bullets: [
        "公开原则、风险路径和监控维度。",
        "不公开阈值、触发器和执行时序。",
        "实时数据接口后续可直接替换 mock feed。"
      ]
    },
    {
      slug: "risk-statement",
      title: "技术能力不能消灭风险",
      body:
        "技术能力不能消灭风险，只能更早识别风险。监控提高响应速度，不改变底层市场约束。",
      bullets: [
        "不能消除托管、发行人、流动性、预言机或智能合约风险。",
        "不能保证一定撤出或一定领先市场。",
        "任何使用都仍需要独立尽调与风险判断。"
      ]
    }
  ],
  liquidity: [
    {
      label: "Available liquidity",
      value: "High",
      detail: "mock: reserved for liquidity depth and withdrawal resilience."
    },
    {
      label: "Pressure level",
      value: "Contained",
      detail: "mock: later driven by live market feeds."
    }
  ],
  riskSignals: [
    {
      title: "Custody reliance",
      value: "Explicitly tracked",
      note:
        "Coinbase continuity is tracked as a named dependency, not hidden inside generic market risk.",
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
    "Safety-board copy aligned with Apple Launch direction."
  ]
};
