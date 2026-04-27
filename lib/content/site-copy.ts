export type SiteLanguage = "zh" | "en";

type LocalizedText = Record<SiteLanguage, string>;
type LocalizedLines = Record<SiteLanguage, readonly string[]>;

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
      titleLines: {
        zh: ["管理风险，", "而非资金"],
        en: ["Manage risk,", "not funds."]
      },
      support: {
        zh: "承诺不够，行为必须可验证。",
        en: "Promises are not enough. Actions must be verifiable."
      },
      body: {
        zh: "不托管资金，不包装收益。只筛选市场、约束流动性、执行风险边界。",
        en: "No custody. No yield packaging. Only market selection, liquidity constraints, and risk boundaries."
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
          label: { zh: "信任", en: "Trust" },
          value: { zh: "可验证", en: "Verifiable" }
        },
        {
          label: { zh: "流动性", en: "Liquidity" },
          value: { zh: "先于收益", en: "Before yield" }
        },
        {
          label: { zh: "托管", en: "Custody" },
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
        titleLines: {
          zh: ["信任不是写出来的，", "是执行出来的。"],
          en: ["Trust is not claimed.", "It is executed."]
        },
        body: {
          zh: "在开放借贷市场里，信任来自可追踪的路径、可解释的规则和可复核的动作。",
          en: "In open lending markets, trust comes from traceable paths, explainable rules, and reviewable actions."
        },
        panelTitle: {
          zh: "行动先于承诺",
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
        titleLines: {
          zh: ["Curator 不是", "收益包装者，", "而是安全边界", "的守门人。"],
          en: ["A Curator is not", "a yield wrapper.", "It is a", "boundary keeper."]
        },
        body: {
          zh: "进入之前先定义退出。收益排在流动性、抵押质量和风险边界之后。",
          en: "Exit is defined before entry. Yield comes after liquidity, collateral quality, and risk boundaries."
        },
        panelTitle: {
          zh: "边界先于收益",
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
        titleLines: {
          zh: ["安全不是一次审计，", "而是一套持续运行的纪律。"],
          en: ["Security is not a one-time audit.", "It is operating discipline."]
        },
        body: {
          zh: "市场、抵押品、流动性、预言机和链环境，进入同一个监控框架。",
          en: "Markets, collateral, liquidity, oracles, and chain conditions sit in one monitoring frame."
        },
        panelTitle: {
          zh: "看见路径",
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
      titleLines: {
        zh: ["收益可以复制，", "信任必须积累。"],
        en: ["Yield can be copied.", "Trust has to compound."]
      },
      thesis: {
        zh: "风险不是收益的反面，而是产品本身。",
        en: "Risk is not the opposite of yield. Risk is the product."
      },
      thesisLines: {
        zh: ["风险不是收益的反面，", "而是产品本身。"],
        en: ["Risk is not the opposite of yield.", "Risk is the product."]
      },
      body: {
        zh: "Pangolins 的原则是一组边界：非托管、可解释、主动筛选、退出优先。",
        en: "Pangolins principles are boundaries: non-custody, explainability, active selection, and exit-first execution."
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
          zh: "透明止于边界，纪律始于执行。",
          en: "Clear boundaries. Disciplined execution."
        },
        titleLines: {
          zh: ["透明止于边界，", "纪律始于执行。"],
          en: ["Clear boundaries.", "Disciplined execution."]
        },
      body: {
        zh: "Monitoring 只展示公开状态、风险路径和系统健康。具体阈值、撤出规则与执行时序不作为公开信号暴露。",
        en: "Monitoring shows public status, risk paths, and system health. Exact thresholds, exit rules, and execution timing stay private."
      }
    }
  }
} as const satisfies {
  nav: Record<string, LocalizedText>;
  home: {
    hero: {
      eyebrow: string;
      title: LocalizedText;
      titleLines: LocalizedLines;
      support: LocalizedText;
      body: LocalizedText;
      primaryCta: LocalizedText;
      secondaryCta: LocalizedText;
      chips: string[];
      metrics: Array<{ label: LocalizedText; value: LocalizedText }>;
    };
    scenes: Array<{
      kicker: string;
      title: LocalizedText;
      titleLines: LocalizedLines;
      body: LocalizedText;
      panelTitle: LocalizedText;
      panelBody: LocalizedText;
    }>;
    manifesto: {
      title: LocalizedText;
      titleLines: LocalizedLines;
      thesis: LocalizedText;
      thesisLines: LocalizedLines;
      body: LocalizedText;
      pillars: Array<{ title: LocalizedText; body: LocalizedText }>;
    };
    cta: {
      title: LocalizedText;
      titleLines: LocalizedLines;
      body: LocalizedText;
    };
  };
};

export function getSupportLanguage(language: SiteLanguage): SiteLanguage {
  return language === "zh" ? "en" : "zh";
}
