# Pangolins Dual-Page Site Design

Date: 2026-04-24
Status: Approved for planning
Default Language: Chinese
Secondary Language: English

## 1. Project Goal

Build a new standalone bilingual website for `Pangolins`, centered on a Morpho curator vault and positioned as a conservative onchain risk management product rather than a high-yield marketing site.

The site has two routes in scope:

1. `/` Home / Landing
2. `/monitoring` Monitoring / Transparency

The website must communicate one core idea:

> We are not selling yield maximization. We are selling low-risk positioning, high liquidity discipline, and serious risk management.

Chinese core line:

> 我们管理的不是资金，而是风险。

## 2. Product Positioning

`Pangolins` is presented as a Morpho-based curator strategy product occupying the conservative end of an onchain barbell strategy.

The site should consistently communicate:

- The product prioritizes liquidity over yield optimization.
- The product prefers clearer risk boundaries over aggressive APY.
- The product is designed as a low-risk parking layer for onchain capital.
- The product value comes from market selection, monitoring, execution discipline, and emergency response.

The site must not imply:

- zero risk
- guaranteed safety
- guaranteed withdrawal
- guaranteed front-running advantage
- cbBTC being equivalent to risk-free BTC exposure

## 3. Audience

Primary audiences:

- Conservative onchain capital seeking a lower-risk parking layer.
- Experienced DeFi users who want a defensive allocation sleeve.
- Institutional or semi-institutional users who care about explainability, boundaries, monitoring, and operating discipline.

## 4. Narrative Structure

The two pages have distinct responsibilities.

### 4.1 Home

The Home page answers:

- Who is Pangolins?
- What does the product do?
- Why should this product exist?
- Why is this risk posture credible?

### 4.2 Monitoring

The Monitoring page answers:

- What is the current posture of the Pangolins vault?
- Why does the strategy prefer Coinbase / cbBTC / Morpho-style clearer market structures?
- What do we monitor?
- How do we respond when risk rises?
- Why do we keep some rules private?

## 5. Confirmed Design Direction

### 5.1 Brand Direction

The brand should feel institutional, cold, disciplined, and non-promotional.

It should feel closer to:

- a risk memorandum
- a strategy dossier
- a professional monitoring interface

It should not feel like:

- a casino-like crypto landing page
- a retail trading terminal
- a flashy DeFi growth site

### 5.2 Chosen Visual Direction

The chosen visual direction is `Dossier Minimal`.

Implications:

- large negative space
- sharp information hierarchy
- restrained typography
- fine separators, grid hints, and archival labels
- the logo used as an institutional emblem rather than a mascot

### 5.3 Page Rhythm

The two pages should share one design language but different pacing.

Home:

- more editorial
- more atmospheric
- more motion-driven
- more storytelling

Monitoring:

- more structured
- more compact
- more data-readable
- less animated

## 6. Language Strategy

The website is bilingual with Chinese as default.

Language behavior:

- Primary reading language: Chinese
- Secondary assistance language: English

Do not render long Chinese and English paragraphs side by side everywhere.

Instead:

- navigation labels may be bilingual
- badges and short labels may use English
- section support text may include a short English subtitle
- hero can use a Chinese main line with an English support line

This preserves readability while keeping the site globally legible.

## 7. Route-Level Design

## 7.1 `/` Home / Landing

### Goal

Explain Pangolins as an institutional-grade conservative risk management product on Morpho.

### Primary CTA

`查看监控与透明度`

### Secondary CTA

`在 Morpho 查看 Vault`

### Recommended Hero Copy

Main headline:

`我们管理的不是资金，而是风险`

English support line:

`We manage risk before capital.`

Body copy:

`一个基于 Morpho 的 Curator 风险管理产品，服务于链上杠铃策略中最保守的一端。我们通过克制的市场选择、严格的流动性约束与持续监控，为资产提供一个更低风险、更高流动性的停泊位。`

Hero tags:

- Built on Morpho
- Conservative Risk
- High Liquidity
- Monitoring First

