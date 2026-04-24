# Pangolins Apple Launch Copy Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Pangolins two-page site into an Apple-style launch experience with sparse bilingual copy, stronger white-background visual hierarchy, scroll-driven homepage motion, and a compact monitoring page.

**Architecture:** Keep the current Next.js App Router structure and the existing bilingual content model. Rewrite `lib/content/site-copy.ts` and `lib/content/monitoring-data.ts` first, then adapt homepage components to the shorter launch narrative and compact the monitoring page presentation without changing API route contracts.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Vitest, Testing Library.

---

## File Map

- `lib/content/site-copy.ts`: Source of bilingual homepage copy, CTA labels, hero chips, metrics, and section copy.
- `lib/content/monitoring-data.ts`: Mock monitoring snapshot used by `/monitoring` and monitoring API routes.
- `components/home/apple-hero.tsx`: Homepage hero visual and first-screen CTA.
- `components/home/apple-scenes.tsx`: Scroll-driven homepage narrative scenes.
- `components/home/apple-manifesto.tsx`: Principles section.
- `components/home/apple-cta.tsx`: Final homepage CTA.
- `components/monitoring/monitoring-summary-strip.tsx`: Compact top monitoring summary strip.
- `components/monitoring/monitoring-status-cards.tsx`: Monitoring status cards.
- `components/monitoring/monitoring-sections.tsx`: Monitoring methodology/principles/risk sections.
- `tests/home-page.test.tsx`: Homepage copy, language, and CTA regression tests.
- `tests/monitoring-page.test.tsx`: Monitoring page copy, vault link, and snapshot shape tests.

## Task 1: Rewrite Tests Around Apple-Launch Copy

**Files:**
- Modify: `tests/home-page.test.tsx`
- Modify: `tests/monitoring-page.test.tsx`

- [ ] **Step 1: Update homepage assertions**

Replace the homepage tests so they assert the new short narrative:

```tsx
expect(screen.getByRole("heading", { name: "管理风险，而非资金" })).toBeInTheDocument();
expect(screen.getByText(/基于 Morpho 的链上风险管理层/i)).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "让 DeFi 的复杂性，停在系统里。" })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "不是追逐更高收益，而是保留退出能力。" })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "安全不是一次性的审计。" })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "非托管。透明。长期主义。" })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "看见我们如何看风险。" })).toBeInTheDocument();
```

- [ ] **Step 2: Update English assertions**

Assert the English short narrative:

```tsx
await user.click(screen.getByRole("button", { name: "EN" }));
expect(screen.getByRole("heading", { name: "Manage risk, not funds." })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "Keep DeFi complexity inside the system." })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "Not higher yield. Better exit discipline." })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "Security is not a one-time audit." })).toBeInTheDocument();
```

- [ ] **Step 3: Update monitoring assertions**

Assert compact safety-board language:

```tsx
expect(within(summaryStrip).getByText("Coinbase 安全路径")).toBeInTheDocument();
expect(within(summaryStrip).getByText("cbBTC 链上路径")).toBeInTheDocument();
expect(within(summaryStrip).getByText("Morpho Vault 状态")).toBeInTheDocument();
expect(screen.getByRole("heading", { name: /三条风险路径/i })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: /Principles & Rules/i })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: /技术能力不能消灭风险/i })).toBeInTheDocument();
```

- [ ] **Step 4: Run focused tests and verify RED**

Run:

```bash
npm test -- tests/home-page.test.tsx tests/monitoring-page.test.tsx
```

Expected: tests fail because content and components still expose the old recovered-copy narrative.

## Task 2: Rewrite Content Data

**Files:**
- Modify: `lib/content/site-copy.ts`
- Modify: `lib/content/monitoring-data.ts`
- Test: `tests/home-page.test.tsx`
- Test: `tests/monitoring-page.test.tsx`

- [ ] **Step 1: Replace homepage copy with short bilingual launch copy**

Use these exact Chinese anchors:

```ts
title: { zh: "管理风险，而非资金", en: "Manage risk, not funds." }
```

Scenes:

```ts
[
  "让 DeFi 的复杂性，停在系统里。",
  "不是追逐更高收益，而是保留退出能力。",
  "安全不是一次性的审计。"
]
```

Manifesto title:

