import type { MonitoringSection } from "@/lib/content/monitoring-data";

type MonitoringSectionsProps = {
  sections: MonitoringSection[];
};

export function MonitoringSections({ sections }: MonitoringSectionsProps) {
  return (
    <div className="grid gap-3">
      {sections.map((section, index) => (
        <section
          key={section.slug}
          className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/82 px-5 py-5 shadow-[0_18px_70px_rgba(15,23,42,0.04)] backdrop-blur-xl md:px-6"
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase text-[#7a8797]">
                Section {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[#0f172a]">{section.title}</h2>
              <p className="mt-3 text-xs leading-5 text-[#647083]">{section.body}</p>
            </div>
            <ul className="grid gap-2 md:grid-cols-3">
              {section.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="rounded-[1.2rem] border border-[#e2e8f0] bg-[#f8fbff] px-4 py-4 text-sm leading-6 text-[#4f5d70]"
                >
                  <span className="mb-3 block h-1.5 w-8 rounded-full bg-[#2f80ff]" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
