import type { MonitoringStatusCard } from "@/lib/content/monitoring-data";
import type { SiteLanguage } from "@/lib/content/site-copy";

type MonitoringStatusCardsProps = {
  cards: MonitoringStatusCard[];
  language: SiteLanguage;
};

const toneClasses: Record<MonitoringStatusCard["tone"], string> = {
  normal: "text-emerald-700",
  watch: "text-amber-700",
  alert: "text-rose-700"
};

const indicatorClasses: Record<MonitoringStatusCard["tone"], string> = {
  normal: "bg-emerald-500",
  watch: "bg-amber-500",
  alert: "bg-rose-500"
};

const toneLabels: Record<SiteLanguage, Record<MonitoringStatusCard["tone"], string>> = {
  zh: {
    normal: "正常",
    watch: "观察",
    alert: "升高"
  },
  en: {
    normal: "Nominal",
    watch: "Watch",
    alert: "Elevated"
  }
};

export function MonitoringStatusCards({ cards, language }: MonitoringStatusCardsProps) {
  return (
    <section className="launch-surface grid gap-0 overflow-hidden rounded-[2rem] md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.title}
          className="border-b border-[#e2e8f0] bg-white/54 px-5 py-5 last:border-b-0 md:border-r md:last:border-r-0 xl:border-b-0"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase text-[#7a8797]">{card.title}</p>
            <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase ${toneClasses[card.tone]}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${indicatorClasses[card.tone]}`} aria-hidden="true" />
              {toneLabels[language][card.tone]}
            </span>
          </div>
          <p className="mt-6 text-2xl font-semibold text-[#07111f]">{card.value}</p>
          <p className="mt-2 text-xs leading-5 text-[#647083]">{card.note}</p>
        </article>
      ))}
    </section>
  );
}
