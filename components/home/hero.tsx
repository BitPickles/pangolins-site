"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  getSupportLanguage,
  morphoVaultUrl,
  siteCopy,
  type SiteLanguage
} from "@/lib/content/site-copy";

type HeroProps = {
  language: SiteLanguage;
};

export function Hero({ language }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const supportLanguage = getSupportLanguage(language);

  return (
    <section className="relative overflow-hidden border-b border-[color:var(--line)]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(106,149,232,0.55),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(106,149,232,0.16),transparent_42%)]" />
      <div className="absolute right-0 top-16 h-56 w-56 rounded-full bg-[rgba(106,149,232,0.12)] blur-3xl" />
      <div className="absolute left-[8%] top-24 h-72 w-72 rounded-full border border-slate-900/6 opacity-80" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-18 md:grid-cols-[minmax(0,1fr)_320px] md:items-end md:py-24">
        <motion.div
          className="space-y-8"
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="space-y-4">
            <p className="dossier-label">{siteCopy.hero.eyebrow}</p>
            <h1 className="max-w-5xl font-display text-5xl leading-none tracking-[-0.05em] text-balance text-[#0f172a] md:text-7xl">
              {siteCopy.hero.title[language]}
            </h1>
            <p className="text-base uppercase tracking-[0.24em] text-[color:var(--accent-strong)] md:text-lg">
              {siteCopy.hero.support[language]}
            </p>
            <p className="max-w-3xl text-lg leading-8 text-[#526074]">
              {siteCopy.hero.body[language]}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/monitoring"
              aria-label="View Monitoring"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[#101828] px-6 text-sm font-medium text-white transition hover:bg-[#1f3258]"
            >
              {siteCopy.hero.primaryCta[language]}
            </Link>
            <Link
              href={morphoVaultUrl}
              aria-label="Morpho Vault"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-900/10 bg-white/80 px-6 text-sm text-[#243349] transition hover:border-[color:var(--line-strong)] hover:bg-[#f1f5fb]"
              target="_blank"
              rel="noreferrer"
            >
              {siteCopy.hero.secondaryCta[language]}
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            {siteCopy.hero.tags.map((tag, index) => (
              <motion.span
                key={tag}
                className="rounded-full border border-slate-900/8 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#6b7687]"
                initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.12 * index }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="grid gap-3 border-t border-slate-900/8 pt-6 md:grid-cols-3">
            {siteCopy.hero.metrics.map((metric, index) => (
              <motion.article
                key={metric.label}
                className="rounded-[1.4rem] border border-slate-900/8 bg-white/80 px-4 py-4"
                initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.18 + index * 0.06 }}
              >
                <p className="dossier-label">{metric.label}</p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f172a]">
                  {metric.value[language]}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#6a7485]">{metric.note[language]}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.aside
          className="dossier-panel rounded-[2rem] p-6 md:p-8"
          initial={reduceMotion ? undefined : { opacity: 0, x: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: reduceMotion ? 0 : 0.12 }}
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="dossier-label">Risk Brief</p>
              <p className="font-display text-2xl leading-tight text-[#0f172a]">
                {siteCopy.hero.summary[language]}
              </p>
              <p className="text-sm leading-7 text-[#768194]">
                {siteCopy.hero.summary[supportLanguage]}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-900/8 bg-[#f7f9fc] p-4">
              <p className="dossier-label">Dossier Note</p>
              <p className="mt-3 text-sm leading-7 text-[#647083]">
                {language === "zh"
                  ? "我们刻意不把首页做成收益面板。首页的任务是先解释产品边界，再引导你去看当前风险姿态。"
                  : "The home page is intentionally not a yield dashboard. It defines the product boundary first, then leads into current risk posture."}
              </p>
            </div>
            <dl className="space-y-4 border-t border-slate-900/8 pt-5 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-[#7a8698]">Posture</dt>
                <dd className="font-mono uppercase tracking-[0.22em] text-[color:var(--accent-strong)]">
                  Defensive
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-[#7a8698]">Constraint</dt>
                <dd className="font-mono uppercase tracking-[0.22em] text-[#1f2937]">
                  Liquidity First
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-[#7a8698]">Mode</dt>
                <dd className="font-mono uppercase tracking-[0.22em] text-[#1f2937]">
                  Monitoring
                </dd>
              </div>
            </dl>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
