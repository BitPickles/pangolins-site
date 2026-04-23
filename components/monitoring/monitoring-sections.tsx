import type { MonitoringSection } from "@/lib/content/monitoring-data";

type MonitoringSectionsProps = {
  sections: MonitoringSection[];
};

export function MonitoringSections({ sections }: MonitoringSectionsProps) {
  return (
    <div className="grid gap-4">
      {sections.map((section) => (
        <section
          key={section.slug}
          className="dossier-panel rounded-3xl border border-white/10 px-5 py-5 md:px-6"
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-8">
            <div>
              <p className="dossier-label">Section</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{section.title}</h2>
            </div>
            <div className="space-y-4">
              <p className="text-sm leading-7 text-white/78">{section.body}</p>
              <ul className="space-y-3 text-sm leading-6 text-[var(--muted)]">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="dossier-rule">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
