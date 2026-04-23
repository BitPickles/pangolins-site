import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";
import { SectionFrame } from "@/components/home/section-frame";

type WhyThisExistsProps = {
  language: SiteLanguage;
};

export function WhyThisExists({ language }: WhyThisExistsProps) {
  return (
    <SectionFrame
      id="why-this-exists"
      index="02"
      label={siteCopy.whyThisExists.label}
      language={language}
      title={siteCopy.whyThisExists.title}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {siteCopy.whyThisExists.points.map((point) => (
          <article
            key={point.en}
            className="dossier-panel rounded-[1.5rem] p-6 text-base leading-7 text-white/68"
          >
            {point[language]}
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
