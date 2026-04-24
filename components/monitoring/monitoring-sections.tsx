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
          className="launch-surface rounded-[2rem] p-5 md:p-6"
        >
          <div className="grid gap-5 lg:grid-cols-[230px_1fr] lg:gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase text-[#7a8797]">
                Section {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[#07111f]">{section.title}</h2>
              <p className="mt-3 text-xs leading-5 text-[#647083]">{section.body}</p>
            </div>
            <ul className="grid gap-2 md:grid-cols-3">
              {section.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="rounded-[1.35rem] border border-[#e2e8f0] bg-white/62 px-4 py-4 text-sm leading-6 text-[#4f5d70]"
                >
                  <span className="mb-4 block h-1 w-10 rounded-full bg-[#2f80ff]" aria-hidden="true" />
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
