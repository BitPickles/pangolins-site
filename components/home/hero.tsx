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
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(156,193,255,0.65),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(156,193,255,0.14),transparent_40%)]" />
      <div className="absolute right-0 top-16 h-56 w-56 rounded-full bg-[rgba(156,193,255,0.08)] blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-18 md:grid-cols-[minmax(0,1fr)_300px] md:items-end md:py-24">
        <motion.div
          className="space-y-8"
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="space-y-4">
            <p className="dossier-label">{siteCopy.hero.eyebrow}</p>
            <h1 className="max-w-5xl font-display text-5xl leading-none tracking-[-0.05em] text-balance text-white md:text-7xl">
              {siteCopy.hero.title[language]}
            </h1>
            <p className="text-base uppercase tracking-[0.24em] text-[color:var(--accent-strong)] md:text-lg">
              {siteCopy.hero.support[language]}
            </p>
            <p className="max-w-3xl text-lg leading-8 text-white/68">
              {siteCopy.hero.body[language]}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/monitoring"
              aria-label="View Monitoring"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-white px-6 text-sm font-medium text-slate-950 transition hover:bg-[color:var(--accent-strong)]"
            >
              {siteCopy.hero.primaryCta[language]}
            </Link>
            <Link
              href={morphoVaultUrl}
              aria-label="Morpho Vault"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 bg-white/4 px-6 text-sm text-white/86 transition hover:border-[color:var(--line-strong)] hover:bg-white/8"
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
                className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60"
                initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.12 * index }}
              >
                {tag}
              </motion.span>
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
              <p className="font-display text-2xl leading-tight text-white">
                {siteCopy.hero.summary[language]}
              </p>
              <p className="text-sm leading-7 text-white/55">
                {siteCopy.hero.summary[supportLanguage]}
              </p>
            </div>
            <dl className="space-y-4 border-t border-white/10 pt-5 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-white/46">Posture</dt>
                <dd className="font-mono uppercase tracking-[0.22em] text-[color:var(--accent-strong)]">
                  Defensive
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-white/46">Constraint</dt>
                <dd className="font-mono uppercase tracking-[0.22em] text-white/78">
                  Liquidity First
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-white/46">Mode</dt>
                <dd className="font-mono uppercase tracking-[0.22em] text-white/78">
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
