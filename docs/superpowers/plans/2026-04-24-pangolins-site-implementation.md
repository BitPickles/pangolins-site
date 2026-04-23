# Pangolins Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new bilingual Pangolins website with a premium editorial home page and a simpler monitoring/transparency page for the Morpho vault.

**Architecture:** Use a Next.js App Router project with a small shared content layer, shared design tokens, and route-specific components. Keep Home mostly static and interaction-heavy, while Monitoring reads mock API endpoints and favors maintainable status-card composition.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Vitest, Testing Library

---

## File Structure

- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/monitoring/page.tsx`
- Create: `app/api/monitoring/summary/route.ts`
- Create: `app/api/monitoring/liquidity/route.ts`
- Create: `app/api/monitoring/risk-signals/route.ts`
- Create: `app/api/monitoring/system-status/route.ts`
- Create: `app/api/monitoring/recent-events/route.ts`
- Create: `app/globals.css`
- Create: `components/site-header.tsx`
- Create: `components/language-toggle.tsx`
- Create: `components/home/hero.tsx`
- Create: `components/home/section-frame.tsx`
- Create: `components/home/value-proposition.tsx`
- Create: `components/home/strategy-focus.tsx`
- Create: `components/home/capability-grid.tsx`
- Create: `components/home/monitoring-bridge.tsx`
- Create: `components/monitoring/status-card.tsx`
- Create: `components/monitoring/summary-strip.tsx`
- Create: `components/monitoring/security-dashboard.tsx`
- Create: `components/monitoring/principles-grid.tsx`
- Create: `components/monitoring/response-flow.tsx`
- Create: `components/monitoring/recent-events.tsx`
- Create: `lib/content/site-copy.ts`
- Create: `lib/content/monitoring-data.ts`
- Create: `lib/site-theme.ts`
- Create: `lib/api/monitoring.ts`
- Create: `tests/site-theme.test.ts`
- Create: `tests/home-page.test.tsx`
- Create: `tests/monitoring-page.test.tsx`
- Modify: `.gitignore`

Design boundaries:

- `lib/content/*` owns bilingual copy and mock data.
- `lib/site-theme.ts` owns route-agnostic design tokens and badge/state helpers.
- `components/home/*` owns editorial sections and motion-ready page composition.
- `components/monitoring/*` owns dense but readable status UI.
- `app/api/monitoring/*` returns mock JSON with stable shapes for future live integrations.

### Task 1: Scaffold Next.js, Tailwind, and Test Harness

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.js`, `tailwind.config.ts`, `vitest.config.ts`, `vitest.setup.ts`
- Create: `app/layout.tsx`, `app/globals.css`
- Test: `tests/site-theme.test.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Write the failing test**

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/site-theme.test.ts`
Expected: FAIL because project dependencies and `lib/site-theme.ts` do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```json
{
  "name": "pangolins-site",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "framer-motion": "^12.10.0",
    "next": "^16.0.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/node": "^24.6.0",
    "@types/react": "^19.1.12",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.2",
    "autoprefixer": "^10.4.21",
    "jsdom": "^26.1.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.9.2",
    "vitest": "^3.2.4"
  }
}
```

```ts
export const siteTheme = {
  colors: {
    bg: "#071019",
    panel: "#0f1a26",
  },
} as const;

export function getStateTone(state: "normal" | "watch" | "alert") {
  if (state === "normal") return "emerald";
  if (state === "watch") return "amber";
  return "rose";
}
```

Create minimal `app/layout.tsx` and `app/globals.css` to boot the App Router and reference the theme tokens through CSS variables.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm install`
Run: `npm test -- --run tests/site-theme.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .gitignore package.json tsconfig.json next.config.ts postcss.config.js tailwind.config.ts vitest.config.ts vitest.setup.ts app/layout.tsx app/globals.css lib/site-theme.ts tests/site-theme.test.ts
git commit -m "chore: scaffold pangolins next app"
```

### Task 2: Build Shared Content Model and Language Toggle

**Files:**
- Create: `lib/content/site-copy.ts`
- Create: `components/language-toggle.tsx`
- Create: `components/site-header.tsx`
- Test: `tests/home-page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "../app/page";

describe("home page language model", () => {
  it("renders Chinese by default and exposes English support labels", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: "我们管理的不是资金，而是风险" })
    ).toBeInTheDocument();

    expect(screen.getByText("We manage risk before capital.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /中文/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/home-page.test.tsx`
Expected: FAIL because `app/page.tsx` and content files do not exist.

- [ ] **Step 3: Write minimal implementation**

Create `lib/content/site-copy.ts` with:

```ts
export const siteCopy = {
  nav: {
    home: { zh: "首页", en: "Home" },
    monitoring: { zh: "监控与透明度", en: "Monitoring" },
  },
  hero: {
    title: { zh: "我们管理的不是资金，而是风险", en: "We manage risk before capital." },
    subtitle: {
      zh: "一个基于 Morpho 的 Curator 风险管理产品，服务于链上杠铃策略中最保守的一端。",
      en: "A Morpho curator product focused on the defensive end of onchain capital allocation.",
    },
  },
} as const;
```

Create a client `language-toggle` that keeps a small `zh/en` state and defaults to `zh`. Create `site-header` to show logo wordmark, nav links, and toggle. Create `app/page.tsx` that renders the header plus a temporary hero block using the shared copy.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/home-page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/language-toggle.tsx components/site-header.tsx lib/content/site-copy.ts tests/home-page.test.tsx
git commit -m "feat: add bilingual site shell"
```

### Task 3: Implement Home Page Editorial Sections and Motion

**Files:**
- Create: `components/home/hero.tsx`
- Create: `components/home/section-frame.tsx`
- Create: `components/home/value-proposition.tsx`
- Create: `components/home/strategy-focus.tsx`
- Create: `components/home/capability-grid.tsx`
- Create: `components/home/monitoring-bridge.tsx`
- Modify: `app/page.tsx`
- Test: `tests/home-page.test.tsx`

- [ ] **Step 1: Write the failing test**

Extend `tests/home-page.test.tsx` with:

```tsx
it("shows the core institutional sections and monitoring CTA", () => {
  render(<HomePage />);

  expect(screen.getByText("真正稀缺的不是收益，而是对风险的克制")).toBeInTheDocument();
  expect(screen.getByText("杠铃策略的保守一端")).toBeInTheDocument();
  expect(screen.getByText("风险管理，才是产品本身")).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "查看监控与透明度" })
  ).toHaveAttribute("href", "/monitoring");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/home-page.test.tsx`
Expected: FAIL because the new sections are not rendered.

- [ ] **Step 3: Write minimal implementation**

Build the page with focused section components:

```tsx
export default function HomePage() {
  return (
    <main>
      <Hero />
      <ValueProposition />
      <StrategyFocus />
      <CapabilityGrid />
      <MonitoringBridge />
    </main>
  );
}
```

Implementation requirements:

- Hero uses restrained `framer-motion` reveal for logo, title, tags, and CTA.
- `section-frame.tsx` owns recurring dossier label, title, subtitle, and left border treatment.
- `value-proposition.tsx` covers existence, barbell positioning, and current strategy style.
- `capability-grid.tsx` covers market screening, liquidity, monitoring, response, discipline.
- `monitoring-bridge.tsx` tees up the Monitoring page and links to the Morpho vault.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/home-page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/home tests/home-page.test.tsx
git commit -m "feat: build editorial home page"
```

### Task 4: Implement Monitoring Mock APIs and Dashboard Components

**Files:**
- Create: `lib/content/monitoring-data.ts`
- Create: `lib/api/monitoring.ts`
- Create: `components/monitoring/status-card.tsx`
- Create: `components/monitoring/summary-strip.tsx`
- Create: `components/monitoring/security-dashboard.tsx`
- Create: `components/monitoring/principles-grid.tsx`
- Create: `components/monitoring/response-flow.tsx`
- Create: `components/monitoring/recent-events.tsx`
- Create: `app/api/monitoring/summary/route.ts`
- Create: `app/api/monitoring/liquidity/route.ts`
- Create: `app/api/monitoring/risk-signals/route.ts`
- Create: `app/api/monitoring/system-status/route.ts`
- Create: `app/api/monitoring/recent-events/route.ts`
- Create: `app/monitoring/page.tsx`
- Test: `tests/monitoring-page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import MonitoringPage from "../app/monitoring/page";

describe("monitoring page", () => {
  it("renders vault-focused transparency sections", async () => {
    render(await MonitoringPage());

    expect(screen.getByRole("heading", { name: /Monitoring & Transparency/i })).toBeInTheDocument();
    expect(screen.getByText("Vault Status")).toBeInTheDocument();
    expect(screen.getByText("Coinbase / cbBTC")).toBeInTheDocument();
    expect(screen.getByText("当风险上升时，我们如何响应")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/monitoring-page.test.tsx`
Expected: FAIL because the route and components do not exist.

- [ ] **Step 3: Write minimal implementation**

Create `lib/content/monitoring-data.ts` with stable mock payloads:

```ts
export const monitoringSummary = {
  vaultStatus: "Normal",
  riskMode: "Conservative",
  marketFocus: "USDC supplied into cbBTC-backed conservative markets",
  monitoringStack: "Onchain + Mempool + Execution Alerts",
  updatedAt: "2026-04-24T12:00:00.000Z",
};
```

Expose the same shape through each `app/api/monitoring/*/route.ts` via `NextResponse.json(...)`. Build `app/monitoring/page.tsx` as an async server component that reads from `lib/api/monitoring.ts` and renders:

- overview heading and subtitle
- summary strip
- security dashboard for Coinbase, cbBTC, Morpho, monitoring stack
- what-we-monitor section
- principles grid
- response flow
- recent events
- transparency boundary and risk statement

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/monitoring-page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/monitoring/page.tsx app/api/monitoring lib/content/monitoring-data.ts lib/api/monitoring.ts components/monitoring tests/monitoring-page.test.tsx
git commit -m "feat: add monitoring transparency page"
```

