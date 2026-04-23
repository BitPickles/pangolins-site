export const siteCopy = {
  nav: {
    home: { zh: "首页", en: "Home" },
    monitoring: { zh: "监控与透明度", en: "Monitoring" }
  },
  hero: {
    title: {
      zh: "我们管理的不是资金，而是风险",
      en: "We manage risk before capital."
    },
    subtitle: {
      zh: "一个基于 Morpho 的 Curator 风险管理产品，服务于链上杠铃策略中最保守的一端。",
      en: "A Morpho curator product focused on the defensive end of onchain capital allocation."
    }
  }
} as const;

export type SiteLanguage = "zh" | "en";