### Module Order

1. Hero
2. One-sentence explanation of what Pangolins does
3. Why this product should exist
4. Conservative end of the barbell strategy
5. Current strategy style and market preference
6. Core capabilities
7. Transition into Monitoring
8. Risk notice

### Home Content Intent

The page should clearly say:

- this is not an APY-chasing product
- this is a defensive capital layer
- liquidity is a hard constraint
- high quality markets with clearer risk features are preferred
- risk management is the product itself

### Home Interaction Strategy

Home is allowed to be visually richer because it is primarily static.

Approved interaction style:

- layered hero reveal
- subtle animated grid or risk-field texture in the background
- slow dossier-style section reveals on scroll
- refined hover behavior on capability cards
- restrained accent transitions on tags, rules, and structural lines

Disallowed interaction style:

- loud parallax gimmicks
- heavy 3D scenes
- cyberpunk neon
- noisy trading-terminal motion
- over-animated charts

## 7.2 `/monitoring` Monitoring / Transparency

### Goal

Combine a vault overview page, a safety logic page, and a transparency page without exposing precise execution thresholds.

The page is specifically anchored to the Pangolins Morpho vault, not a generic market safety article.

The vault reference is:

- Morpho vault: `0x1401d1271C47648AC70cBcdfA3776D4A87CE006B`
- Public app page: <https://app.morpho.org/base/vault/0x1401d1271C47648AC70cBcdfA3776D4A87CE006B/pangolins-usdc>

### Monitoring Page Layout Strategy

Upper half:

- current vault posture
- status summary
- market focus
- readability-first status cards

Lower half:

- why Pangolins prefers this risk structure
- what is monitored
- principles and rules
- abnormal response framework
- transparency boundary explanation

### Module Order

1. Page overview
2. Current vault summary
3. Safety and transparency dashboard
4. What we monitor
5. Why we prefer cbBTC-related conservative markets
6. Principles and rules
7. Abnormal response framework
8. Why not all rules are public
9. Risk statement

### Top-Level Status Cards

Recommended cards:

- Vault Status
- Risk Mode
- Market Focus
- Monitoring Stack
- Last Updated

The top area should look alive and current, but not cluttered.

### Monitoring Page Content Boundaries

The page should reveal:

- current posture
- monitoring dimensions
- risk philosophy
- operating principles
- response stages
- public safety logic

The page should not reveal:

- precise thresholds
- exact reallocation triggers
- exact withdrawal logic
- exact execution sequencing
- private operational edge

### Monitoring UI Strategy

This page should be simpler and more maintainable than Home.

Approved interaction style:

- subtle live-state glow
- lightweight chart transitions
- hover states on cards
- periodic data refresh affordances

Disallowed interaction style:

- decorative motion that reduces readability
- oversized storytelling transitions
- theatrical hero effects

## 8. Content Framework

## 8.1 Home Messaging Themes

Short-message themes to repeat:

- 真正稀缺的不是收益，而是对风险的克制。
- 高流动性，不该以高风险为代价。
- 我们不追逐最高 APY。
- 我们优先保留退出能力。
- 不是零风险，而是对风险更认真。

## 8.2 Monitoring Messaging Themes

The Monitoring page should reinforce:

- we monitor more than outcomes; we monitor how risk conditions may change
- technical capability improves reaction speed, not physical liquidity limits
- transparency does not mean publishing all triggers
- discipline matters more than marketing

## 9. Visual System

### Color

Primary palette:

- deep charcoal
- dark blue-black
- cold white
- ice blue
- muted steel accents

State colors:

- normal: green
- watch: yellow
- elevated / alert: red

### Typography

Recommended type roles:

- expressive editorial serif or sharp institutional display face for large headings
- restrained sans-serif for body copy
- monospace for operational labels, statuses, timestamps, and vault metadata

Typography behavior:

- large compressed or controlled high-impact headings
- comfortable body width
- short paragraphs
- enlarged key statements

### Layout

