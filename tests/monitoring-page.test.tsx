import { render, screen, within } from "@testing-library/react";
import MonitoringPage from "../app/monitoring/page";
import { getMonitoringSnapshot } from "../lib/api/monitoring";

describe("monitoring page", () => {
  it("renders the Morpho vault summary, status cards, and transparency sections", async () => {
    const page = await MonitoringPage();
    render(page);

    expect(
      screen.getByRole("heading", { name: /实时监控与风险透明度/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/0x1401d1271c47648ac70cbcdfa3776d4a87ce006b/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "首页" })).toHaveAttribute("href", "/");

    const vaultLink = screen.getByRole("link", { name: /morpho vault/i });
    expect(vaultLink).toHaveAttribute(
      "href",
      "https://app.morpho.org/base/vault/0x1401d1271C47648AC70cBcdfA3776D4A87CE006B/pangolins-usdc#overview"
    );

    const summaryStrip = screen.getByRole("region", {
      name: /monitoring summary/i
    });
    expect(within(summaryStrip).getByText(/coinbase \/ 托管路径/i)).toBeInTheDocument();
    expect(within(summaryStrip).getByText(/cbbtc \/ 抵押路径/i)).toBeInTheDocument();
    expect(within(summaryStrip).getByText(/response \/ 响应准备/i)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /为什么我们关注 coinbase \/ cbbtc \/ morpho 这条路径/i
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /我们在看什么/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /principles & rules/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /当风险上升时，我们如何响应/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /透明，不等于自废武功/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /技术能力不能消灭风险，只能更早识别风险/i })
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
      "safety-logic",
      "monitoring-dimensions",
      "principles",
      "abnormal-response-flow",
      "transparency-boundaries",
      "risk-statement"
    ]);
  });
});
