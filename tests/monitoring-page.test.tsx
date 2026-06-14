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
    expect(screen.getAllByText(/点开金库即可展开它的子监控/i).length).toBeGreaterThanOrEqual(1);
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
    const usdcCard = within(rail).getByRole("button", { name: /Pangolins USDC Vault/i });
    const usdtCard = within(rail).getByRole("button", { name: /Pangolins USDT Vault/i });
    // Both vaults appear; USDC is the active overview by default.
    expect(usdcCard).toHaveAttribute("aria-pressed", "true");
    expect(usdtCard).toHaveAttribute("aria-pressed", "false");
    // Child monitors are folded into the vault card until it is opened: both
    // accordion bodies are mounted (for the open/close animation) but collapsed
    // and aria-hidden, so they are absent from the accessibility tree.
    const childGroups = within(rail).getAllByTestId("monitoring-child-modules");
    expect(childGroups).toHaveLength(2);
    expect(childGroups[0]).toHaveAttribute("data-expanded", "false");
    expect(within(rail).queryByRole("button", { name: /cbBTC/i })).not.toBeInTheDocument();

    const modulePanel = screen.getByTestId("monitoring-module-panel");
    expect(within(modulePanel).getByRole("heading", { name: /Pangolins USDC Vault 总览/i })).toBeInTheDocument();
    expect(within(modulePanel).getByText(/面向公众的展示视图.*实际运营监控覆盖的维度远多于此/i)).toBeInTheDocument();
    expect(within(modulePanel).getByText("cbBTC 监控")).toBeInTheDocument();
    expect(within(modulePanel).getByText("Morpho 监控")).toBeInTheDocument();
    expect(within(modulePanel).getByText("Base 监控")).toBeInTheDocument();

    // Open the USDC vault to reveal its child monitors.
    await user.click(usdcCard);
    expect(usdcCard).toHaveAttribute("aria-expanded", "true");
    expect(within(rail).getAllByTestId("monitoring-child-modules")[0]).toHaveAttribute("data-expanded", "true");
    expect(within(rail).getByRole("button", { name: /cbBTC/i })).toHaveAttribute("aria-pressed", "false");
    expect(within(rail).getByRole("button", { name: /Morpho/i })).toBeInTheDocument();
    expect(within(rail).getByRole("button", { name: /Base/i })).toBeInTheDocument();

    await user.click(within(rail).getByRole("button", { name: /cbBTC/i }));
    expect(usdcCard).toHaveAttribute("aria-pressed", "false");
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
    expect(screen.getByText(/Base USDC、出块与 Gas 指标已接入实时监控/i)).toBeInTheDocument();
    expect(screen.queryByText(/adapter pending|placeholder/i)).not.toBeInTheDocument();

    // Accordion: opening the USDT vault collapses the USDC children and shows USDT.
    await user.click(usdtCard);
    expect(within(rail).queryByRole("button", { name: /cbBTC/i })).not.toBeInTheDocument();
    expect(usdtCard).toHaveAttribute("aria-expanded", "true");
    expect(within(modulePanel).getByRole("heading", { name: /Pangolins USDT Vault 总览/i })).toBeInTheDocument();
    expect(within(modulePanel).getByText("USDT 监控")).toBeInTheDocument();
    expect(within(modulePanel).getByText("Lista 监控")).toBeInTheDocument();
    expect(within(modulePanel).getByText("BSC 监控")).toBeInTheDocument();

    const usdtLink = screen.getByRole("link", { name: /lista vault/i });
    expect(usdtLink).toHaveAttribute(
      "href",
      "https://lista.org/lending/vault/bsc/0xeb4f6ffb1038e1cca701e7d53083b37ec5b6ba33?tab=vault"
    );

    await user.click(within(rail).getByRole("button", { name: /Lista/i }));
    expect(within(modulePanel).getByRole("heading", { name: /Lista 借贷监控/i })).toBeInTheDocument();
    expect(within(modulePanel).getAllByText("多链 TVL").length).toBeGreaterThanOrEqual(1);
    expect(within(modulePanel).getAllByText("协议利用率").length).toBeGreaterThanOrEqual(1);

    await user.click(within(rail).getByRole("button", { name: /BSC/i }));
    expect(within(modulePanel).getByRole("heading", { name: /BSC 链环境监控/i })).toBeInTheDocument();
    expect(within(modulePanel).getAllByText("Gas 压力").length).toBeGreaterThanOrEqual(1);
    expect(within(modulePanel).getAllByText("BNB 价格").length).toBeGreaterThanOrEqual(1);
  });

  it("switches the monitoring dashboard between Chinese and English user copy", async () => {
    const user = userEvent.setup();
    const page = await MonitoringPage();
    render(page);

    expect(screen.getByRole("button", { name: /中文/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "首页" })).toHaveAttribute("href", "/");
    expect(screen.getByText("公开展示视图，仅为完整监控的一部分。")).toBeInTheDocument();
    expect(screen.getAllByText("点开金库即可展开它的子监控。").length).toBeGreaterThanOrEqual(1);

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByText("Public showcase — a subset of our full monitoring.")).toBeInTheDocument();
    expect(screen.getAllByText("Select a vault to expand its child monitors.").length).toBeGreaterThanOrEqual(1);
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
