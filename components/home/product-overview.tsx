import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";
import { SectionFrame } from "@/components/home/section-frame";

type ProductOverviewProps = {
  language: SiteLanguage;
};

export function ProductOverview({ language }: ProductOverviewProps) {
  return (
    <SectionFrame
      id="product-thesis"
      index="01"
      label={siteCopy.overview.label}
      language={language}
      title={siteCopy.overview.title}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px]">
        <p className="max-w-3xl text-lg leading-8 text-white/68">
          {siteCopy.overview.body[language]}
        </p>
        <aside className="rounded-[1.5rem] border border-white/8 bg-white/[0.025] p-5">
          <p className="dossier-label">Reading Lens</p>
          <p className="mt-4 text-sm leading-7 text-white/58">
            {language === "zh"
              ? "把 Pangolins 理解成链上资产管理里的低风险层，而不是追逐最高收益的攻势仓位。"
              : "Read Pangolins as the lower-risk layer of onchain asset allocation, not an offensive yield sleeve."}
          </p>
        </aside>
      </div>
    </SectionFrame>
  );
}
