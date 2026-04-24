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
      eyebrow: "Morpho Curator / Defensive End",
      title: {
        zh: "我们管理的不是资金，而是风险",
        en: "We manage risk before capital."
      },
      support: {
        zh: "We manage risk before capital.",
        en: "A conservative curator layer for the defensive end of onchain capital."
      },
      body: {
        zh: "Pangolins 是一个基于 Morpho 的 curator 产品，服务于链上资产配置中最保守的一端。",
        en: "Pangolins is a Morpho curator product designed for the most defensive sleeve of onchain capital allocation."
      },
      primaryCta: {
        zh: "查看监控与透明度",
        en: "View Monitoring"
      },
      secondaryCta: {
        zh: "在 Morpho 查看 Vault",
        en: "Morpho Vault"
      },
      chips: ["Built on Morpho", "High Liquidity", "Conservative Risk", "Monitoring First"],
      metrics: [
        {
          label: "Primary Asset",
          value: { zh: "USDC", en: "USDC" }
        },
        {
          label: "Risk Mode",
          value: { zh: "保守", en: "Conservative" }
        },
        {
          label: "Focus",
          value: { zh: "cbBTC 相关市场", en: "cbBTC-backed markets" }
        }
      ]
    },
    scenes: [
      {
        kicker: "01 / Structure",
        title: {
          zh: "风险不是结果，它先是结构",
          en: "Risk is not only an outcome. It is a structure first."
        },
        body: {
          zh: "真正重要的，不只是收益曲线，而是你暴露在什么样的市场结构里。",
          en: "What matters is not only the yield curve, but the structure your capital is exposed to."
        },
        panelTitle: {
          zh: "Readable market structure",
          en: "Readable market structure"
        },
        panelBody: {
          zh: "优先选择边界清晰、信用锚更强、响应路径更可解释的底层市场。",
          en: "Favor markets whose boundaries, credit anchors, and response paths remain more legible."
        }
      },
      {
        kicker: "02 / Liquidity",
        title: {
          zh: "高流动性，不该以高风险为代价",
          en: "High liquidity should not require high risk."
        },
        body: {
          zh: "当资金处在保守层，退出能力比表面 APY 更重要。",
          en: "When capital sits in the defensive sleeve, exit capacity matters more than headline APY."
        },
        panelTitle: {
          zh: "Liquidity first",
          en: "Liquidity first"
        },
        panelBody: {
          zh: "我们优先保留流动性回收路径，而不是用复杂风险换一个更好看的数字。",
          en: "We preserve liquidity recovery paths before reaching for prettier numbers."
        }
      },
      {
        kicker: "03 / Discipline",
        title: {
          zh: "先保留退出能力，再谈收益增强",
          en: "Preserve exit capacity before yield enhancement."
        },
        body: {
          zh: "监控、约束与纪律先于收益包装。",
          en: "Monitoring, constraints, and discipline come before yield packaging."
        },
        panelTitle: {
          zh: "Monitoring before marketing",
          en: "Monitoring before marketing"
        },
        panelBody: {
          zh: "我们更愿意公开原则、监控维度和响应框架，而不是用故事包装高收益。",
          en: "We would rather publish principles, monitoring dimensions, and response frameworks than package yield with a story."
        }
      }
    ],
    manifesto: {
      title: {
        zh: "不是卖高收益，而是管理风险结构",
        en: "Not selling high yield, but managing risk structure."
      },
      body: {
        zh: "Pangolins 的价值，不在于把 APY 讲得更动听，而在于把风险边界讲得更清楚。",
        en: "Pangolins creates value by making risk boundaries clearer, not by making APY sound more exciting."
      },
      pillars: [
        {
          title: { zh: "流动性第一", en: "Liquidity First" },
          body: {
            zh: "优先保留可退出性。",
            en: "Exit capacity comes first."
          }
        },
        {
          title: { zh: "监控优先", en: "Monitoring First" },
          body: {
            zh: "持续观察链上变化与市场压力。",
            en: "Continuously watch onchain change and market stress."
          }
        },
        {
          title: { zh: "纪律执行", en: "Execution Discipline" },
          body: {
            zh: "不为更高数字牺牲原则。",
            en: "Do not trade principles for prettier numbers."
          }
        }
      ]
    },
    cta: {
      title: {
        zh: "细节不必全部公开，原则必须足够清楚",
        en: "Details need not be fully public, but principles must be clear."
      },
      body: {
        zh: "进入 Monitoring，查看这个 vault 当前的状态、监控维度与风险边界。",
        en: "Go to Monitoring for the vault's current posture, monitoring dimensions, and public risk boundary."
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
