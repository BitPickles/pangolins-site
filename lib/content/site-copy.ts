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
        zh: "Pangolins 是 Morpho 上的 Curator 风险管理策略。我们不包装收益，不托管资金，而是把市场选择、流动性约束、持续监控与防御性执行做成一套长期纪律。",
        en: "Pangolins is a Morpho Curator risk-management strategy. We do not package yield or custody funds; we turn market selection, liquidity constraints, continuous monitoring, and defensive execution into long-term discipline."
      },
      primaryCta: {
        zh: "查看监控与透明度",
        en: "View Monitoring"
      },
      secondaryCta: {
        zh: "在 Morpho 查看 Vault",
        en: "Morpho Vault"
      },
      chips: ["Morpho Curator", "Non-custodial", "Risk-first", "Trust-first"],
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
          zh: "市场、抵押品、流动性、预言机、执行环境与异常信号，都会进入同一个观察框架。",
          en: "Markets, collateral, liquidity, oracles, execution conditions, and abnormal signals are watched inside one operating frame."
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
        zh: "Pangolins 的原则不是一组宣传语，而是一组边界：资金不被托管，收益来源要可解释，市场要被筛选，风险上升时先保护退出能力。",
        en: "Pangolins principles are not slogans; they are boundaries: funds are not custodied, yield sources must be explainable, markets must be selected, and exit capacity comes first when risk rises."
      },
      pillars: [
        {
          title: { zh: "非托管", en: "Non-custodial" },
          body: {
            zh: "Pangolins 提供策略与风控，不接管用户资产。",
            en: "Pangolins provides strategy and risk control, not custody."
          }
        },
        {
          title: { zh: "拒绝黑箱", en: "No black boxes" },
          body: {
            zh: "不依赖不可验证的链下交易、私下承诺或模糊收益来源。",
            en: "No unverifiable offchain deals, private promises, or opaque yield sources."
          }
        },
        {
          title: { zh: "主动筛选", en: "Proactive" },
          body: {
            zh: "先看协议、抵押品、流动性和依赖关系，再决定是否进入市场。",
            en: "Protocols, collateral, liquidity, and dependencies are evaluated before entering a market."
          }
        },
        {
          title: { zh: "过度抵押", en: "Over-collateralized" },
          body: {
            zh: "偏好风险结构清晰、抵押充分、退出路径可解释的借贷市场。",
            en: "Preference goes to lending markets with clear structure, sufficient collateral, and explainable exits."
          }
        },
        {
          title: { zh: "透明披露", en: "Transparent" },
          body: {
            zh: "公开原则、收益来源、风险路径和方法论，不公开会削弱执行质量的触发器。",
            en: "Principles, yield sources, risk paths, and methodology are public; execution-sensitive triggers are not."
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
        zh: "进入 Monitoring，查看当前策略的公开风险路径、状态和响应边界。首页讲长期方法论，监控页展示当前执行环境。",
        en: "Open Monitoring to view the current strategy's public risk paths, status, and response boundaries. The homepage explains the long-term method; Monitoring shows the current execution environment."
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
