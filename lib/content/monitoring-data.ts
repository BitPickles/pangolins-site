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
    "Pangolins USDC Vault 的安全看板只回答一个问题：这条策略依赖什么，哪里可能失效，我们如何持续观察。这里公开原则、状态和风险路径，不公开执行触发器。",
  summary: [
    {
      label: "Coinbase 安全路径",
      value: "明确依赖，不是保证",
      detail: "关注 Coinbase 公开储备信息、托管连续性、赎回通道与异常公开事件。"
    },
    {
      label: "cbBTC 链上路径",
      value: "发行与流转可观察",
      detail: "观察 wrapped BTC 发行路径、Base 链上流动、集中度与抵押品可解释性。"
    },
    {
      label: "Morpho Vault 状态",
      value: "Curator 执行纪律",
      detail: "关注市场配置边界、可用流动性、异常响应和链上可验证动作。"
    }
  ],
  statusCards: [
    {
      title: "Vault Status",
      value: "Normal",
      note: "公开看板未标记升级事件。",
      tone: "normal"
    },
    {
      title: "Risk Mode",
      value: "Conservative",
      note: "边界和退出能力先于收益增强。",
      tone: "watch"
    },
    {
      title: "Market Focus",
      value: "USDC / cbBTC",
      note: "聚焦 Coinbase、cbBTC 与 Morpho 依赖链。",
      tone: "normal"
    },
    {
      title: "Monitoring Stack",
      value: "Onchain + Mempool + Alerts",
      note: "监控更早的变化，不公开触发器。",
      tone: "normal"
    }
  ],
  sections: [
    {
      slug: "curator-role",
      title: "Curator 的职责不是包装收益",
      body:
        "Morpho 给 Curator 充分的配置自由，也把风险解释和应急责任放到前台。",
      bullets: [
        "进入市场前先定义依赖路径。",
        "公开原则和观察维度。",
        "保留必要执行细节，避免削弱响应质量。"
      ]
    },
    {
      slug: "safety-logic",
      title: "三条安全路径",
      body:
        "我们不把安全压缩为单个分数；Coinbase、cbBTC、Morpho Vault 是三个不同风险来源。",
      bullets: [
        "Coinbase：托管连续性、公开储备信息、赎回路径。",
        "cbBTC：wrapped BTC 发行假设、链上流转、集中度变化。",
        "Morpho Vault：市场配置、可回收流动性、Curator 纪律。"
      ]
    },
    {
      slug: "monitoring-dimensions",
      title: "系统在看什么",
      body:
        "监控聚焦会改变退出能力和风险结构的信号，而不是堆砌与决策无关的指标。",
      bullets: [
        "托管与发行：公开储备信息、赎回假设、关键公告。",
        "链上状态：大额转移、集中度、流动性压力、预言机异常。",
        "执行环境：pending transaction / mempool 信号、告警路由、操作 readiness。"
      ]
    },
    {
      slug: "principles",
      title: "收益可以复制，信任必须积累",
      body:
        "旧文章里最有价值的部分，是把 Pangolins 的工作边界说清楚。新版 vault 继续沿用这组纪律。",
      bullets: [
        "拒绝链下黑箱交易或私下承诺。",
        "只进入边界清晰、过度抵押、流动性可解释的市场。",
        "先保留退出能力，再考虑收益增强。"
      ]
    },
    {
      slug: "abnormal-response-flow",
      title: "风险上升时如何响应",
      body:
        "异常响应按阶段处理：识别、收缩、复核、回收、观察。框架公开，触发器不公开。",
      bullets: [
        "发现异常信号，提升监控等级。",
        "停止新增暴露，复核依赖路径与可回收流动性。",
        "优先处理可回收流动性，再进入持续观察。"
      ]
    },
    {
      slug: "transparency-and-risk",
      title: "透明，不等于消灭风险",
      body:
        "透明让风险被看见；技术让响应更早发生。两者都不能让市场脱离托管、流动性和智能合约约束。",
      bullets: [
        "公开原则、路径、状态与方法论。",
        "不公开阈值、触发器和执行时序。",
        "不承诺退出顺序或结果；只提升识别和响应质量。"
      ]
    }
  ],
  liquidity: [
    {
      label: "Available liquidity",
      value: "High",
      detail: "mock: 后续接入可用流动性与提现韧性数据。"
    },
    {
      label: "Pressure level",
      value: "Contained",
      detail: "mock: 后续由市场压力与链上流动性数据驱动。"
    }
  ],
  riskSignals: [
    {
      title: "Custody reliance",
      value: "Explicitly tracked",
      note:
        "Coinbase 连续性被作为明确依赖观察，不藏在泛化的市场风险里。",
      tone: "watch"
    },
    {
      title: "Liquidity drawdown watch",
      value: "Active",
      note: "提现假设与二级市场深度被合并为同一个退出问题观察。",
      tone: "normal"
    }
  ],
  recentEvents: [
    "Mock feed heartbeat refreshed.",
    "No elevated public-facing incident flag.",
    "Mirror thesis integrated into safety-board language."
  ]
};
