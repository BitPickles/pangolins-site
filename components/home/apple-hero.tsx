"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BrandMark } from "@/components/brand-mark";
import { TitleLines } from "@/components/title-lines";
import { morphoVaultUrl, siteCopy, type SiteLanguage } from "@/lib/content/site-copy";

type AppleHeroProps = {
  language: SiteLanguage;
};

export function AppleHero({ language }: AppleHeroProps) {
  const reduceMotion = useReducedMotion();
  const hero = siteCopy.home.hero;
  const statusStrip: Record<SiteLanguage, readonly (readonly [string, string])[]> = {
    zh: [
      ["Vault 状态", "公开快照"],
      ["风险模式", "保守"],
      ["数据状态", "公开预览 / 非实时"]
    ],
    en: [
      ["Vault Status", "Public snapshot"],
      ["Risk Mode", "Conservative"],
      ["Data Mode", "Public preview / not live"]
    ]
  };
  const signalPanelCopy: Record<SiteLanguage, { label: string; title: string; nodes: readonly string[] }> = {
    zh: {
      label: "风险引擎",
      title: "Pangolins Curator 框架",
      nodes: ["市场", "抵押品", "流动性"]
    },
    en: {
      label: "Risk Engine",
      title: "Pangolins Curator Framework",
      nodes: ["Market", "Collateral", "Liquidity"]
    }
  };

  return (
    <section
      data-testid="launch-hero"
      className="relative isolate -mt-14 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_100%)] pt-14"
    >
      <div className="launch-grid-bg pointer-events-none absolute inset-x-0 top-12 h-[42rem]" />
      <div className="pointer-events-none absolute right-[-18rem] top-16 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(47,128,255,0.11),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute left-[-18rem] bottom-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(87,119,255,0.08),transparent_70%)] blur-3xl" />

      <div className="launch-container grid min-h-[calc(100vh-5rem)] gap-8 pb-14 pt-20 md:min-h-[calc(100vh-3rem)] md:gap-10 md:pb-20 md:pt-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div
          className="max-w-3xl min-w-0"
          initial={false}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="apple-eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-5 max-w-full text-[clamp(3.05rem,15vw,4.6rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-[var(--ink)] md:text-[clamp(5rem,7.2vw,6.35rem)] md:leading-[1.05] md:tracking-[-0.05em]">
            <TitleLines
              text={hero.title[language]}
              lines={hero.titleLines[language]}
              lineTestId="hero-title-line"
            />
          </h1>
          <p className="mt-6 max-w-xl break-words text-lg leading-8 text-[var(--ink-soft)] md:text-[1.5rem] md:leading-9">
            {hero.body[language]}
          </p>
          <p
            data-testid="hero-thesis-line"
            className="mt-5 inline-flex rounded-full bg-[rgba(47,128,255,0.08)] px-4 py-2 font-mono text-xs uppercase text-[#2f80ff]"
          >
            {hero.support[language]}
          </p>

          <div
            data-testid="home-vault-status-strip"
            className="mt-6 grid max-w-2xl gap-2 rounded-[1.5rem] border border-[#dbe5f3] bg-white/78 p-2 shadow-[0_18px_55px_rgba(15,23,42,0.045)] backdrop-blur-xl sm:grid-cols-3"
          >
            {statusStrip[language].map(([label, value]) => (
              <div key={label} className="min-w-0 rounded-[1.1rem] bg-[#f8fbff] px-3 py-3">
                <p className="font-mono text-[10px] uppercase text-[#7f8b9e]">{label}</p>
                <p className="mt-1 truncate text-sm font-semibold text-[#07111f]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex w-full max-w-full flex-col gap-3 sm:flex-row">
            <Link
              href="/monitoring"
              aria-label={hero.primaryCta[language]}
              className="launch-button-dark w-full max-w-full sm:w-auto"
            >
              {hero.primaryCta[language]}
            </Link>
            <Link
              href={morphoVaultUrl}
              aria-label={hero.secondaryCta[language]}
              className="launch-button-light w-full max-w-full sm:w-auto"
              target="_blank"
              rel="noreferrer"
            >
              {hero.secondaryCta[language]}
            </Link>
          </div>
        </motion.div>

        <motion.div
          data-testid="hero-signal-panel"
          className="launch-surface relative min-h-[28rem] overflow-hidden rounded-[2.4rem] border-[#cfdbec] bg-white/95 p-5 md:min-h-[32rem] md:rounded-[3rem] md:p-7"
          initial={false}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(47,128,255,0.09),transparent_46%)]" />
          <div className="absolute inset-x-8 top-24 signal-line opacity-80" />
          <div className="absolute inset-x-8 bottom-24 signal-line opacity-45" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase text-[#526071]">
                {signalPanelCopy[language].label}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#07111f]">
                {signalPanelCopy[language].title}
              </p>
            </div>
            <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 font-mono text-[10px] uppercase text-emerald-800">
              Normal
            </span>
          </div>

          <div className="relative mx-auto mt-12 flex h-64 max-w-[27rem] items-center justify-center md:h-72">
            <div className="absolute inset-0 rounded-full border border-[#cfdbea]" />
            <div className="absolute inset-10 rounded-full border border-[#d8e2ef]" />
            <div className="absolute inset-20 rounded-full border border-[#2f80ff]/38" />
            <motion.div
              className="absolute inset-4 hidden rounded-full border border-[#2f80ff]/42 border-r-transparent sm:block"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-16 hidden rounded-full border border-[#2f80ff]/48 border-l-transparent sm:block"
              animate={reduceMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            />
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-[0_28px_80px_rgba(47,128,255,0.18)]">
              <BrandMark className="w-20" />
            </div>
            {signalPanelCopy[language].nodes.map((label, index) => (
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
            className="relative mt-7 grid gap-2 rounded-[1.5rem] border border-[#d4deeb] bg-white/86 p-2 md:grid-cols-3"
          >
            {hero.metrics.map((metric) => (
              <div key={metric.label.en} className="rounded-[1.15rem] bg-[#f8fbff] px-4 py-3">
                <p className="font-mono text-[10px] uppercase text-[#64748b]">{metric.label[language]}</p>
                <p className="mt-1 text-sm font-semibold text-[#07111f]">{metric.value[language]}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
