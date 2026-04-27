import {
  monitoringSnapshot,
  type MonitoringDataPanel,
  type MonitoringModule,
  type MonitoringSection,
  type MonitoringSnapshot,
  type MonitoringDomain,
  type MonitoringStatusCard,
  type MonitoringSummaryItem
} from "@/lib/content/monitoring-data";

function cloneSnapshot(): MonitoringSnapshot {
  return structuredClone(monitoringSnapshot);
}

export async function getMonitoringSnapshot(): Promise<MonitoringSnapshot> {
  return cloneSnapshot();
}

export async function getMonitoringSummary(): Promise<MonitoringSummaryItem[]> {
  return cloneSnapshot().summary;
}

export async function getMonitoringStatusCards(): Promise<MonitoringStatusCard[]> {
  return cloneSnapshot().statusCards;
}

export async function getMonitoringDomains(): Promise<MonitoringDomain[]> {
  return cloneSnapshot().monitoringDomains;
}

export async function getMonitoringDataPanels(): Promise<MonitoringDataPanel[]> {
  return cloneSnapshot().dataPanels;
}

export async function getMonitoringModules(): Promise<MonitoringModule[]> {
  return cloneSnapshot().monitoringModules;
}

export async function getMonitoringSections(): Promise<MonitoringSection[]> {
  return cloneSnapshot().sections;
}

export async function getMonitoringLiquidity() {
  return cloneSnapshot().liquidity;
}

export async function getMonitoringRiskSignals() {
  return cloneSnapshot().riskSignals;
}

export async function getMonitoringRecentEvents() {
  return cloneSnapshot().recentEvents;
}
