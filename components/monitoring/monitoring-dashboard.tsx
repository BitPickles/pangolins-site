"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandMark, BrandWordmark } from "@/components/brand-mark";
import { LanguageState, readStoredLanguage } from "@/components/language-state";
import { LanguageToggle } from "@/components/language-toggle";
import { MonitoringStatusCards } from "@/components/monitoring/monitoring-status-cards";
import type {
  MonitoringChart,
  MonitoringModule,
  MonitoringModuleId,
  MonitoringStatusCard,
  MonitoringSeriesPoint,
  MonitoringSnapshot,
  MonitoringTone
} from "@/lib/content/monitoring-data";
import { localize, monitoringCopy } from "@/lib/content/monitoring-copy";
import type { SiteLanguage } from "@/lib/content/site-copy";

type MonitoringDashboardProps = {
  snapshot: MonitoringSnapshot;
};

type ActiveMonitorId = "overview" | MonitoringModuleId;
type LocalizedChartCopy = {
  title: Record<SiteLanguage, string>;
  unit: Record<SiteLanguage, string>;
  detail: Record<SiteLanguage, string>;
  seriesNames: Array<Record<SiteLanguage, string>>;
};

const toneDotClassName: Record<MonitoringTone, string> = {
  normal: "bg-emerald-500",
  watch: "bg-amber-500",
  alert: "bg-rose-500"
};

const toneTextClassName: Record<MonitoringTone, string> = {
  normal: "text-emerald-700",
  watch: "text-amber-700",
  alert: "text-rose-700"
};

const toneBadgeClassName: Record<MonitoringTone, string> = {
  normal: "border-emerald-200 bg-emerald-50 text-emerald-700",
  watch: "border-amber-200 bg-amber-50 text-amber-700",
  alert: "border-rose-200 bg-rose-50 text-rose-700"
};

const chartColors = ["#2f80ff", "#00c2b8", "#0b1d3d", "#f59e0b"];

function getLocalizedStatusCards(language: SiteLanguage): MonitoringStatusCard[] {
  return monitoringCopy.statusCards.map((card) => ({
    title: localize(card.title, language),
    value: localize(card.value, language),
    note: localize(card.note, language),
    tone: card.tone
  }));
}

