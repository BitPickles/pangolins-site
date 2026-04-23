import {
  monitoringSnapshot,
  type MonitoringSection,
  type MonitoringSnapshot,
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
