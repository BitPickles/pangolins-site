import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "../app/page";

describe("home page", () => {
  it("renders an Apple-style launch homepage with sparse Pangolins copy", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "管理风险，而非资金" })).toBeInTheDocument();
    expect(screen.getByTestId("launch-hero")).toBeInTheDocument();
    expect(screen.getByTestId("hero-signal-panel")).toBeInTheDocument();
    expect(screen.getByTestId("launch-metrics-strip")).toBeInTheDocument();
    expect(screen.getByText("为保守型链上资金构建的风险基础设施。")).toBeInTheDocument();
    expect(screen.getByText(/基于 Morpho 的链上风险管理层/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /中文/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("协议")).toBeInTheDocument();
    expect(screen.queryByText("APY")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "让 DeFi 的复杂性，停在系统里。" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("scene-visual-0")).toBeInTheDocument();
    expect(screen.getByTestId("scene-visual-1")).toBeInTheDocument();
    expect(screen.getByTestId("scene-visual-2")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "不是追逐更高收益，而是保留退出能力。" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "安全不是一次性的审计。" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "非托管。透明。长期主义。" })).toBeInTheDocument();
    expect(screen.getByTestId("principle-band")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "看见我们如何看风险。" })).toBeInTheDocument();
  });

  it("exposes the required CTA destinations", () => {
    render(<HomePage />);

    expect(screen.getByRole("link", { name: /view monitoring/i })).toHaveAttribute(
      "href",
      "/monitoring"
    );
    expect(screen.getByRole("link", { name: /morpho vault/i })).toHaveAttribute(
      "href",
      "https://app.morpho.org/base/vault/0x1401d1271C47648AC70cBcdfA3776D4A87CE006B/pangolins-usdc"
    );
  });

  it("switches into English for the main content when requested", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(screen.getByRole("heading", { name: "Manage risk, not funds." })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Keep DeFi complexity inside the system."
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Not higher yield. Better exit discipline." })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Security is not a one-time audit." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
  });
});
