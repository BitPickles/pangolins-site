import type { MonitoringSummaryItem } from "@/lib/content/monitoring-data";

type MonitoringSummaryStripProps = {
  items: MonitoringSummaryItem[];
};

export function MonitoringSummaryStrip({ items }: MonitoringSummaryStripProps) {
  return (
    <section
      aria-label="Monitoring summary"
      className="dossier-panel rounded-3xl border border-white/10 px-5 py-4 md:px-6"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.label} className="space-y-2">
            <p className="dossier-label">{item.label}</p>
            <p className="text-sm font-semibold text-white">{item.value}</p>
            <p className="text-sm leading-6 text-[var(--muted)]">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