### Task 5: Polish Responsive UI, Metadata, and Build Verification

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `app/page.tsx`
- Modify: `app/monitoring/page.tsx`
- Test: `tests/home-page.test.tsx`, `tests/monitoring-page.test.tsx`

- [ ] **Step 1: Write the failing test**

Add assertions for navigation and critical metadata-driven affordances:

```tsx
it("keeps the monitoring route reachable from the home page", () => {
  render(<HomePage />);
  expect(screen.getByRole("link", { name: "监控与透明度" })).toHaveAttribute("href", "/monitoring");
});
```

```tsx
it("shows the Morpho vault link on the monitoring page", async () => {
  render(await MonitoringPage());
  expect(screen.getByRole("link", { name: /Morpho Vault/i })).toHaveAttribute(
    "href",
    "https://app.morpho.org/base/vault/0x1401d1271C47648AC70cBcdfA3776D4A87CE006B/pangolins-usdc"
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL because the new navigation or external vault affordances are not fully implemented.

- [ ] **Step 3: Write minimal implementation**

Complete polish work:

- add route metadata title and description in `app/layout.tsx`
- finish responsive spacing and type scale in `app/globals.css`
- ensure both pages expose stable nav links
- add external Morpho vault CTA in Monitoring
- refine hover/focus states for accessibility

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Run: `npm run build`
Expected: all tests PASS and Next build succeeds with no type errors.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css app/page.tsx app/monitoring/page.tsx tests/home-page.test.tsx tests/monitoring-page.test.tsx
git commit -m "feat: polish pangolins site experience"
```

## Self-Review

Spec coverage check:

- Home route structure: covered by Tasks 2 and 3.
- Monitoring route structure: covered by Task 4.
- Bilingual default-Chinese behavior: covered by Task 2.
- Premium editorial vs restrained dashboard split: covered by Tasks 3 and 4.
- Mock API shape and future real-data boundary: covered by Task 4.
- Responsive and verification pass: covered by Task 5.

Placeholder scan:

- No `TBD`, `TODO`, or deferred “implement later” language remains in task steps.

Type consistency:

- `siteTheme`, `getStateTone`, `monitoringSummary`, and route names are defined before later tasks reference them.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-24-pangolins-site-implementation.md`.

The recommended execution path is already chosen by the user: Subagent-Driven execution with parallel, isolated work where possible. The controller will keep the integration work local and dispatch bounded implementation tasks to worker agents.
