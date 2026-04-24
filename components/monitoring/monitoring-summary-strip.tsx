import type { MonitoringSummaryItem } from "@/lib/content/monitoring-data";

type MonitoringSummaryStripProps = {
  items: MonitoringSummaryItem[];
};

export function MonitoringSummaryStrip({ items }: MonitoringSummaryStripProps) {
  return (
    <section
      aria-label="Monitoring summary"
      className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/72 px-5 py-4 backdrop-blur-xl md:px-6"
    >
      <div className="grid gap-0 divide-y divide-[color:var(--line)] md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((item, index) => (
          <article key={item.label} className={index === 0 ? "pb-4 md:pb-0 md:pr-5" : "py-4 md:px-5 md:py-0"}>
            <p className="font-mono text-[11px] uppercase text-[#7a8797]">{item.label}</p>
            <p className="mt-2 text-sm font-semibold text-[#0f172a]">{item.value}</p>
            <p className="mt-2 text-sm leading-6 text-[#647083]">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
