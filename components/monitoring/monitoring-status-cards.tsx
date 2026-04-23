import type { MonitoringStatusCard } from "@/lib/content/monitoring-data";

type MonitoringStatusCardsProps = {
  cards: MonitoringStatusCard[];
};

const toneClasses: Record<MonitoringStatusCard["tone"], string> = {
  normal: "text-[var(--success)]",
  watch: "text-[var(--watch)]",
  alert: "text-[var(--alert)]"
};

export function MonitoringStatusCards({ cards }: MonitoringStatusCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.title}
          className="dossier-panel relative overflow-hidden rounded-3xl border border-white/10 px-5 py-5"
        >
          <div
            className={`absolute inset-x-0 top-0 h-px bg-current opacity-70 ${toneClasses[card.tone]}`}
            aria-hidden="true"
          />
          <div className="flex items-center justify-between gap-3">
            <p className="dossier-label">{card.title}</p>
            <span className={`status-dot ${toneClasses[card.tone]}`} aria-hidden="true" />
          </div>
          <p className="mt-4 text-xl font-semibold text-white">{card.value}</p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{card.note}</p>
          <p className={`mt-6 font-mono text-[11px] uppercase tracking-[0.24em] ${toneClasses[card.tone]}`}>
            {card.tone === "normal" ? "Nominal" : card.tone === "watch" ? "Watch" : "Elevated"}
          </p>
        </article>
      ))}
    </section>
  );
}
