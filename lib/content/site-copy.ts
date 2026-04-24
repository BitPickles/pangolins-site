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
        zh: "信任不是承诺，是可验证的行动。",
        en: "Trust is not a promise. It is verifiable action."
      },
      body: {
        zh: "Pangolins 是 Morpho 上的 Curator 风险管理策略。我们不包装收益，不托管资金，而是把市场选择、流动性约束与异常响应做成一套持续运行的纪律。",
        en: "Pangolins is a Morpho Curator risk-management strategy. We do not package yield or custody funds; we turn market selection, liquidity constraints, and abnormal-response discipline into a continuous operating system."
      },
      primaryCta: {
        zh: "查看监控与透明度",
        en: "View Monitoring"
      },
      secondaryCta: {
        zh: "在 Morpho 查看 Vault",
        en: "Morpho Vault"
      },
      chips: ["Morpho Curator", "USDC Vault", "cbBTC Path", "Trust-first"],
      metrics: [
        {
          label: "Trust",
          value: { zh: "可验证", en: "Verifiable" }
        },
        {
          label: "Liquidity",
          value: { zh: "先于收益", en: "Before yield" }
        },
        {
          label: "Custody",
          value: { zh: "非托管", en: "Non-custodial" }
        }
      ]
    },
    scenes: [
      {
        kicker: "01 / Verifiable Trust",
        title: {
          zh: "信任不是写出来的，是执行出来的。",
          en: "Trust is not claimed. It is executed."
        },
        body: {
          zh: "在开放借贷市场里，每一次资金配置都是一次风险再分配。Pangolins 的职责，是把原则、路径和响应放到可被验证的位置。",
          en: "In open lending markets, every allocation redistributes risk. Pangolins exists to make principles, paths, and responses verifiable."
        },
        panelTitle: {
          zh: "Action before promise",
          en: "Action before promise"
        },
        panelBody: {
          zh: "链上可追踪，规则可解释，边界不漂移。",
          en: "Traceable onchain, explainable by rules, stable at the boundary."
        }
      },
      {
        kicker: "02 / Curator Boundary",
        title: {
          zh: "Curator 不是收益包装者，而是安全边界的守门人。",
          en: "A Curator is not a yield wrapper. It is a boundary keeper."
        },
        body: {
          zh: "我们筛选的是市场，约束的是流动性，管理的是风险暴露；进入之前先定义退出，收益永远排在边界之后。",
          en: "We select markets, constrain liquidity, and manage exposure. Exit is defined before entry; yield comes after the boundary."
        },
        panelTitle: {
          zh: "Boundary before yield",
          en: "Boundary before yield"
        },
        panelBody: {
          zh: "先保留退出能力，再讨论收益增强。",
          en: "Preserve exit capacity before discussing yield enhancement."
        }
      },
      {
        kicker: "03 / Continuous Security",
        title: {
          zh: "安全不是一次审计，而是一套持续运行的纪律。",
          en: "Security is not a one-time audit. It is operating discipline."
        },
        body: {
          zh: "Coinbase 的托管连续性、cbBTC 的链上流转、Morpho Vault 的可回收流动性，都会进入同一个观察框架。",
          en: "Coinbase continuity, cbBTC onchain movement, and Morpho Vault recoverable liquidity are watched inside one operating frame."
        },
        panelTitle: {
          zh: "Watch the path",
          en: "Watch the path"
        },
        panelBody: {
          zh: "不神秘化能力，也不把触发器交给市场。",
          en: "We disclose capabilities without handing execution triggers to the market."
        }
      }
    ],
    manifesto: {
      title: {
        zh: "收益可以复制，信任必须积累。",
        en: "Yield can be copied. Trust has to compound."
      },
      body: {
        zh: "旧文章里最重要的不是口号，而是边界：拒绝链下黑箱交易，主动筛选市场，只做过度抵押结构，持续监控并保留防御性响应。",
        en: "The strongest idea from the original Pangolins thesis was not a slogan, but a boundary: no offchain black boxes, proactive market selection, over-collateralized structures, continuous monitoring, and defensive response."
      },
      pillars: [
        {
          title: { zh: "链上可验证", en: "Verifiable" },
          body: {
            zh: "原则、vault 与关键依赖路径公开；行动以链上记录为准。",
            en: "Principles, the vault, and key dependency paths are public; actions are grounded in onchain records."
          }
        },
        {
          title: { zh: "主动筛选", en: "Proactive" },
          body: {
            zh: "优秀市场不靠游说进入；我们先看抵押品、流动性和依赖关系。",
            en: "Markets do not enter through lobbying; collateral, liquidity, and dependencies are evaluated first."
          }
        },
        {
          title: { zh: "防御执行", en: "Defensive" },
          body: {
            zh: "风险上升时，先停止扩张、复核路径，再处理可回收流动性。",
            en: "When risk rises, expansion pauses, paths are reviewed, and recoverable liquidity is handled first."
          }
        }
      ]
    },
    cta: {
      title: {
        zh: "看见风险如何被拆开。",
        en: "See risk broken into paths."
      },
      body: {
        zh: "监控页不暴露完整策略触发器；它公开 Coinbase、cbBTC 与 Morpho Vault 的风险路径、状态和响应边界。",
        en: "The monitoring page does not expose full strategy triggers; it publishes the Coinbase, cbBTC, and Morpho Vault risk paths, status, and response boundaries."
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
