import type { MonitoringStatusCard } from "@/lib/content/monitoring-data";

type MonitoringStatusCardsProps = {
  cards: MonitoringStatusCard[];
};

const toneClasses: Record<MonitoringStatusCard["tone"], string> = {
  normal: "border-emerald-200 bg-emerald-50 text-emerald-700",
  watch: "border-amber-200 bg-amber-50 text-amber-700",
  alert: "border-rose-200 bg-rose-50 text-rose-700"
};

const indicatorClasses: Record<MonitoringStatusCard["tone"], string> = {
  normal: "bg-emerald-500",
  watch: "bg-amber-500",
  alert: "bg-rose-500"
};

export function MonitoringStatusCards({ cards }: MonitoringStatusCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.title}
          className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/68 px-5 py-5 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase text-[#7a8797]">{card.title}</p>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 font-mono text-[10px] uppercase ${toneClasses[card.tone]}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${indicatorClasses[card.tone]}`} aria-hidden="true" />
              {card.tone === "normal" ? "Nominal" : card.tone === "watch" ? "Watch" : "Elevated"}
            </span>
          </div>
          <p className="mt-4 text-xl font-semibold text-[#0f172a]">{card.value}</p>
          <p className="mt-3 text-sm leading-6 text-[#647083]">{card.note}</p>
        </article>
      ))}
    </section>
  );
}
