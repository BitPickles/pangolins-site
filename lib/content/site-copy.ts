export type SiteLanguage = "zh" | "en";

type LocalizedText = Record<SiteLanguage, string>;

type Capability = {
  kicker: string;
  title: LocalizedText;
  body: LocalizedText;
};

export const morphoVaultUrl =
  "https://app.morpho.org/base/vault/0x1401d1271C47648AC70cBcdfA3776D4A87CE006B/pangolins-usdc";

export const siteCopy = {
  nav: {
    home: { zh: "首页", en: "Home" },
    monitoring: { zh: "监控与透明度", en: "Monitoring" }
  },
  hero: {
    eyebrow: "Morpho Curator / Conservative Risk",
    tags: ["Built on Morpho", "Conservative Risk", "High Liquidity", "Monitoring First"],
    title: {
      zh: "我们管理的不是资金，而是风险",
      en: "We manage risk before capital."
    },
    support: {
      zh: "We manage risk before capital.",
      en: "Conservative risk management for the defensive end of onchain capital."
    },
    body: {
      zh: "一个基于 Morpho 的 Curator 风险管理产品，服务于链上杠铃策略中最保守的一端。我们通过克制的市场选择、严格的流动性约束与持续监控，为资产提供一个更低风险、更高流动性的停泊位。",
      en: "A Morpho curator product focused on the defensive end of onchain capital allocation."
    },
    primaryCta: {
      zh: "查看监控与透明度",
      en: "View Monitoring"
    },
    secondaryCta: {
      zh: "在 Morpho 查看 Vault",
      en: "Morpho Vault"
    },
    summary: {
      zh: "风险管理本身，就是产品。",
      en: "Risk management itself is the product."
    }
  },
  overview: {
    label: "Product Thesis",
    title: {
      zh: "它不是收益故事，而是资产停泊位。",
      en: "This is not a yield story. It is a defensive berth for capital."
    },
    body: {
      zh: "当市场进入不确定区间，真正稀缺的不是更高收益，而是可解释、可退出、可监控的风险敞口。",
      en: "When markets turn uncertain, the scarce asset is not more yield. It is exposure that remains legible, liquid, and monitorable."
    }
  },
  whyThisExists: {
    label: "Why This Exists",
    title: {
      zh: "我们想解决的，是链上保守层的缺口。",
      en: "Pangolins exists to fill the conservative gap onchain."
    },
    points: [
      {
        zh: "多数产品争夺更高 APY，很少有人把退出能力当作第一约束。",
        en: "Most products compete for higher APY. Few make exit capacity the first constraint."
      },
      {
        zh: "风险并不会因为链上透明而消失，它只会在市场结构里重新排列。",
        en: "Transparency does not remove risk. It only changes where risk accumulates."
      },
      {
        zh: "Pangolins 提供的是一个更克制的配置位置，而不是更激进的收益承诺。",
        en: "Pangolins offers a restrained allocation slot, not a more aggressive yield promise."
      }
    ]
  },
  barbellPositioning: {
    label: "Barbell Positioning",
    title: {
      zh: "在杠铃策略里，我们站在最保守的一端。",
      en: "Within a barbell strategy, Pangolins sits at the defensive edge."
    },
    left: {
      title: {
        zh: "进攻端",
        en: "Offensive edge"
      },
      body: {
        zh: "更高波动、更高假设、更高容错成本。",
        en: "Higher volatility, broader assumptions, and less forgiveness."
      }
    },
    right: {
      title: {
        zh: "保守端",
        en: "Defensive edge"
      },
      body: {
        zh: "更高流动性、更窄风险边界、更清晰的监控对象。",
        en: "Higher liquidity, narrower risk bounds, and clearer monitoring targets."
      }
    }
  },
  strategyStyle: {
    label: "Current Strategy Style",
    title: {
      zh: "当前风格：偏向结构清晰、响应路径可预期的市场。",
      en: "Current posture: favoring markets with cleaner structure and clearer response paths."
    },
    body: {
      zh: "我们优先偏好具有更清晰托管、抵押与流动性特征的市场环境。技术能力提升的是反应速度，不是市场在压力下天然拥有的流动性。",
      en: "We currently prefer markets with clearer custody, collateral, and liquidity characteristics. Better operations improve reaction speed, not the physical liquidity available under stress."
    },
    notes: [
      "Coinbase-linked custody preference",
      "cbBTC-oriented collateral clarity",
      "Monitoring before expansion"
    ]
  },
  capabilities: {
    label: "Core Capabilities",
    title: {
      zh: "能力边界很清楚，也必须很克制。",
      en: "The capability set is intentionally narrow and disciplined."
    },
    items: [
      {
        kicker: "01",
        title: {
          zh: "市场选择",
          en: "Market selection"
        },
        body: {
          zh: "只进入风险结构更容易被解释和被追踪的市场。",
          en: "We only enter markets whose risk structure is easier to interpret and track."
        }
      },
      {
        kicker: "02",
        title: {
          zh: "流动性约束",
          en: "Liquidity discipline"
        },
        body: {
          zh: "退出能力优先于名义收益，流动性不是事后补救项。",
          en: "Exit capacity ranks above nominal yield. Liquidity is not a post-hoc fix."
        }
      },
      {
        kicker: "03",
        title: {
          zh: "持续监控",
          en: "Continuous monitoring"
        },
        body: {
          zh: "监控覆盖市场状态、基础设施、执行条件与异常响应准备。",
          en: "Monitoring covers market state, infrastructure health, execution conditions, and response readiness."
        }
      }
    ] satisfies Capability[]
  },
  monitoringBridge: {
    label: "Monitoring Bridge",
    title: {
      zh: "主页讲清方法，监控页展示当下姿态。",
      en: "The home page explains the method. Monitoring shows the current posture."
    },
    body: {
      zh: "如果你想知道 Pangolins 现在如何看待风险、看什么、公开到什么边界，请进入监控与透明度页面。",
      en: "If you want the current vault posture, monitoring dimensions, and public transparency boundaries, go to Monitoring."
    }
  },
  riskNotice: {
    label: "Risk Notice",
    title: {
      zh: "低风险不等于无风险。",
      en: "Lower risk does not mean no risk."
    },
    body: {
      zh: "Morpho、市场流动性、预言机、托管路径与执行环境都可能在异常条件下承压。Pangolins 能做的是更早识别、更快响应，而不是承诺风险消失。",
      en: "Morpho, market liquidity, oracle behavior, custody paths, and execution conditions can all degrade under stress. Pangolins aims to identify problems earlier and respond faster, not to promise risk elimination."
    }
  }
} as const;

export function getSupportLanguage(language: SiteLanguage): SiteLanguage {
  return language === "zh" ? "en" : "zh";
}
