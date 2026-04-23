import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";
import { SectionFrame } from "@/components/home/section-frame";

type StrategyStyleProps = {
  language: SiteLanguage;
};

export function StrategyStyle({ language }: StrategyStyleProps) {
  return (
    <SectionFrame
      id="current-strategy-style"
      index="04"
      label={siteCopy.strategyStyle.label}
      language={language}
      title={siteCopy.strategyStyle.title}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <p className="max-w-3xl text-lg leading-8 text-white/68">
          {siteCopy.strategyStyle.body[language]}
        </p>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
          <p className="dossier-label">Current filters</p>
          <ul className="mt-4 space-y-3 text-sm uppercase tracking-[0.14em] text-white/62">
            {siteCopy.strategyStyle.notes.map((note) => (
              <li key={note} className="border-t border-white/8 pt-3 first:border-t-0 first:pt-0">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionFrame>
  );
}
