import Link from "next/link";
import { MonitoringSections } from "@/components/monitoring/monitoring-sections";
import { RecentEvents } from "@/components/monitoring/recent-events";
import { MonitoringStatusCards } from "@/components/monitoring/monitoring-status-cards";
import { MonitoringSummaryStrip } from "@/components/monitoring/monitoring-summary-strip";
import { getMonitoringSnapshot } from "@/lib/api/monitoring";

export default async function MonitoringPage() {
  const snapshot = await getMonitoringSnapshot();

  return (
    <main className="site-shell bg-[#f8fbff]">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-7 md:py-9">
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

        <section className="rounded-[2rem] border border-[color:var(--line)] bg-white/82 px-5 py-6 shadow-[0_24px_90px_rgba(15,23,42,0.05)] backdrop-blur-xl md:px-7">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)] lg:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase text-[#2f80ff]">
                Monitoring / Transparency
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.02] text-[#0f172a] md:text-6xl">
                实时监控与风险透明度
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5c6879]">
                {snapshot.headline}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[#e2e8f0] bg-[#f8fbff] p-4 text-sm text-[var(--muted)]">
              <p className="font-mono text-[11px] uppercase text-[#7a8797]">Vault</p>
              <p className="mt-2 break-all font-mono text-xs text-[#0f172a]">
                {snapshot.vault.address}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <p>
                  <span className="block text-xs text-slate-500">Chain</span>
                  {snapshot.vault.chain}
                </p>
                <p>
                  <span className="block text-xs text-slate-500">Curator</span>
                  {snapshot.vault.curator}
                </p>
              </div>
              <p className="mt-3 text-xs text-slate-500">Feed: {snapshot.asOf}</p>
              <Link
                href={snapshot.vault.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--accent-strong)]"
              >
                Morpho Vault
              </Link>
            </div>
          </div>
        </section>

        <MonitoringStatusCards cards={snapshot.statusCards} />
        <MonitoringSummaryStrip items={snapshot.summary} />
        <MonitoringSections sections={snapshot.sections} />
        <RecentEvents events={snapshot.recentEvents} />
      </div>
    </main>
  );
}
