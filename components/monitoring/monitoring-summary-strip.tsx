import type { MonitoringSummaryItem } from "@/lib/content/monitoring-data";

type MonitoringSummaryStripProps = {
  items: MonitoringSummaryItem[];
};

export function MonitoringSummaryStrip({ items }: MonitoringSummaryStripProps) {
  return (
    <section
      aria-label="Monitoring summary"
      data-testid="risk-path-grid"
      className="launch-surface rounded-[2rem] p-3"
    >
      <div className="grid gap-2 md:grid-cols-3">
        {items.map((item, index) => (
          <article key={item.label} className="rounded-[1.5rem] bg-white/64 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[11px] uppercase text-[#2f80ff]">{item.label}</p>
              <span className="font-mono text-xs text-[#9aa6b6]">0{index + 1}</span>
            </div>
            <p className="mt-5 text-lg font-semibold text-[#07111f]">{item.value}</p>
            <p className="mt-2 text-xs leading-5 text-[#647083]">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
