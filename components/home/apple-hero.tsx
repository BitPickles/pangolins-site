"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BrandMark } from "@/components/brand-mark";
import { morphoVaultUrl, siteCopy, type SiteLanguage } from "@/lib/content/site-copy";

type AppleHeroProps = {
  language: SiteLanguage;
};

export function AppleHero({ language }: AppleHeroProps) {
  const reduceMotion = useReducedMotion();
  const hero = siteCopy.home.hero;

  return (
    <section
      data-testid="launch-hero"
      className="relative isolate -mt-14 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_100%)] pt-14"
    >
      <div className="launch-grid-bg pointer-events-none absolute inset-x-0 top-12 h-[42rem]" />
      <div className="pointer-events-none absolute right-[-18rem] top-16 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(47,128,255,0.17),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute left-[-18rem] bottom-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(87,119,255,0.08),transparent_70%)] blur-3xl" />

      <div className="launch-container grid min-h-[calc(100vh-2rem)] gap-10 pb-16 pt-24 md:pb-24 md:pt-28 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="apple-eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-6 text-balance text-6xl font-semibold leading-[0.9] text-[var(--ink)] md:text-8xl lg:text-[7.1rem]">
            {hero.title[language]}
          </h1>
          <p className="mt-7 max-w-2xl text-balance text-xl leading-9 text-[var(--ink-soft)] md:text-2xl md:leading-10">
            {hero.body[language]}
          </p>
          <p className="mt-5 inline-flex rounded-full bg-[rgba(47,128,255,0.08)] px-4 py-2 font-mono text-xs uppercase text-[#2f80ff]">
            {hero.support[language]}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/monitoring"
              aria-label="View Monitoring"
              className="launch-button-dark"
            >
              {hero.primaryCta[language]}
            </Link>
            <Link
              href={morphoVaultUrl}
              aria-label="Morpho Vault"
              className="launch-button-light"
              target="_blank"
              rel="noreferrer"
            >
              {hero.secondaryCta[language]}
            </Link>
          </div>
        </motion.div>

        <motion.div
          data-testid="hero-signal-panel"
          className="launch-surface relative min-h-[30rem] overflow-hidden rounded-[2.4rem] p-5 md:min-h-[34rem] md:rounded-[3rem] md:p-7"
          initial={reduceMotion ? undefined : { opacity: 0, y: 30, scale: 0.985 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(47,128,255,0.18),transparent_48%)]" />
          <div className="absolute inset-x-8 top-24 signal-line" />
          <div className="absolute inset-x-8 bottom-24 signal-line opacity-60" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase text-[#7a8797]">Risk Engine</p>
              <p className="mt-1 text-sm font-semibold text-[#07111f]">Pangolins Curator Framework</p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-mono text-[10px] uppercase text-emerald-700">
              Normal
            </span>
          </div>

          <div className="relative mx-auto mt-14 flex h-72 max-w-[28rem] items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#dfe8f5]" />
            <div className="absolute inset-10 rounded-full border border-[#dfe8f5]" />
            <div className="absolute inset-20 rounded-full border border-[#2f80ff]/30" />
            <motion.div
              className="absolute inset-4 rounded-full border border-[#2f80ff]/35 border-r-transparent"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-16 rounded-full border border-[#2f80ff]/45 border-l-transparent"
              animate={reduceMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            />
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-[0_28px_80px_rgba(47,128,255,0.18)]">
              <BrandMark className="w-20" />
            </div>
            {["Market", "Collateral", "Liquidity"].map((label, index) => (
              <span
                key={label}
                className={[
                  "launch-pill absolute px-3 py-2 font-mono text-[10px] uppercase text-[#59677a]",
                  index === 0 ? "left-2 top-14" : "",
                  index === 1 ? "right-0 top-24" : "",
                  index === 2 ? "bottom-10 left-1/2 -translate-x-1/2" : ""
                ].join(" ")}
              >
                {label}
              </span>
            ))}
          </div>

          <div
            data-testid="launch-metrics-strip"
            className="relative mt-8 grid gap-2 rounded-[1.5rem] border border-[#e2e8f0] bg-white/74 p-2 md:grid-cols-3"
          >
            {hero.metrics.map((metric) => (
              <div key={metric.label} className="rounded-[1.15rem] bg-[#f8fbff] px-4 py-3">
                <p className="font-mono text-[10px] uppercase text-[#8a96a8]">{metric.label}</p>
                <p className="mt-1 text-sm font-semibold text-[#07111f]">{metric.value[language]}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
