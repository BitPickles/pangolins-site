import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "../app/page";

describe("home page", () => {
  it("renders a minimal launch-style homepage in Chinese by default", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "我们管理的不是资金，而是风险" })).toBeInTheDocument();
    expect(screen.getByText("We manage risk before capital.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /中文/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "高流动性，不该以高风险为代价" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "先保留退出能力，再谈收益增强" })).toBeInTheDocument();
    expect(screen.getByText("不是卖高收益，而是管理风险结构")).toBeInTheDocument();
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

    expect(screen.getByRole("heading", { name: "We manage risk before capital." })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "High liquidity should not require high risk." })
    ).toBeInTheDocument();
    expect(screen.getByText("Not selling high yield, but managing risk structure.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
  });
});
