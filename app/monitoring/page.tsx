import { MonitoringDashboard } from "@/components/monitoring/monitoring-dashboard";
import { getMonitoringVaults } from "@/lib/api/monitoring";

export default async function MonitoringPage() {
  const vaults = await getMonitoringVaults();

  return (
    <main data-testid="monitoring-shell" className="site-shell min-h-screen bg-[#f7faff]">
      <MonitoringDashboard vaults={vaults} />
    </main>
  );
}
