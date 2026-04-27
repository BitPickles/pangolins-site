import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MonitoringPage from "../app/monitoring/page";
import { getMonitoringSnapshot } from "../lib/api/monitoring";

describe("monitoring page", () => {
  it("renders a data-center dashboard with left-side monitoring modules", async () => {
    const user = userEvent.setup();
    const page = await MonitoringPage();
    render(page);

    expect(screen.getByTestId("monitoring-shell")).toBeInTheDocument();
    expect(screen.getByTestId("vault-identity-card")).toBeInTheDocument();
    expect(screen.getByTestId("monitoring-app-shell")).toHaveAttribute("data-sidebar-collapsed", "false");
    expect(screen.getByTestId("monitoring-sidebar")).toHaveAttribute("data-layout", "fixed-sidebar");
    expect(screen.getByTestId("monitoring-layout")).toBeInTheDocument();
    expect(screen.getByTestId("monitoring-rail")).toBeInTheDocument();
    expect(screen.getByTestId("monitoring-module-panel")).toBeInTheDocument();
    expect(screen.getByTestId("alert-feed")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "折叠侧栏" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "打开监控模块" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("heading", { name: /Pangolins 数据中心/i })).toBeInTheDocument();
    expect(screen.getAllByText(/一个 Vault，总览在上，子监控在下/i).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText(/0x1401d1271c47648ac70cbcdfa3776d4a87ce006b/i).length
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("link", { name: "首页" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "监控与透明度" })).toHaveAttribute(
      "href",
      "/monitoring"
    );

    const vaultLink = screen.getByRole("link", { name: /morpho vault/i });
    expect(vaultLink).toHaveAttribute(
      "href",
      "https://app.morpho.org/base/vault/0x1401d1271C47648AC70cBcdfA3776D4A87CE006B/pangolins-usdc#overview"
    );

    const rail = screen.getByTestId("monitoring-rail");
    expect(within(rail).getByRole("button", { name: /Pangolins USDC Vault/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(within(rail).getByTestId("monitoring-child-modules")).toBeInTheDocument();
    expect(within(rail).getByRole("button", { name: /cbBTC/i })).toHaveAttribute("aria-pressed", "false");
    expect(within(rail).getByRole("button", { name: /Morpho/i })).toBeInTheDocument();
    expect(within(rail).getByRole("button", { name: /Base/i })).toBeInTheDocument();

    const modulePanel = screen.getByTestId("monitoring-module-panel");
    expect(within(modulePanel).getByRole("heading", { name: /Pangolins USDC Vault 总览/i })).toBeInTheDocument();
    expect(within(modulePanel).getByText(/总览只呈现当前 Vault 的公开状态和监控路径/i)).toBeInTheDocument();
    expect(within(modulePanel).queryByText(/这个总览聚合当前 Vault 的抵押品/i)).not.toBeInTheDocument();
    expect(within(modulePanel).getByText("cbBTC 监控")).toBeInTheDocument();
    expect(within(modulePanel).getByText("Morpho 监控")).toBeInTheDocument();
    expect(within(modulePanel).getByText("Base 监控")).toBeInTheDocument();

    await user.click(within(rail).getByRole("button", { name: /cbBTC/i }));
    expect(within(rail).getByRole("button", { name: /Pangolins USDC Vault/i })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(within(rail).getByRole("button", { name: /cbBTC/i })).toHaveAttribute("aria-pressed", "true");
    expect(within(modulePanel).getByRole("heading", { name: /cbBTC 资产监控/i })).toBeInTheDocument();
    expect(within(modulePanel).getByText("链上发行量")).toBeInTheDocument();
    expect(within(modulePanel).getByText("Base 流动性")).toBeInTheDocument();
    expect(within(modulePanel).getByText("BTC 价格偏离")).toBeInTheDocument();
    expect(within(modulePanel).getAllByTestId("module-chart")).toHaveLength(3);
    expect(screen.queryByRole("heading", { name: /Pangolins 数据中心/i })).not.toBeInTheDocument();
    expect(screen.queryByTestId("vault-identity-card")).not.toBeInTheDocument();

    await user.click(within(rail).getByRole("button", { name: /Morpho/i }));
    expect(within(modulePanel).getByRole("heading", { name: /Morpho 市场监控/i })).toBeInTheDocument();
    expect(within(modulePanel).getAllByText("多链 TVL").length).toBeGreaterThanOrEqual(1);
    expect(within(modulePanel).getAllByText("预言机状态").length).toBeGreaterThanOrEqual(1);
    expect(within(modulePanel).getAllByText("市场利用率").length).toBeGreaterThanOrEqual(1);

    await user.click(within(rail).getByRole("button", { name: /Base/i }));
    expect(within(modulePanel).getByRole("heading", { name: /Base 链环境监控/i })).toBeInTheDocument();
    expect(within(modulePanel).getByText("Base USDC 发行量")).toBeInTheDocument();
    expect(within(modulePanel).getAllByText("出块连续性").length).toBeGreaterThanOrEqual(1);
    expect(within(modulePanel).getAllByText("Gas 压力").length).toBeGreaterThanOrEqual(1);

    expect(screen.queryByRole("heading", { name: /Curator 的职责不是包装收益/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /收益可以复制，信任必须积累/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /透明，不等于消灭风险/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/旧文章/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Base USDC、出块与 Gas 指标已纳入公开预览/i)).toBeInTheDocument();
    expect(screen.queryByText(/围绕 Base 作为执行环境建立独立面板/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/adapter pending|placeholder/i)).not.toBeInTheDocument();

    await user.click(within(rail).getByRole("button", { name: /Pangolins USDC Vault/i }));
    expect(within(modulePanel).getByRole("heading", { name: /Pangolins USDC Vault 总览/i })).toBeInTheDocument();
  });

  it("switches the monitoring dashboard between Chinese and English user copy", async () => {
    const user = userEvent.setup();
    const page = await MonitoringPage();
    render(page);

    expect(screen.getByRole("button", { name: /中文/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "首页" })).toHaveAttribute("href", "/");
    expect(screen.getByText("公开预览，非实时数据源。")).toBeInTheDocument();
    expect(screen.getAllByText("一个 Vault，总览在上，子监控在下。").length).toBeGreaterThanOrEqual(1);

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByText("Public preview, not a live feed.")).toBeInTheDocument();
    expect(screen.getAllByText("One vault overview with dedicated child monitors.").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("button", { name: "Collapse sidebar" })).toBeInTheDocument();
  });

  it("keeps the monitoring navigation as a collapsible fixed app sidebar", async () => {
    const user = userEvent.setup();
    const page = await MonitoringPage();
    render(page);

    const shell = screen.getByTestId("monitoring-app-shell");
    const sidebar = screen.getByTestId("monitoring-sidebar");
    const sidebarBrand = screen.getByTestId("monitoring-sidebar-brand");
    const sidebarToggle = screen.getByTestId("monitoring-sidebar-toggle");
    const collapseButton = screen.getByRole("button", { name: "折叠侧栏" });
    const mobileButton = screen.getByRole("button", { name: "打开监控模块" });

    expect(sidebar).toHaveAttribute("data-layout", "fixed-sidebar");
    expect(shell).toHaveAttribute("data-sidebar-collapsed", "false");
    expect(sidebarBrand).toHaveAttribute("data-collapse-layout", "row");
    expect(sidebarToggle).toHaveAttribute("data-collapsed-control", "false");

    await user.click(collapseButton);
    expect(shell).toHaveAttribute("data-sidebar-collapsed", "true");
    expect(sidebarBrand).toHaveAttribute("data-collapse-layout", "stacked");
    expect(sidebarToggle).toHaveAttribute("data-collapsed-control", "true");
    expect(screen.getByRole("button", { name: "展开侧栏" })).toBeInTheDocument();

    await user.click(mobileButton);
    expect(mobileButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("monitoring-mobile-drawer")).toHaveAttribute("data-open", "true");
  });

  it("provides a stable mock monitoring snapshot shape for the page and APIs", async () => {
    const snapshot = await getMonitoringSnapshot();

    expect(snapshot.vault.address).toBe("0x1401d1271C47648AC70cBcdfA3776D4A87CE006B");
    expect(snapshot.vault.chain).toBe("Base");
    expect(snapshot.summary).toHaveLength(3);
    expect(snapshot.statusCards).toHaveLength(4);
    expect(snapshot.monitoringDomains).toHaveLength(4);
    expect(snapshot.monitoringDomains.map((domain) => domain.status)).toEqual([
      "active",
      "active",
      "active",
      "planned"
    ]);
    expect(snapshot.monitoringModules.map((module) => module.id)).toEqual(["cbbtc", "morpho", "base"]);
    expect(snapshot.monitoringModules[0].charts.map((chart) => chart.id)).toEqual([
      "cbbtc-onchain-supply",
      "cbbtc-base-liquidity",
      "cbbtc-btc-price-basis"
    ]);
    expect(snapshot.monitoringModules[0].charts.every((chart) => chart.series[0].points.length >= 6)).toBe(true);
    expect(snapshot.monitoringModules[1].charts.some((chart) => chart.id === "morpho-multichain-tvl")).toBe(true);
    expect(snapshot.monitoringModules[2].charts.map((chart) => chart.id)).toEqual([
      "base-usdc-supply",
      "base-block-production",
      "base-gas-pressure"
    ]);
    expect(snapshot.recentEvents).toHaveLength(3);
    expect(snapshot.sections).toEqual([]);
  });
});
