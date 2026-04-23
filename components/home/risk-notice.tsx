import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";
import { SectionFrame } from "@/components/home/section-frame";

type RiskNoticeProps = {
  language: SiteLanguage;
};

export function RiskNotice({ language }: RiskNoticeProps) {
  return (
    <SectionFrame
      id="risk-notice"
      index="07"
      label={siteCopy.riskNotice.label}
      language={language}
      title={siteCopy.riskNotice.title}
    >
      <div className="rounded-[1.75rem] border border-[rgba(251,113,133,0.24)] bg-[rgba(251,113,133,0.05)] p-6">
        <p className="max-w-3xl text-lg leading-8 text-white/72">
          {siteCopy.riskNotice.body[language]}
        </p>
      </div>
    </SectionFrame>
  );
}
