# Pangolins Apple Launch Copy Upgrade Design

## Goal

Upgrade the Pangolins two-page site from a text-heavy risk-management explanation into an Apple-style launch experience: sparse copy, strong visual hierarchy, white background, refined motion, and a sharper technology-forward brand feeling.

The copy should reference the recovered Pangolins foundation without copying it wholesale. The retained core ideas are:

- `管理风险，而非资金`
- `非托管`
- `透明`
- `技术驱动风控`
- `安全不是一次性的审计`

## Direction

The selected direction is **A / Apple Launch**.

Homepage:

- Acts as the brand launch page.
- Uses one idea per screen.
- Uses short, memorable lines instead of explanatory paragraphs.
- Lets visual systems, motion, spacing, and structure carry most of the sophistication.
- Keeps the default language Chinese with English available.

Monitoring page:

- Acts as the safety and transparency page.
- Stays compact and practical.
- Focuses on Coinbase, cbBTC, and the Morpho vault risk path.
- Uses status cards, signal rows, and short rules instead of long prose.

## Homepage Narrative

### Screen 1: Positioning

Primary line:

> 管理风险，而非资金

Support:

> Pangolins 是基于 Morpho 的链上风险管理层，当前聚焦 USDC / cbBTC 风格的保守型策略。

Purpose:

- Establish the brand in five seconds.
- Preserve the old site's strongest slogan.
- Avoid overexplaining.

### Screen 2: Complexity Filter

Primary line:

> 让 DeFi 的复杂性，停在系统里。

Support:

> 用户看到的是清晰策略；系统处理的是协议、流动性、抵押路径与执行风险。

Purpose:

- Upgrade the old line `在复杂的 DeFi 世界里，构建简单的参与方式`.
- Introduce a new, more ownable Pangolins concept.
- Create room for a visual risk-filter animation.

### Screen 3: Defensive End

Primary line:

> 不是追逐更高收益，而是保留退出能力。

Support:

> 保守层的价值，不在于多几个点，而在于风险上升时仍有纪律和路径。

Purpose:

- Clarify this is not a high-APY vault pitch.
- Reinforce liquidity and discipline.

### Screen 4: Continuous Security

Primary line:

> 安全不是一次性的审计。

Support:

> 它是贯穿策略生命周期的监控、预警、复核与响应。

Purpose:

- Preserve a recovered old-site sentence.
- Move from static trust to active monitoring.

### Screen 5: Principles

Primary line:

> 非托管。透明。长期主义。

Support:

> 资金不由 Pangolins 托管；风险必须被说明；策略不为短期热点改变边界。

Purpose:

- Compress the old `非托管 / 透明 / 共赢` section.
- Avoid a long about-us block.

### Final CTA

Primary line:

> 看见我们如何看风险。

Actions:

- `查看监控与透明度`
- `在 Morpho 查看 Vault`

Purpose:

- Lead naturally into the monitoring page.
- Keep user trust-building progressive.

## Monitoring Narrative

The monitoring page should remain readable and compact.

Top summary:

- `Vault Status`
- `Risk Mode`
- `Market Focus`
- `Monitoring Stack`

Risk path modules:

- `Coinbase`: custody and operational continuity are explicit dependencies, not guarantees.
- `cbBTC`: wrapped BTC path, mint/redeem assumptions, onchain movement, and collateral quality are watched.
- `Morpho Vault`: market allocation, liquidity recovery, and curator discipline are watched.

Principles:

- `风险先被说明`
- `流动性优先`
- `不公开削弱执行质量的触发细节`
- `监控提高响应速度，不消灭风险`

Risk statement:

> 技术能力不能消灭风险，只能更早识别风险。

## Visual System

Homepage should use:

- White background.
- Black / graphite typography.
- Pangolins blue only as signal color.
- Large whitespace.
- Large, centered launch-style headings.
- Abstract risk-filter visuals.
- Scroll-driven reveal, scale, blur, and line-drawing motion.

Homepage should avoid:

- Dense cards.
- Long body paragraphs.
- Dark dashboard aesthetics.
- Generic DeFi neon.
- Marketing APY language.

Monitoring page should use:

- White or very light background.
- Thin borders and low-contrast panels.
- Status lights.
- Compact cards.
- Short rows and labels.
- Minimal motion.

## Content Rules

Required:

- Default Chinese.
- English switch remains.
- Old Pangolins philosophy is visible but rewritten.
- Coinbase / cbBTC wording must stay careful and non-guaranteeing.
- Morpho vault link remains available.

Forbidden:

- `零风险`
- `绝对安全`
- `稳赚`
- `一定能撤出`
- `一定能抢跑`
- `Coinbase 担保 = 无风险`
- `cbBTC = 原生 BTC 无差别风险`

## Technical Scope

Modify:

- `lib/content/site-copy.ts`
- `lib/content/monitoring-data.ts`
- `components/home/apple-hero.tsx`
- `components/home/apple-scenes.tsx`
- `components/home/apple-manifesto.tsx`
- `components/home/apple-cta.tsx`
- Monitoring components only if needed for compact presentation.
- Tests that assert the intended copy and links.

Do not modify:

- API route structure.
- Vault address or Morpho link.
- Language-toggle behavior.
- Project framework.

## Testing

Required checks:

- `npm test`
- `npm run build`
- `git diff --check`
- Browser check on `http://127.0.0.1:3000/`
- Browser check on `http://127.0.0.1:3000/monitoring`

## Acceptance Criteria

- Homepage reads like a launch page, not a whitepaper.
- Each homepage section has one clear idea.
- Chinese homepage copy is materially shorter than the current recovered-copy version.
- Old Pangolins ideas are recognizable but not copied verbatim except for key slogans.
- Monitoring page remains practical, compact, and specific to Coinbase / cbBTC / Morpho vault safety.
- No forbidden guarantee language appears.
- Tests and production build pass.
