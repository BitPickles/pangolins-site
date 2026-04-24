import Link from "next/link";
import { MonitoringSections } from "@/components/monitoring/monitoring-sections";
import { RecentEvents } from "@/components/monitoring/recent-events";
import { MonitoringStatusCards } from "@/components/monitoring/monitoring-status-cards";
import { MonitoringSummaryStrip } from "@/components/monitoring/monitoring-summary-strip";
import { getMonitoringSnapshot } from "@/lib/api/monitoring";

export default async function MonitoringPage() {
  const snapshot = await getMonitoringSnapshot();

  return (
    <main className="site-shell">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:py-10">
        <div className="flex items-center justify-between border-b border-[color:var(--line)] pb-4 text-sm text-[#647083]">
          <Link href="/" className="font-mono uppercase text-[#0f172a]">
            Pangolins
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">首页</Link>
            <Link href="/monitoring" className="text-[#0f172a]">
              监控与透明度
            </Link>
          </div>
        </div>

        <section className="dossier-panel rounded-[2rem] border border-[color:var(--line)] px-5 py-6 md:px-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="dossier-label">Monitoring / Transparency</p>
              <h1 className="font-display text-balance text-4xl font-semibold text-[#0f172a] md:text-5xl">
                实时监控与风险透明度
              </h1>
              <p className="text-sm text-[var(--accent-strong)]">Monitoring &amp; Transparency</p>
              <p className="max-w-2xl text-sm leading-7 text-[#5c6879]">{snapshot.headline}</p>
            </div>
            <div className="grid gap-2 text-sm text-[var(--muted)] md:text-right">
              <p>
                <span className="text-slate-500">Vault</span>{" "}
                <span className="font-mono text-xs text-[#0f172a]">{snapshot.vault.address}</span>
              </p>
              <p>
                <span className="text-slate-500">Chain</span> {snapshot.vault.chain}
              </p>
              <p>
                <span className="text-slate-500">Curator</span> {snapshot.vault.curator}
              </p>
              <p>
                <span className="text-slate-500">Feed</span> {snapshot.asOf}
              </p>
              <Link
                href={snapshot.vault.link}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-start text-sm font-medium text-[var(--accent-strong)] md:justify-end"
              >
                Morpho Vault
              </Link>
            </div>
          </div>
        </section>

        <MonitoringSummaryStrip items={snapshot.summary} />
        <MonitoringStatusCards cards={snapshot.statusCards} />
        <MonitoringSections sections={snapshot.sections} />
        <RecentEvents events={snapshot.recentEvents} />
      </div>
    </main>
  );
}
