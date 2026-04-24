export const siteTheme = {
  colors: {
    bg: "#ffffff",
    panel: "#fafbfd"
  }
} as const;

export type MonitoringState = "normal" | "watch" | "alert";

export function getStateTone(state: MonitoringState) {
  if (state === "normal") return "emerald";
  if (state === "watch") return "amber";
  return "rose";
}
