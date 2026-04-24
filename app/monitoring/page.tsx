import Link from "next/link";
import { MonitoringSections } from "@/components/monitoring/monitoring-sections";
import { RecentEvents } from "@/components/monitoring/recent-events";
import { MonitoringStatusCards } from "@/components/monitoring/monitoring-status-cards";
import { MonitoringSummaryStrip } from "@/components/monitoring/monitoring-summary-strip";
import { getMonitoringSnapshot } from "@/lib/api/monitoring";

export default async function MonitoringPage() {
  const snapshot = await getMonitoringSnapshot();

  return (
    <main data-testid="monitoring-shell" className="site-shell bg-[#f7faff]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 md:py-8">
        <div className="flex items-center justify-between rounded-full border border-[#e2e8f0] bg-white/78 px-4 py-2.5 text-sm text-[#647083] shadow-[0_14px_50px_rgba(15,23,42,0.05)] backdrop-blur-2xl">
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

        <section className="launch-surface rounded-[2.5rem] p-5 md:p-7">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-stretch">
            <div className="flex min-h-72 flex-col justify-between rounded-[2rem] bg-white/58 p-6">
              <div>
                <p className="font-mono text-[11px] uppercase text-[#2f80ff]">
                  Monitoring / Transparency
                </p>
                <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1] text-[#07111f] md:text-6xl">
                  实时监控与风险透明度
                </h1>
              </div>
              <p className="mt-8 max-w-2xl text-sm leading-7 text-[#5c6879]">
                {snapshot.headline}
              </p>
            </div>

            <div
              data-testid="vault-identity-card"
              className="rounded-[2rem] border border-[#e2e8f0] bg-[#f8fbff] p-5 text-sm text-[var(--muted)]"
            >
              <p className="font-mono text-[11px] uppercase text-[#7a8797]">Vault</p>
              <p className="mt-3 break-all font-mono text-xs leading-6 text-[#0f172a]">
                {snapshot.vault.address}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-[1rem] bg-white px-3 py-3">
                  <span className="block text-xs text-slate-500">Chain</span>
                  <span className="font-semibold text-[#07111f]">{snapshot.vault.chain}</span>
                </div>
                <div className="rounded-[1rem] bg-white px-3 py-3">
                  <span className="block text-xs text-slate-500">Curator</span>
                  <span className="font-semibold text-[#07111f]">{snapshot.vault.curator}</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500">Feed: {snapshot.asOf}</p>
              <Link
                href={snapshot.vault.link}
                target="_blank"
                rel="noreferrer"
                className="launch-button-dark mt-5 min-h-10 px-4"
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
