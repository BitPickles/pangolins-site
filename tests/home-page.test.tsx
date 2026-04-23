import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "../app/page";

describe("home page", () => {
  it("renders the editorial homepage in Chinese by default with English support text", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: "我们管理的不是资金，而是风险" })
    ).toBeInTheDocument();
    expect(screen.getByText("We manage risk before capital.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /中文/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    expect(screen.getByText("Why This Exists")).toBeInTheDocument();
    expect(screen.getByText("Barbell Positioning")).toBeInTheDocument();
    expect(screen.getByText("Current Strategy Style")).toBeInTheDocument();
    expect(screen.getByText("Core Capabilities")).toBeInTheDocument();
    expect(screen.getByText("风险不是结果，它先是结构。")).toBeInTheDocument();
    expect(screen.getByText("Monitoring Bridge")).toBeInTheDocument();
    expect(screen.getByText("Risk Notice")).toBeInTheDocument();
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
    expect(screen.getByText("Risk Brief")).toBeInTheDocument();
  });

  it("switches into English for the main content when requested", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(
      screen.getByRole("heading", { name: "We manage risk before capital." })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "A Morpho curator product focused on the defensive end of onchain capital allocation."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
