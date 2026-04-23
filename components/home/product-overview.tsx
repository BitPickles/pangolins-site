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
      <p className="max-w-3xl text-lg leading-8 text-white/68">
        {siteCopy.overview.body[language]}
      </p>
    </SectionFrame>
  );
}
