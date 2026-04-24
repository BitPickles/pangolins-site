import type { MonitoringSection } from "@/lib/content/monitoring-data";

type MonitoringSectionsProps = {
  sections: MonitoringSection[];
};

export function MonitoringSections({ sections }: MonitoringSectionsProps) {
  return (
    <div className="grid gap-4">
      {sections.map((section, index) => (
        <section
          key={section.slug}
          className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/70 px-5 py-5 backdrop-blur-xl md:px-6"
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase text-[#7a8797]">
                Section {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[#0f172a]">{section.title}</h2>
            </div>
            <div className="space-y-4">
              <p className="text-sm leading-7 text-[#4f5d70]">{section.body}</p>
              <ul className="divide-y divide-[color:var(--line)] text-sm leading-6 text-[#647083]">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9aa6b6]" aria-hidden="true" />
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
