import { render, screen, within } from "@testing-library/react";
import MonitoringPage from "../app/monitoring/page";
import { getMonitoringSnapshot } from "../lib/api/monitoring";

describe("monitoring page", () => {
  it("renders the Morpho vault safety board and compact risk-path language", async () => {
    const page = await MonitoringPage();
    render(page);

    expect(screen.getByTestId("monitoring-shell")).toBeInTheDocument();
    expect(screen.getByTestId("vault-identity-card")).toBeInTheDocument();
    expect(screen.getByTestId("risk-path-grid")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /实时监控与风险透明度/i })).toBeInTheDocument();
    expect(
      screen.getByText(/0x1401d1271c47648ac70cbcdfa3776d4a87ce006b/i)
    ).toBeInTheDocument();
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

    const summaryStrip = screen.getByRole("region", {
      name: /monitoring summary/i
    });
    expect(within(summaryStrip).getByText("Coinbase 安全路径")).toBeInTheDocument();
    expect(within(summaryStrip).getByText("cbBTC 链上路径")).toBeInTheDocument();
    expect(within(summaryStrip).getByText("Morpho Vault 状态")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /Curator 的职责不是包装收益/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /三条安全路径/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /系统在看什么/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /收益可以复制，信任必须积累/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /风险上升时如何响应/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /透明，不等于消灭风险/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /recent events/i })).toBeInTheDocument();
    expect(screen.getByText(/Mock feed heartbeat refreshed\./i)).toBeInTheDocument();
  });

  it("provides a stable mock monitoring snapshot shape for the page and APIs", async () => {
    const snapshot = await getMonitoringSnapshot();

    expect(snapshot.vault.address).toBe("0x1401d1271C47648AC70cBcdfA3776D4A87CE006B");
    expect(snapshot.vault.chain).toBe("Base");
    expect(snapshot.summary).toHaveLength(3);
    expect(snapshot.statusCards).toHaveLength(4);
    expect(snapshot.liquidity).toHaveLength(2);
    expect(snapshot.riskSignals).toHaveLength(2);
    expect(snapshot.recentEvents).toHaveLength(3);
    expect(snapshot.sections.map((section) => section.slug)).toEqual([
      "curator-role",
      "safety-logic",
      "monitoring-dimensions",
      "principles",
      "abnormal-response-flow",
      "transparency-and-risk"
    ]);
  });
});