Recurring motifs:

- dossier labels
- thin rules and dividers
- numbered sections
- margin notes
- framed cards
- restrained grid hints

## 10. Motion Principles

Motion should communicate structure, not excitement.

Use motion for:

- staged content reveal
- hierarchy emphasis
- state changes
- subtle dashboard refresh feedback

Avoid motion for:

- spectacle
- fake activity
- trend-chasing product theater

## 11. Data and Interface Model

Home is mostly static.

Monitoring supports three content layers:

### Static

- brand messaging
- principles
- method description
- risk disclaimers

### Semi-static

- current strategy style explanation
- market preference explanation
- vault posture summary text

### Dynamic

- status labels
- system status
- updated time
- risk signal summaries
- chart slices
- recent event summaries

## 12. Recommended API Shape

Prepare mock and future live interfaces for:

- `/api/monitoring/summary`
- `/api/monitoring/liquidity`
- `/api/monitoring/risk-signals`
- `/api/monitoring/system-status`
- `/api/monitoring/recent-events`

Recommended fields:

- `status`
- `label`
- `description`
- `updatedAt`
- `severity`
- `chartData`

## 13. Content Safety Rules

The website must not claim:

- zero risk
- absolute safety
- guaranteed faster withdrawal than others
- guaranteed front-run advantage
- Coinbase support therefore no risk
- cbBTC equals native BTC with no additional risk

Safe phrasing examples:

- lower-risk posture
- liquidity-oriented
- clearer risk boundaries
- stronger credit anchor
- real-time monitoring
- forward-looking observation
- faster reaction
- higher probability of acting earlier
- layered redundancy
- disciplined execution

## 14. Source Boundaries for Public Claims

The public-facing wording may reference official information, but must stay careful and non-absolute.

Safe factual basis:

- Coinbase states cbBTC is backed 1:1 by BTC held by Coinbase and provides a proof-of-reserves page.
- Morpho documentation describes vault roles such as curator and allocator and emphasizes risk curation and liquidity management.
- Morpho emergency guidance indicates that in unsafe conditions, operators may stop new exposure and withdraw currently available liquidity, while remaining liquidity may require continued monitoring.
- Morpho risk documentation describes protocol, oracle, liquidity, and market-layer risks.

Reference links:

- Coinbase cbBTC proof of reserves: <https://www.coinbase.com/cbbtc/proof-of-reserves>
- Morpho roles: <https://legacy.docs.morpho.org/morpho-vaults/concepts/roles>
- Morpho emergency tutorial: <https://legacy.docs.morpho.org/morpho-vaults/tutorials/emergency>
- Morpho risks and overview:
  - <https://legacy.docs.morpho.org/morpho-vaults/concepts/overview/>
  - <https://legacy.docs.morpho.org/morpho-optimizers/concepts/risk-documentation/>

## 15. Technical Stack Recommendation

Recommended implementation stack:

- Next.js
- TypeScript
- Tailwind CSS
- component primitives suitable for a refined dashboard and editorial landing page

Architecture recommendation:

- static-first home page
- mock-data-backed monitoring page with an easy upgrade path to real APIs
- shared theme tokens between both routes
- route-specific motion rules

## 16. Initial Build Priorities

Phase 1 should deliver:

1. project scaffold
2. shared design system tokens
3. bilingual content model
4. Home page with final information architecture
5. Monitoring page with mock status data
6. responsive behavior
7. source-safe content phrasing

Phase 1 does not need:

- full CMS
- real monitoring backends
- production analytics
- exhaustive multilingual infrastructure beyond the agreed site-level toggle

## 17. Approval State

The following points are already decided:

- standalone new site
- project name: `Pangolins`
- bilingual site, default Chinese
- institutional brand direction
- Home visual style: `Dossier Minimal`
- overall site structure: narrative-first Home + balanced Monitoring
- Home can carry richer visual interaction
- Monitoring should remain simpler and easier to update

This spec is the source of truth for the planning phase that follows.
