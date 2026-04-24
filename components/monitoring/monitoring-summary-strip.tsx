import type { MonitoringSummaryItem } from "@/lib/content/monitoring-data";

type MonitoringSummaryStripProps = {
  items: MonitoringSummaryItem[];
};

export function MonitoringSummaryStrip({ items }: MonitoringSummaryStripProps) {
  return (
    <section
      aria-label="Monitoring summary"
      className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/82 px-4 py-4 shadow-[0_18px_70px_rgba(15,23,42,0.04)] backdrop-blur-xl md:px-5"
    >
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.label} className="rounded-[1.25rem] bg-[#f8fbff] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[11px] uppercase text-[#2f80ff]">{item.label}</p>
              <span className="h-2 w-2 rounded-full bg-[#2f80ff]" aria-hidden="true" />
            </div>
            <p className="mt-3 text-sm font-semibold text-[#0f172a]">{item.value}</p>
            <p className="mt-2 text-xs leading-5 text-[#647083]">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
