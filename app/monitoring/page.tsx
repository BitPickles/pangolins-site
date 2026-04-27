import { MonitoringDashboard } from "@/components/monitoring/monitoring-dashboard";
import { getMonitoringSnapshot } from "@/lib/api/monitoring";

export default async function MonitoringPage() {
  const snapshot = await getMonitoringSnapshot();

  return (
    <main data-testid="monitoring-shell" className="site-shell min-h-screen bg-[#f7faff]">
      <MonitoringDashboard snapshot={snapshot} />
    </main>
  );
}
