import { describe, expect, it } from "vitest";
import { getStateTone, siteTheme } from "../lib/site-theme";

describe("site theme", () => {
  it("exposes premium neutral palette tokens", () => {
    expect(siteTheme.colors.bg).toBe("#ffffff");
    expect(siteTheme.colors.panel).toBe("#fafbfd");
  });

  it("maps monitoring states to semantic tones", () => {
    expect(getStateTone("normal")).toBe("emerald");
    expect(getStateTone("watch")).toBe("amber");
    expect(getStateTone("alert")).toBe("rose");
  });
});
