import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "../app/page";

describe("home page", () => {
  it("renders an Apple-style launch homepage with sparse Pangolins copy", () => {
    render(<HomePage />);

    const heroHeading = screen.getByRole("heading", { name: "管理风险，而非资金" });
    expect(heroHeading).toBeInTheDocument();
    expect(heroHeading).toHaveClass("leading-[1.06]", "md:leading-[1.05]");
    expect(heroHeading).not.toHaveClass("leading-[0.9]");
    expect(screen.getAllByTestId("hero-title-line")).toHaveLength(2);
    expect(screen.getAllByTestId("hero-title-line")[0]).not.toHaveClass("sm:whitespace-nowrap");
    expect(screen.getAllByTestId("hero-title-line")[0]).not.toHaveClass("whitespace-nowrap");
    expect(screen.getAllByTestId("scene-title-line-0")).toHaveLength(2);
    expect(screen.getAllByTestId("scene-title-line-1")).toHaveLength(4);
    expect(screen.getAllByTestId("scene-title-line-2")).toHaveLength(2);
    expect(screen.getByTestId("scene-title-1")).toHaveClass("lg:text-[4.45rem]", "leading-[1.04]");
    expect(screen.getByTestId("scene-title-1")).not.toHaveClass("lg:text-[5.6rem]");
    expect(screen.getAllByTestId("manifesto-thesis-line")).toHaveLength(2);
    expect(screen.getAllByTestId("manifesto-title-line")).toHaveLength(2);
    expect(screen.getAllByTestId("cta-title-line")).toHaveLength(2);
    expect(screen.getByTestId("launch-hero")).toBeInTheDocument();
    expect(screen.getByTestId("hero-thesis-line")).toBeInTheDocument();
    expect(screen.getByTestId("hero-signal-panel")).toBeInTheDocument();
    expect(screen.getByTestId("home-vault-status-strip")).toBeInTheDocument();
    expect(screen.getByText("公开快照")).toBeInTheDocument();
    expect(screen.getByText("公开预览 / 非实时")).toBeInTheDocument();
    expect(screen.queryByText(/Mock/i)).not.toBeInTheDocument();
    expect(screen.queryByText("refreshed every 5 minutes")).not.toBeInTheDocument();
    expect(screen.getByTestId("launch-metrics-strip")).toBeInTheDocument();
    expect(screen.getByText("承诺不够，行为必须可验证。")).toBeInTheDocument();
    expect(screen.queryByText(/Pangolins 是 Morpho Curator 风险管理策略/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /中文/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("原则")).toBeInTheDocument();
    expect(screen.queryByText("APY")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "信任不是写出来的，是执行出来的。" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("scene-visual-0")).toBeInTheDocument();
    expect(screen.getByTestId("scene-visual-1")).toBeInTheDocument();
    expect(screen.getByTestId("scene-visual-2")).toBeInTheDocument();
    expect(screen.getByTestId("scene-atmosphere-0")).toBeInTheDocument();
    expect(screen.getByTestId("scene-atmosphere-1")).toBeInTheDocument();
    expect(screen.getByTestId("scene-atmosphere-2")).toBeInTheDocument();
    expect(screen.getByTestId("scene-filter-visual")).toBeInTheDocument();
    expect(screen.getByTestId("scene-boundary-gateway")).toBeInTheDocument();
    expect(screen.getByTestId("scene-monitoring-core")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Curator 不是收益包装者，而是安全边界的守门人。" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "安全不是一次审计，而是一套持续运行的纪律。" })).toBeInTheDocument();
    expect(screen.getByText("风险不是收益的反面，而是产品本身。")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "收益可以复制，信任必须积累。" })).toBeInTheDocument();
    expect(screen.getByTestId("principles-rail")).toBeInTheDocument();
    expect(screen.getByTestId("principles-matrix")).toHaveClass("lg:grid-cols-[0.95fr_1.1fr_0.95fr]");
    expect(screen.getByTestId("principle-hero-card")).toBeInTheDocument();
    expect(screen.getAllByTestId("principle-compact-card")).toHaveLength(6);
    expect(screen.queryByTestId("principle-progress-bar")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "非托管" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "拒绝黑箱" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "主动筛选" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "过度抵押" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "透明披露" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "防御执行" })).toBeInTheDocument();
    expect(screen.getAllByTestId("principle-compact-card")[0]).not.toHaveStyle({ opacity: "0" });
    expect(screen.getByRole("heading", { name: "透明止于边界，纪律始于执行。" })).toBeInTheDocument();
    expect(screen.getByTestId("monitoring-preview-panel")).toBeInTheDocument();
    expect(screen.getByTestId("cta-action-dock")).toBeInTheDocument();
    expect(screen.getAllByTestId("cta-monitoring-node")).toHaveLength(3);
    expect(screen.getByText("阈值")).toBeInTheDocument();
    expect(screen.getByText("执行时序")).toBeInTheDocument();
    expect(screen.queryByText("Thresholds")).not.toBeInTheDocument();
    expect(screen.queryByText("Execution timing")).not.toBeInTheDocument();
    expect(screen.queryByTestId("cta-progress-bar")).not.toBeInTheDocument();
    expect(screen.queryByText(/cbBTC/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Coinbase/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/USDC Vault/i)).not.toBeInTheDocument();
  });

  it("exposes the required CTA destinations", () => {
    render(<HomePage />);

    const monitoringLinks = screen.getAllByRole("link", { name: "查看监控与透明度" });
    const vaultLinks = screen.getAllByRole("link", { name: "在 Morpho 查看 Vault" });

    expect(monitoringLinks[0]).toHaveAttribute(
      "href",
      "/monitoring"
    );
    expect(vaultLinks[0]).toHaveAttribute(
      "href",
      "https://app.morpho.org/base/vault/0x1401d1271C47648AC70cBcdfA3776D4A87CE006B/pangolins-usdc"
    );
    expect(monitoringLinks[0]).toHaveClass(
      "w-full",
      "max-w-full",
      "sm:w-auto"
    );
  });

  it("switches into English for the main content when requested", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(screen.getByRole("heading", { name: "Manage risk, not funds." })).toBeInTheDocument();
    await waitFor(() => expect(document.documentElement).toHaveAttribute("lang", "en"));
    expect(document.title).toBe("Pangolins | Risk-first Curator");
    expect(screen.queryByText(/Pangolins is a Morpho Curator risk-management strategy/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Trust is not claimed. It is executed."
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "A Curator is not a yield wrapper. It is a boundary keeper." })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Security is not a one-time audit. It is operating discipline." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Clear boundaries. Disciplined execution." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Non-custodial" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "No black boxes" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Over-collateralized" })).toBeInTheDocument();
    expect(screen.getByText("Thresholds")).toBeInTheDocument();
    expect(screen.getByText("Execution timing")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
  });
});
