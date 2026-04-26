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
    expect(screen.getByText("信任不是承诺，是可验证的行动。")).toBeInTheDocument();
    expect(screen.getByText(/Morpho 上的 Curator 风险管理策略/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /中文/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("原则")).toBeInTheDocument();
    expect(screen.queryByText("APY")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "信任不是写出来的，是执行出来的。" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("scene-visual-0")).toBeInTheDocument();
    expect(screen.getByTestId("scene-visual-1")).toBeInTheDocument();
    expect(screen.getByTestId("scene-visual-2")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Curator 不是收益包装者，而是安全边界的守门人。" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "安全不是一次审计，而是一套持续运行的纪律。" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "收益可以复制，信任必须积累。" })).toBeInTheDocument();
    expect(screen.getByTestId("principle-band")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "非托管" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "拒绝黑箱" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "主动筛选" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "过度抵押" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "透明披露" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "防御执行" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "看见风险如何被拆开。" })).toBeInTheDocument();
    expect(screen.queryByText(/cbBTC/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Coinbase/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/USDC Vault/i)).not.toBeInTheDocument();
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
        name: "Trust is not claimed. It is executed."
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "A Curator is not a yield wrapper. It is a boundary keeper." })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Security is not a one-time audit. It is operating discipline." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Non-custodial" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "No black boxes" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Over-collateralized" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
  });
});
