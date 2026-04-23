import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";
import { SectionFrame } from "@/components/home/section-frame";

type BarbellPositioningProps = {
  language: SiteLanguage;
};

export function BarbellPositioning({ language }: BarbellPositioningProps) {
  return (
    <SectionFrame
      id="barbell-positioning"
      index="03"
      label={siteCopy.barbellPositioning.label}
      language={language}
      title={siteCopy.barbellPositioning.title}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-[1.75rem] border border-slate-900/8 bg-[#f8fafc] p-6">
          <p className="dossier-label">{siteCopy.barbellPositioning.left.title.en}</p>
          <h3 className="mt-4 font-display text-2xl text-[#0f172a]">
            {siteCopy.barbellPositioning.left.title[language]}
          </h3>
          <p className="mt-3 text-base leading-7 text-[#627083]">
            {siteCopy.barbellPositioning.left.body[language]}
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-[color:var(--line-strong)] bg-[linear-gradient(180deg,rgba(106,149,232,0.12),rgba(255,255,255,0.92))] p-6">
          <p className="dossier-label">{siteCopy.barbellPositioning.right.title.en}</p>
          <h3 className="mt-4 font-display text-2xl text-[#0f172a]">
            {siteCopy.barbellPositioning.right.title[language]}
          </h3>
          <p className="mt-3 text-base leading-7 text-[#4f5d70]">
            {siteCopy.barbellPositioning.right.body[language]}
          </p>
        </article>
      </div>
    </SectionFrame>
  );
}
