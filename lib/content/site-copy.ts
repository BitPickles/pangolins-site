export type SiteLanguage = "zh" | "en";

type LocalizedText = Record<SiteLanguage, string>;

export const morphoVaultUrl =
  "https://app.morpho.org/base/vault/0x1401d1271C47648AC70cBcdfA3776D4A87CE006B/pangolins-usdc";

export const siteCopy = {
  nav: {
    home: { zh: "首页", en: "Home" },
    monitoring: { zh: "监控与透明度", en: "Monitoring" }
  },
  home: {
    hero: {
      eyebrow: "Pangolins / Morpho Curator",
      title: {
        zh: "管理风险，而非资金",
        en: "Manage risk, not funds."
      },
      support: {
        zh: "为保守型链上资金构建的风险基础设施。",
        en: "Risk infrastructure for conservative onchain capital."
      },
      body: {
        zh: "Pangolins 是基于 Morpho 的链上风险管理层，当前聚焦 USDC / cbBTC 风格的保守型策略。",
        en: "Pangolins is an onchain risk-management layer built on Morpho, currently focused on a conservative USDC / cbBTC strategy style."
      },
      primaryCta: {
        zh: "查看监控与透明度",
        en: "View Monitoring"
      },
      secondaryCta: {
        zh: "在 Morpho 查看 Vault",
        en: "Morpho Vault"
      },
      chips: ["Morpho Vault", "USDC", "cbBTC", "Risk-first"],
      metrics: [
        {
          label: "Risk Layer",
          value: { zh: "保守", en: "Conservative" }
        },
        {
          label: "Liquidity",
          value: { zh: "优先", en: "Priority" }
        },
        {
          label: "Custody",
          value: { zh: "非托管", en: "Non-custodial" }
        }
      ]
    },
    scenes: [
      {
        kicker: "01 / Complexity Filter",
        title: {
          zh: "让 DeFi 的复杂性，停在系统里。",
          en: "Keep DeFi complexity inside the system."
        },
        body: {
          zh: "用户看到的是清晰策略；系统处理的是协议、流动性、抵押路径与执行风险。",
          en: "Users see a clear strategy. The system handles protocol, liquidity, collateral, and execution risk."
        },
        panelTitle: {
          zh: "Filter before exposure",
          en: "Filter before exposure"
        },
        panelBody: {
          zh: "先识别依赖，再决定是否进入市场。",
          en: "Identify dependencies before entering the market."
        }
      },
      {
        kicker: "02 / Exit Discipline",
        title: {
          zh: "不是追逐更高收益，而是保留退出能力。",
          en: "Not higher yield. Better exit discipline."
        },
        body: {
          zh: "保守层的价值，不在于多几个点，而在于风险上升时仍有纪律和路径。",
          en: "The defensive layer is not about a few extra points. It is about discipline and paths when risk rises."
        },
        panelTitle: {
          zh: "Liquidity is the constraint",
          en: "Liquidity is the constraint"
        },
        panelBody: {
          zh: "先保留退出能力，再谈收益增强。",
          en: "Preserve exit capacity before yield enhancement."
        }
      },
      {
        kicker: "03 / Continuous Security",
        title: {
          zh: "安全不是一次性的审计。",
          en: "Security is not a one-time audit."
        },
        body: {
          zh: "它是贯穿策略生命周期的监控、预警、复核与响应。",
          en: "It is monitoring, warning, review, and response across the full strategy lifecycle."
        },
        panelTitle: {
          zh: "Always watching the path",
          en: "Always watching the path"
        },
        panelBody: {
          zh: "系统持续观察 Coinbase、cbBTC 与 Morpho vault 的关键依赖。",
          en: "The system keeps watching Coinbase, cbBTC, and Morpho vault dependencies."
        }
      }
    ],
    manifesto: {
      title: {
        zh: "非托管。透明。长期主义。",
        en: "Non-custodial. Transparent. Long-term."
      },
      body: {
        zh: "资金不由 Pangolins 托管；风险必须被说明；策略不为短期热点改变边界。",
        en: "Funds are not custodied by Pangolins. Risk must be explained. Strategy boundaries should not drift for short-term narratives."
      },
      pillars: [
        {
          title: { zh: "非托管", en: "Non-custodial" },
          body: {
            zh: "我们提供策略与风控，不接管用户资产。",
            en: "We provide strategy and risk control, not custody."
          }
        },
        {
          title: { zh: "透明", en: "Transparent" },
          body: {
            zh: "公开原则、风险路径与监控维度。",
            en: "We publish principles, risk paths, and monitoring dimensions."
          }
        },
        {
          title: { zh: "长期主义", en: "Long-term" },
          body: {
            zh: "不为短期热点牺牲退出能力。",
            en: "We do not trade exit capacity for short-term trends."
          }
        }
      ]
    },
    cta: {
      title: {
        zh: "看见我们如何看风险。",
        en: "See how we watch risk."
      },
      body: {
        zh: "进入 Monitoring，查看 Coinbase / cbBTC / Morpho vault 的公开风险路径与当前状态。",
        en: "Open Monitoring to view the public risk paths and current posture for Coinbase / cbBTC / Morpho vault dependencies."
      }
    }
  }
} as const satisfies {
  nav: Record<string, LocalizedText>;
  home: {
    hero: {
      eyebrow: string;
      title: LocalizedText;
      support: LocalizedText;
      body: LocalizedText;
      primaryCta: LocalizedText;
      secondaryCta: LocalizedText;
      chips: string[];
      metrics: Array<{ label: string; value: LocalizedText }>;
    };
    scenes: Array<{
      kicker: string;
      title: LocalizedText;
      body: LocalizedText;
      panelTitle: LocalizedText;
      panelBody: LocalizedText;
    }>;
    manifesto: {
      title: LocalizedText;
      body: LocalizedText;
      pillars: Array<{ title: LocalizedText; body: LocalizedText }>;
    };
    cta: {
      title: LocalizedText;
      body: LocalizedText;
    };
  };
};

export function getSupportLanguage(language: SiteLanguage): SiteLanguage {
  return language === "zh" ? "en" : "zh";
}
