import { describe, expect, it } from "vitest";
import { getStateTone, siteTheme } from "../lib/site-theme";

describe("site theme", () => {
  it("exposes premium neutral palette tokens", () => {
    expect(siteTheme.colors.bg).toBe("#071019");
    expect(siteTheme.colors.panel).toBe("#0f1a26");
  });

  it("maps monitoring states to semantic tones", () => {
    expect(getStateTone("normal")).toBe("emerald");
    expect(getStateTone("watch")).toBe("amber");
    expect(getStateTone("alert")).toBe("rose");
  });
});