function createSparklinePath(points: MonitoringSeriesPoint[], width: number, height: number) {
  if (points.length === 0) {
    return "";
  }

  const values = points.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return points
    .map((point, index) => {
      const x = points.length === 1 ? width / 2 : (index / (points.length - 1)) * width;
      const y = height - ((point.value - min) / range) * height;

      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function MonitoringChartCard({
  chart,
  chartCopy,
  language
}: {
  chart: MonitoringChart;
  chartCopy: LocalizedChartCopy | undefined;
  language: SiteLanguage;
}) {
  const width = 260;
  const height = 84;
  const title = chartCopy ? localize(chartCopy.title, language) : chart.title;
  const unit = chartCopy ? localize(chartCopy.unit, language) : chart.unit;
  const detail = chartCopy ? localize(chartCopy.detail, language) : chart.detail;

  return (
    <article
      data-testid="module-chart"
      className="overflow-hidden rounded-[1.45rem] border border-[#e2e8f0] bg-white/72"
    >
      <div className="flex items-start justify-between gap-4 px-4 pt-4">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7a8797]">
            {title}
          </p>
          <p className="mt-3 text-2xl font-semibold text-[#07111f]">{chart.value}</p>
          <p className="mt-1 text-xs text-[#8b98aa]">{unit}</p>
        </div>
        <span
          className={`mt-1 h-2 w-2 shrink-0 rounded-full ${toneDotClassName[chart.tone]}`}
          aria-hidden="true"
        />
      </div>

      <div className="mt-4 px-3">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-24 w-full overflow-visible"
          role="img"
          aria-label={`${title} historical trend`}
        >
          <line x1="0" y1={height} x2={width} y2={height} stroke="#e2e8f0" strokeWidth="1" />
          <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#eef3f9" strokeWidth="1" />
          {chart.series.map((series, index) => {
            const path = createSparklinePath(series.points, width, height);
            const color = chartColors[index % chartColors.length];

            return (
              <path
                key={series.name}
                d={path}
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={index === 0 ? 3 : 2}
              />
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap gap-2 px-4 pb-4">
        {chart.series.map((series, index) => (
          <span key={series.name} className="inline-flex items-center gap-1.5 text-[11px] text-[#647083]">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: chartColors[index % chartColors.length] }}
              aria-hidden="true"
            />
            {chartCopy?.seriesNames[index] ? localize(chartCopy.seriesNames[index], language) : series.name}
          </span>
        ))}
      </div>

      <p className="border-t border-[#edf2f8] px-4 py-3 text-xs leading-5 text-[#647083]">
        {detail}
      </p>
    </article>
  );
}

function ModuleNavigation({
  snapshot,
  modules,
  activeId,
  isCollapsed,
  language,
  onSelect
}: {
  snapshot: MonitoringSnapshot;
  modules: MonitoringModule[];
  activeId: ActiveMonitorId;
  isCollapsed: boolean;
  language: SiteLanguage;
  onSelect: (moduleId: ActiveMonitorId) => void;
}) {
  const isOverviewActive = activeId === "overview";
  const copy = monitoringCopy.layout;

  return (
    <>
      <div className={["rounded-[1.45rem] border border-[#e5edf6] bg-white/72 p-4", isCollapsed ? "px-2" : ""].join(" ")}>
        <p className={["font-mono text-[10px] uppercase tracking-[0.18em] text-[#2f80ff]", isCollapsed ? "sr-only" : ""].join(" ")}>
          {localize(copy.monitorTree, language)}
        </p>
        <p className={["mt-2 text-sm leading-6 text-[#647083]", isCollapsed ? "sr-only" : ""].join(" ")}>
          {localize(copy.monitorTreeBody, language)}
        </p>
        {isCollapsed ? (
          <p aria-hidden="true" className="text-center font-mono text-[10px] uppercase tracking-[0.12em] text-[#2f80ff]">
            Data
          </p>
        ) : null}
      </div>

      <div className="mt-3 grid gap-2">
        <button
          type="button"
          aria-pressed={isOverviewActive}
          onClick={() => onSelect("overview")}
          className={[
            "group rounded-[1.35rem] border p-4 text-left transition",
            isCollapsed ? "px-2 py-3 text-center" : "",
            isOverviewActive
              ? "border-[#0b1d3d] bg-[#07111f] text-white shadow-[0_18px_45px_rgba(7,17,31,0.16)]"
              : "border-[#d9e4f1] bg-[#f8fbff] text-[#07111f] hover:border-[#bcd5f5] hover:bg-white"
          ].join(" ")}
        >
          <div className={["flex items-start justify-between gap-3", isCollapsed ? "justify-center" : ""].join(" ")}>
            <div className="min-w-0">
              <span className={["block text-base font-semibold", isCollapsed ? "sr-only" : ""].join(" ")}>
                {snapshot.vault.name}
              </span>
              <span className={["mt-1 block text-xs", isOverviewActive ? "text-white/62" : "text-[#7a8797]", isCollapsed ? "sr-only" : ""].join(" ")}>
                {localize(copy.vaultOverview, language)}
              </span>
              {isCollapsed ? (
                <span aria-hidden="true" className="block text-sm font-semibold">
                  V
                </span>
              ) : null}
            </div>
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
          </div>
          <div className={["mt-4 flex items-center justify-between gap-3 border-t pt-3", isOverviewActive ? "border-white/14" : "border-[#e2e8f0]", isCollapsed ? "sr-only" : ""].join(" ")}>
            <span className={["font-mono text-[10px] uppercase", isOverviewActive ? "text-white/48" : "text-[#8b98aa]"].join(" ")}>
              {localize(copy.vaultLabel, language)}
            </span>
            <span className={["font-mono text-[10px] uppercase", isOverviewActive ? "text-emerald-200" : "text-emerald-700"].join(" ")}>
              {localize(copy.statusSummary, language)}
            </span>
          </div>
        </button>
      </div>

      <div
        data-testid="monitoring-child-modules"
        className={[
          "mt-3 grid gap-2",
          isCollapsed ? "" : "border-l border-[#dbe5f3] pl-3"
        ].join(" ")}
      >
        {modules.map((module) => {
          const isActive = module.id === activeId;
          const moduleCopy = monitoringCopy.modules[module.id];

          return (
            <button
              key={module.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(module.id)}
              className={[
                "group rounded-[1.35rem] border p-4 text-left transition",
                isCollapsed ? "px-2 py-3 text-center" : "",
                isActive
                  ? "border-[#2f80ff] bg-[#eef6ff] shadow-[0_18px_45px_rgba(47,128,255,0.12)]"
                  : "border-[#e2e8f0] bg-white/58 hover:border-[#bcd5f5] hover:bg-white"
              ].join(" ")}
            >
              <div className={["flex items-start justify-between gap-3", isCollapsed ? "justify-center" : ""].join(" ")}>
                <div className="min-w-0">
                  <span className={["block text-base font-semibold text-[#07111f]", isCollapsed ? "sr-only" : ""].join(" ")}>
                    {localize(moduleCopy.navLabel, language)}
                  </span>
                  <span className={["mt-1 block text-xs text-[#7a8797]", isCollapsed ? "sr-only" : ""].join(" ")}>
                    {localize(moduleCopy.navSubLabel, language)}
                  </span>
                  {isCollapsed ? (
                    <span aria-hidden="true" className="block text-sm font-semibold text-[#07111f]">
                      {localize(moduleCopy.navLabel, language).slice(0, 1)}
                    </span>
                  ) : null}
                </div>
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${toneDotClassName[module.statusTone]}`} />
              </div>
              <div className={["mt-4 flex items-center justify-between gap-3 border-t border-[#e2e8f0] pt-3", isCollapsed ? "sr-only" : ""].join(" ")}>
                <span className="font-mono text-[10px] uppercase text-[#8b98aa]">{localize(copy.vaultStatus, language)}</span>
                <span className={`font-mono text-[10px] uppercase ${toneTextClassName[module.statusTone]}`}>
                  {localize(moduleCopy.status, language)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className={["mt-3 rounded-[1.45rem] border border-dashed border-[#cbd9ea] bg-white/46 p-4", isCollapsed ? "hidden" : ""].join(" ")}>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a8797]">
          {localize(copy.nextModules, language)}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {copy.futureModules[language].map((module) => (
            <span
              key={module}
              className="rounded-full border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs text-[#647083]"
            >
              {module}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

function VaultOverviewPanel({
  snapshot,
  modules,
  language,
  onSelect
}: {
  snapshot: MonitoringSnapshot;
  modules: MonitoringModule[];
  language: SiteLanguage;
  onSelect: (moduleId: MonitoringModuleId) => void;
}) {
  const copy = monitoringCopy.layout;

  return (
    <div className="grid min-w-0 gap-5">
      <article className="launch-surface overflow-hidden rounded-[2rem]">
        <div className="border-b border-[#e2e8f0] bg-white/68 px-5 py-4 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-[11px] uppercase text-emerald-700">
                {localize(monitoringCopy.tone.normal, language)}
              </span>
              <span className="h-1 w-1 rounded-full bg-[#c8d4e3]" />
              <span className="font-mono text-[11px] uppercase text-[#7a8797]">
                {localize(copy.dataNotice, language)}
              </span>
            </div>
            <span className="rounded-full border border-[#dbe7f5] bg-[#f8fbff] px-3 py-1.5 font-mono text-[10px] uppercase text-[#647083]">
              {localize(copy.vaultOverview, language)}
            </span>
          </div>
        </div>

        <div className="grid gap-5 p-5 md:p-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#2f80ff]">
              {localize(copy.vaultOverview, language)}
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#07111f] md:text-5xl">
              {localize(copy.vaultOverviewTitle, language)}
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5c6879] md:text-base">
              {localize(copy.vaultOverviewBody, language)}
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[#e2e8f0] bg-[#f8fbff] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a8797]">
              {localize(copy.vaultLabel, language)}
            </p>
            <p className="mt-3 text-xl font-semibold text-[#07111f]">{snapshot.vault.name}</p>
            <p className="mt-2 break-all font-mono text-[11px] leading-5 text-[#647083]">{snapshot.vault.address}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-[1rem] bg-white px-3 py-3">
                <p className="text-xs text-[#7a8797]">{localize(copy.chainLabel, language)}</p>
                <p className="font-semibold text-[#07111f]">{snapshot.vault.chain}</p>
              </div>
              <div className="rounded-[1rem] bg-white px-3 py-3">
                <p className="text-xs text-[#7a8797]">{localize(copy.curatorLabel, language)}</p>
                <p className="font-semibold text-[#07111f]">{snapshot.vault.curator}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 px-5 pb-5 md:grid-cols-3 md:px-6 md:pb-6">
          {modules.map((module) => {
            const firstChart = module.charts[0];
            const primaryMetric = module.metrics[0];
            const moduleCopy = monitoringCopy.modules[module.id];
            const primaryMetricCopy = moduleCopy.metrics[0];
            const firstChartCopy = (moduleCopy.charts as Record<string, LocalizedChartCopy>)[firstChart?.id ?? ""];

            return (
              <button
                key={module.id}
                type="button"
                onClick={() => onSelect(module.id)}
                className="rounded-[1.45rem] border border-[#e2e8f0] bg-white/72 p-4 text-left transition hover:border-[#2f80ff] hover:bg-[#f8fbff]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2f80ff]">
                      {localize(moduleCopy.navLabel, language)} {localize(copy.moduleSuffix, language)}
                    </p>
                    <p className="mt-3 text-xl font-semibold text-[#07111f]">
                      {localize(moduleCopy.status, language)}
                    </p>
                  </div>
                  <span className={`mt-1 h-2 w-2 rounded-full ${toneDotClassName[module.statusTone]}`} />
                </div>
                <p className="mt-3 text-xs leading-5 text-[#647083]">
                  {localize(moduleCopy.description, language)}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-[0.95rem] bg-[#f7faff] px-3 py-2">
                    <p className="font-mono text-[9px] uppercase text-[#8b98aa]">
                      {primaryMetricCopy ? localize(primaryMetricCopy.label, language) : primaryMetric?.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#07111f]">{primaryMetric?.value}</p>
                  </div>
                  <div className="rounded-[0.95rem] bg-[#f7faff] px-3 py-2">
                    <p className="font-mono text-[9px] uppercase text-[#8b98aa]">
                      {firstChartCopy ? localize(firstChartCopy.title, language) : firstChart?.title}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#07111f]">{firstChart?.value}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </article>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <article className="launch-surface rounded-[2rem] p-5 md:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#2f80ff]">
            {localize(copy.vaultStatus, language)}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-[#07111f]">
            {localize(copy.currentSnapshot, language)}
          </h3>
          <div className="mt-4 grid gap-2">
            {getLocalizedStatusCards(language).map((card) => (
              <div key={card.title} className="rounded-[1.2rem] border border-[#e8eef7] bg-white/72 px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase text-[#7a8797]">{card.title}</p>
                    <p className="mt-2 text-lg font-semibold text-[#07111f]">{card.value}</p>
                    <p className="mt-1 text-xs leading-5 text-[#647083]">{card.note}</p>
                  </div>
                  <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${toneDotClassName[card.tone]}`} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article data-testid="alert-feed" className="launch-surface rounded-[2rem] p-5 md:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#2f80ff]">
            {localize(copy.eventLog, language)}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-[#07111f]">
            {localize(copy.vaultLog, language)}
          </h3>
          <ol className="mt-4 divide-y divide-[#e2e8f0]">
            {monitoringCopy.recentEvents.map((event, index) => (
              <li key={event.en} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                <span className="font-mono text-xs text-[#9aa6b6]">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-6 text-[#5c6879]">{localize(event, language)}</p>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </div>
  );
}

export function MonitoringDashboard({ snapshot }: MonitoringDashboardProps) {
  const modules = snapshot.monitoringModules;
  const [activeId, setActiveId] = useState<ActiveMonitorId>("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [language, setLanguage] = useState<SiteLanguage>("zh");
  const activeModule = activeId === "overview" ? null : modules.find((module) => module.id === activeId) ?? modules[0];
  const activeModuleCopy = activeModule ? monitoringCopy.modules[activeModule.id] : null;
  const layoutCopy = monitoringCopy.layout;

  useEffect(() => {
    setLanguage(readStoredLanguage());
  }, []);

  if (!activeModule && activeId !== "overview") {
    return null;
  }

  return (
    <section
      data-testid="monitoring-app-shell"
      data-sidebar-collapsed={String(isCollapsed)}
      className={[
        "relative min-h-screen transition-[padding] duration-300",
        isCollapsed ? "lg:pl-[6rem]" : "lg:pl-[19rem]"
      ].join(" ")}
    >
      <LanguageState language={language} />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_20%_0%,rgba(47,128,255,0.16),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(0,194,184,0.12),transparent_32%)]" />

      <aside
        data-testid="monitoring-sidebar"
        data-layout="fixed-sidebar"
        data-collapsed={String(isCollapsed)}
        className={[
          "fixed inset-y-0 left-0 z-40 hidden border-r border-[#dbe5f3] bg-white/86 shadow-[18px_0_70px_rgba(15,23,42,0.06)] backdrop-blur-2xl transition-[width,padding] duration-300 lg:flex lg:flex-col",
          isCollapsed ? "w-[5rem] p-2" : "w-[18rem] p-3"
        ].join(" ")}
      >
        <div
          data-testid="monitoring-sidebar-brand"
          data-collapse-layout={isCollapsed ? "stacked" : "row"}
          className={[
            "flex rounded-[1.35rem] border border-[#e5edf6] bg-[#f8fbff]",
            isCollapsed ? "flex-col items-center justify-center gap-2 px-2 py-3" : "items-center justify-between gap-2 p-3"
          ].join(" ")}
        >
          <Link
            href="/"
            className={[
              "flex min-w-0 items-center gap-2",
              isCollapsed ? "h-9 w-9 justify-center rounded-full bg-white shadow-[0_10px_28px_rgba(22,119,255,0.10)]" : ""
            ].join(" ")}
          >
            <BrandMark className="w-8 shrink-0" />
            <span className={isCollapsed ? "sr-only" : "inline-flex min-w-0"}>
              <BrandWordmark />
            </span>
          </Link>
          <button
            type="button"
            data-testid="monitoring-sidebar-toggle"
            data-collapsed-control={String(isCollapsed)}
            aria-label={
              isCollapsed
                ? localize(monitoringCopy.controls.expandSidebar, language)
                : localize(monitoringCopy.controls.collapseSidebar, language)
            }
            onClick={() => setIsCollapsed((value) => !value)}
            className={[
              "inline-flex shrink-0 items-center justify-center rounded-full border border-[#dbe5f3] bg-white font-semibold text-[#647083] transition hover:border-[#2f80ff] hover:text-[#2f80ff]",
              isCollapsed ? "h-7 w-7 text-[10px]" : "h-8 w-8 text-xs"
            ].join(" ")}
          >
            {isCollapsed ? ">" : "<"}
          </button>
        </div>

        <div data-testid="monitoring-rail" className="mt-4 min-h-0 flex-1 overflow-y-auto">
          <ModuleNavigation
            snapshot={snapshot}
            modules={modules}
            activeId={activeId}
            isCollapsed={isCollapsed}
            language={language}
            onSelect={setActiveId}
          />
        </div>
      </aside>

      <div
        data-testid="monitoring-mobile-drawer"
        data-open={String(isMobileOpen)}
        className={[
          "fixed inset-0 z-50 lg:hidden",
          isMobileOpen ? "pointer-events-auto" : "pointer-events-none"
        ].join(" ")}
      >
        <button
          type="button"
          aria-label={localize(monitoringCopy.controls.closeModules, language)}
          onClick={() => setIsMobileOpen(false)}
          className={[
            "absolute inset-0 bg-[#07111f]/18 transition-opacity",
            isMobileOpen ? "opacity-100" : "opacity-0"
          ].join(" ")}
        />
        <div
          className={[
            "absolute inset-y-0 left-0 w-[19rem] max-w-[86vw] overflow-y-auto border-r border-[#dbe5f3] bg-white p-3 shadow-[18px_0_70px_rgba(15,23,42,0.16)] transition-transform duration-300",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          ].join(" ")}
        >
          <div className="flex items-center justify-between rounded-[1.35rem] border border-[#e5edf6] bg-[#f8fbff] p-3">
            <Link href="/" className="flex items-center gap-2">
              <BrandMark className="w-8" />
              <BrandWordmark />
            </Link>
            <button
              type="button"
              aria-label={localize(monitoringCopy.controls.closeModules, language)}
              onClick={() => setIsMobileOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#dbe5f3] bg-white text-xs font-semibold text-[#647083]"
            >
              ×
            </button>
          </div>
          <div className="mt-4">
            <ModuleNavigation
              snapshot={snapshot}
              modules={modules}
              activeId={activeId}
              isCollapsed={false}
              language={language}
              onSelect={(moduleId) => {
                setActiveId(moduleId);
                setIsMobileOpen(false);
              }}
            />
          </div>
        </div>
      </div>

      <div className="min-w-0 px-4 py-4 md:px-6">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 overflow-hidden rounded-[1.5rem] border border-[#e2e8f0] bg-white/82 px-4 py-3 text-sm text-[#647083] shadow-[0_14px_50px_rgba(15,23,42,0.05)] backdrop-blur-2xl">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label={localize(monitoringCopy.controls.openModules, language)}
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen(true)}
              className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-[#dbe5f3] bg-white px-3 text-xs font-semibold text-[#07111f] lg:hidden"
            >
              {localize(monitoringCopy.controls.moduleButton, language)}
            </button>
            <Link href="/" className="hidden items-center gap-2.5 lg:flex">
              <BrandMark className="w-8" />
              <span className="sr-only">Pangolins</span>
              <BrandWordmark />
            </Link>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#2f80ff]">
                {localize(layoutCopy.productLabel, language)}
              </p>
              <p className="text-sm font-semibold text-[#07111f]">
                {localize(layoutCopy.dataCenter, language)}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 items-center gap-4 sm:flex">
            <Link href="/">{localize(monitoringCopy.nav.home, language)}</Link>
            <Link href="/monitoring" className="text-[#0f172a]">
              {localize(monitoringCopy.nav.monitoring, language)}
            </Link>
            <LanguageToggle value={language} onChange={setLanguage} />
          </div>
        </header>

        <div className="mx-auto mt-4 grid max-w-[96rem] gap-4">
          {activeId === "overview" ? (
            <>
              <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_24rem]">
                <article className="launch-surface rounded-[2rem] p-5 md:p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#2f80ff]">
                    {localize(layoutCopy.productLabel, language)}
                  </p>
                  <h1 className="mt-4 text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#07111f] md:text-6xl">
                    {localize(layoutCopy.dataCenterTitle, language)}
                  </h1>
                  <p className="mt-7 max-w-4xl text-sm leading-7 text-[#5c6879] md:text-base">
                    {localize(layoutCopy.headline, language)}
                  </p>
                </article>

                <aside
                  data-testid="vault-identity-card"
                  className="rounded-[2rem] border border-[#e2e8f0] bg-[#f8fbff] p-5 text-sm text-[var(--muted)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#7a8797]">
                      {localize(layoutCopy.vaultLabel, language)}
                    </p>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[10px] uppercase text-emerald-700">
                      {localize(monitoringCopy.tone.normal, language)}
                    </span>
                  </div>
                  <p className="mt-3 text-xl font-semibold text-[#07111f]">{snapshot.vault.name}</p>
                  <p className="mt-3 break-all font-mono text-xs leading-6 text-[#0f172a]">
                    {snapshot.vault.address}
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-[1rem] bg-white px-3 py-3">
                      <span className="block text-xs text-slate-500">{localize(layoutCopy.chainLabel, language)}</span>
                      <span className="font-semibold text-[#07111f]">{snapshot.vault.chain}</span>
                    </div>
                    <div className="rounded-[1rem] bg-white px-3 py-3">
                      <span className="block text-xs text-slate-500">{localize(layoutCopy.curatorLabel, language)}</span>
                      <span className="font-semibold text-[#07111f]">{snapshot.vault.curator}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-slate-500">
                    {localize(layoutCopy.feedLabel, language)}: {localize(layoutCopy.dataNotice, language)}
                  </p>
                  <Link
                    href={snapshot.vault.link}
                    target="_blank"
                    rel="noreferrer"
                    className="launch-button-dark mt-5 min-h-10 px-4"
                  >
                    Morpho Vault
                  </Link>
                </aside>
              </section>

              <MonitoringStatusCards cards={getLocalizedStatusCards(language)} language={language} />
            </>
          ) : null}

          <section data-testid="monitoring-layout" className="grid min-w-0 gap-5">
            <div data-testid="monitoring-module-panel" className="grid min-w-0 gap-5">
              {activeId === "overview" ? (
                <VaultOverviewPanel
                  snapshot={snapshot}
                  modules={modules}
                  language={language}
                  onSelect={(moduleId) => setActiveId(moduleId)}
                />
              ) : activeModule && activeModuleCopy ? (
                <>
              <article className="launch-surface overflow-hidden rounded-[2rem]">
                <div className="border-b border-[#e2e8f0] bg-white/68 px-5 py-4 md:px-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${toneDotClassName[activeModule.statusTone]}`} />
                      <span className={`font-mono text-[11px] uppercase ${toneTextClassName[activeModule.statusTone]}`}>
                        {localize(activeModuleCopy.status, language)}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-[#c8d4e3]" />
                      <span className="font-mono text-[11px] uppercase text-[#7a8797]">
                        {localize(layoutCopy.dataNotice, language)}
                      </span>
                    </div>
                    <span className="rounded-full border border-[#dbe7f5] bg-[#f8fbff] px-3 py-1.5 font-mono text-[10px] uppercase text-[#647083]">
                      {localize(layoutCopy.publicModule, language)}
                    </span>
                  </div>
                </div>

                <div className="grid gap-5 p-5 md:p-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#2f80ff]">
                      {localize(activeModuleCopy.navSubLabel, language)}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#07111f] md:text-5xl">
                      {localize(activeModuleCopy.title, language)}
                    </h2>
                    <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5c6879] md:text-base">
                      {localize(activeModuleCopy.description, language)}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-[#e2e8f0] bg-[#f8fbff] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a8797]">
                      {localize(layoutCopy.scope, language)}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-[#07111f]">
                      {localize(activeModuleCopy.navLabel, language)}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[#647083]">
                      {localize(layoutCopy.scopeBody, language)}
                    </p>
                    <div className="mt-4 rounded-[1rem] bg-white px-3 py-3">
                      <p className="font-mono text-[10px] uppercase text-[#8b98aa]">
                        {localize(layoutCopy.checks, language)}
                      </p>
                      <p className="mt-1 text-xl font-semibold text-[#07111f]">{activeModule.checks.length}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 px-5 pb-5 md:grid-cols-2 md:px-6 md:pb-6 2xl:grid-cols-4">
                  {activeModule.metrics.map((metric, index) => {
                    const metricCopy = activeModuleCopy.metrics[index];

                    return (
                    <div key={metric.label} className="rounded-[1.35rem] border border-[#e2e8f0] bg-white/70 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7a8797]">
                          {metricCopy ? localize(metricCopy.label, language) : metric.label}
                        </p>
                        <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${toneDotClassName[metric.tone]}`} />
                      </div>
                      <p className="mt-4 text-2xl font-semibold text-[#07111f]">{metric.value}</p>
                      <p className="mt-2 text-xs leading-5 text-[#647083]">
                        {metricCopy ? localize(metricCopy.detail, language) : metric.detail}
                      </p>
                    </div>
                    );
                  })}
                </div>

                <div className="border-t border-[#e2e8f0] px-5 py-5 md:px-6 md:py-6">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#2f80ff]">
                        {localize(layoutCopy.timeSeries, language)}
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold text-[#07111f]">
                        {localize(layoutCopy.history, language)}
                      </h3>
                    </div>
                    <span className="rounded-full bg-[#f3f8ff] px-3 py-1.5 font-mono text-[10px] uppercase text-[#2f80ff]">
                       {activeModule.charts.length} series
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 lg:grid-cols-3">
                    {activeModule.charts.map((chart) => (
                      <MonitoringChartCard
                        key={chart.id}
                        chart={chart}
                        chartCopy={(activeModuleCopy.charts as Record<string, LocalizedChartCopy>)[chart.id]}
                        language={language}
                      />
                    ))}
                  </div>
                </div>
              </article>

              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_23rem]">
                <article className="launch-surface overflow-hidden rounded-[2rem]">
                  <div className="flex items-center justify-between gap-3 border-b border-[#e2e8f0] bg-white/64 px-5 py-4 md:px-6">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#2f80ff]">
                        {localize(layoutCopy.signalMatrix, language)}
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold text-[#07111f]">
                        {localize(layoutCopy.checks, language)}
                      </h3>
                    </div>
                    <span className="rounded-full bg-[#f3f8ff] px-3 py-1.5 font-mono text-[10px] uppercase text-[#2f80ff]">
                      {activeModule.checks.length} {localize(layoutCopy.checks, language)}
                    </span>
                  </div>

                  <div className="grid gap-2 p-4 md:p-5">
                    {activeModule.checks.map((check, index) => {
                      const checkCopy = activeModuleCopy.checks[index];

                      return (
                      <div
                        key={check.label}
                        className="rounded-[1.2rem] border border-[#e8eef7] bg-white/72 px-4 py-3"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold leading-5 text-[#07111f]">
                              {checkCopy ? localize(checkCopy.label, language) : check.label}
                            </p>
                            <p className="mt-1 max-w-md text-xs leading-5 text-[#647083]">
                              {checkCopy ? localize(checkCopy.source, language) : check.source}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${toneDotClassName[check.tone]}`} />
                            <span
                              className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase ${toneBadgeClassName[check.tone]}`}
                            >
                              {localize(monitoringCopy.tone[check.tone], language)}
                            </span>
                          </div>
                        </div>
                        <p className="mt-3 rounded-[0.85rem] bg-[#f7faff] px-3 py-2 text-sm font-semibold text-[#07111f]">
                          {checkCopy ? localize(checkCopy.value, language) : check.value}
                        </p>
                      </div>
                      );
                    })}
                  </div>
                </article>

                <article data-testid="alert-feed" className="launch-surface rounded-[2rem] p-5 md:p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#2f80ff]">
                    {localize(layoutCopy.eventLog, language)}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-[#07111f]">
                    {localize(layoutCopy.moduleLog, language)}
                  </h3>
                  <ol className="mt-4 divide-y divide-[#e2e8f0]">
                    {activeModuleCopy.events.map((event, index) => (
                      <li key={event.en} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                        <span className="font-mono text-xs text-[#9aa6b6]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm leading-6 text-[#5c6879]">{localize(event, language)}</p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-5 rounded-[1.2rem] border border-[#e2e8f0] bg-white/62 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#7a8797]">
                      {localize(layoutCopy.dataPolicy, language)}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[#647083]">
                      {localize(layoutCopy.dataPolicyBody, language)}
                    </p>
                  </div>
                </article>
              </div>
                </>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
