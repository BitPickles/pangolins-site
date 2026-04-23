import { render, screen } from "@testing-library/react";
import HomePage from "../app/page";

describe("home page language model", () => {
  it("renders Chinese by default and exposes English support labels", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: "我们管理的不是资金，而是风险" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("We manage risk before capital.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /中文/i })).toBeInTheDocument();
  });
});