```ts
"非托管。透明。长期主义。"
```

CTA title:

```ts
"看见我们如何看风险。"
```

- [ ] **Step 2: Replace monitoring data with compact safety-board copy**

Use these three summary labels:

```ts
[
  "Coinbase 安全路径",
  "cbBTC 链上路径",
  "Morpho Vault 状态"
]
```

Use these section titles:

```ts
[
  "三条风险路径",
  "我们的系统在看什么",
  "Principles & Rules",
  "风险上升时如何响应",
  "透明，不等于公开全部执行细节",
  "技术能力不能消灭风险"
]
```

- [ ] **Step 3: Run focused tests and verify GREEN for content**

Run:

```bash
npm test -- tests/home-page.test.tsx tests/monitoring-page.test.tsx
```

Expected: copy assertions pass. Component-specific visual tests may still be absent; build should still compile.

## Task 3: Upgrade Homepage Visuals and Motion

**Files:**
- Modify: `components/home/apple-hero.tsx`
- Modify: `components/home/apple-scenes.tsx`
- Modify: `components/home/apple-manifesto.tsx`
- Modify: `components/home/apple-cta.tsx`
- Modify: `app/globals.css` if shared launch-surface classes are useful.
- Test: `tests/home-page.test.tsx`

- [ ] **Step 1: Make hero feel like a launch page**

Hero requirements:

- White background.
- Centered large headline on desktop.
- CTA row remains accessible.
- Keep Morpho Vault external link.
- Replace dense metric feeling with a cleaner product object / signal ring.

- [ ] **Step 2: Turn scenes into one-idea screens**

Each scene should:

- Use `min-h-[88vh]` or similar large vertical rhythm.
- Center the main title.
- Keep body text to one short paragraph.
- Use a distinct abstract visual: filter, exit path, monitoring pulse.
- Use Framer Motion scroll transforms already available in the project.

- [ ] **Step 3: Compress manifesto**

Manifesto should:

- Show the title as a large single line or stacked line.
- Show three principles as compact labels, not long cards.
- Preserve accessibility and responsive layout.

- [ ] **Step 4: Run homepage test**

Run:

```bash
npm test -- tests/home-page.test.tsx
```

Expected: all homepage tests pass.

## Task 4: Compact Monitoring Page Presentation

**Files:**
- Modify: `components/monitoring/monitoring-summary-strip.tsx`
- Modify: `components/monitoring/monitoring-status-cards.tsx`
- Modify: `components/monitoring/monitoring-sections.tsx`
- Modify: `app/monitoring/page.tsx` only if needed for spacing.
- Test: `tests/monitoring-page.test.tsx`

- [ ] **Step 1: Reduce summary visual weight**

Keep the region accessible name `Monitoring summary`. Make the strip read like three crisp risk-path modules instead of prose cards.

- [ ] **Step 2: Tighten status cards**

Keep four status cards but make notes shorter and visually lighter. Preserve tone classes and values.

- [ ] **Step 3: Make sections scannable**

Use short rows or chips for bullets. Avoid multi-paragraph blocks. The page should be easy to update later from live data.

- [ ] **Step 4: Run monitoring test**

Run:

```bash
npm test -- tests/monitoring-page.test.tsx
```

Expected: all monitoring tests pass.

## Task 5: Verification and Browser Review

**Files:**
- No required source edits unless verification reveals issues.

- [ ] **Step 1: Run full tests**

Run:

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: Next.js build completes successfully with `/`, `/monitoring`, and monitoring API routes.

- [ ] **Step 3: Run whitespace check**

Run:

```bash
git diff --check
```

Expected: no whitespace errors.

- [ ] **Step 4: Browser-check pages**

Open:

```text
http://127.0.0.1:3000/
http://127.0.0.1:3000/monitoring
```

Expected:

- Homepage is white, sparse, scroll-driven, and not text-heavy.
- Monitoring page is compact and specific to Coinbase / cbBTC / Morpho.
- No forbidden guarantee language appears.

## Self-Review

- Spec coverage: Covered homepage narrative, monitoring narrative, visual system, content rules, technical scope, and testing.
- Placeholder scan: No TODO/TBD placeholders are present.
- Type consistency: The plan keeps existing `siteCopy` and `MonitoringSnapshot` data shapes and does not require API route changes.
