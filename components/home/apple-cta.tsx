"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { TitleLines } from "@/components/title-lines";
import { morphoVaultUrl, siteCopy, type SiteLanguage } from "@/lib/content/site-copy";

type AppleCtaProps = {
  language: SiteLanguage;
};

export function AppleCta({ language }: AppleCtaProps) {
  const reduceMotion = useReducedMotion();
  const cta = siteCopy.home.cta;
  const hero = siteCopy.home.hero;
  const previewNodes: Record<SiteLanguage, readonly string[]> = {
    zh: ["当前状态", "风险路径", "响应边界"],
    en: ["Current state", "Risk path", "Response boundary"]
  };
  const previewCopy: Record<
    SiteLanguage,
    {
      eyebrow: string;
      title: string;
      badge: string;
      note: string;
      publicLabel: string;
      privateLabel: string;
      privateItems: readonly string[];
    }
  > = {
    zh: {
      eyebrow: "公开层",
      title: "Monitoring",
      badge: "正常",
      note: "公开纪律、状态与边界；保留会影响执行质量的细节。",
      publicLabel: "公开",
      privateLabel: "保护",
      privateItems: ["阈值", "执行时序"]
    },
    en: {
      eyebrow: "Public Layer",
      title: "Monitoring",
      badge: "Normal",
      note: "Discipline, state, and boundaries are public; execution-sensitive details stay protected.",
      publicLabel: "Public",
      privateLabel: "Protected",
      privateItems: ["Thresholds", "Execution timing"]
    }
  };

  return (
    <section className="bg-[linear-gradient(180deg,#f7faff,#ffffff)] pb-24 pt-6 md:pb-36">
      <div className="launch-container">
        <motion.div
          className="launch-surface relative overflow-hidden rounded-[3rem] px-6 py-12 md:px-12 md:py-18"
          initial={reduceMotion ? false : { y: 26, scale: 0.985 }}
          whileInView={reduceMotion ? undefined : { y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="launch-grid-bg pointer-events-none absolute inset-0 opacity-45" />
          <div className="pointer-events-none absolute -right-28 top-8 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(47,128,255,0.13),transparent_66%)] blur-3xl" />
          <div className="pointer-events-none absolute left-12 top-16 hidden h-px w-[42%] bg-[linear-gradient(90deg,rgba(47,128,255,0.5),transparent)] md:block" />

          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="apple-eyebrow">Monitoring / Transparency</p>
              <h2 className="mt-6 text-balance text-[clamp(3rem,8vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--ink)] md:text-[clamp(4.4rem,5.9vw,5.7rem)]">
                <TitleLines
                  text={cta.title[language]}
                  lines={cta.titleLines[language]}
                  lineTestId="cta-title-line"
                />
              </h2>
              <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-[var(--ink-soft)] md:text-xl md:leading-9">
                {cta.body[language]}
              </p>
              <div
                data-testid="cta-action-dock"
                className="mt-9 flex flex-col gap-3 rounded-[2rem] border border-[#dfe8f4] bg-white/68 p-2 shadow-[0_20px_60px_rgba(15,23,42,0.045)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
              >
                <Link
                  href="/monitoring"
                  className="launch-button-dark w-full max-w-full sm:w-auto"
                >
                  {hero.primaryCta[language]}
                </Link>
                <Link
                  href={morphoVaultUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="launch-button-light w-full max-w-full sm:w-auto"
                >
                  {hero.secondaryCta[language]}
                </Link>
              </div>
            </div>

            <div>
              <div
                data-testid="monitoring-preview-panel"
                className="relative overflow-hidden rounded-[2.5rem] border border-[#dfe8f4] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(245,250,255,0.76))] p-5 shadow-[0_28px_90px_rgba(15,23,42,0.065)] backdrop-blur-xl md:p-6"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(47,128,255,0.14),transparent_68%)]" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a96a7]">
                      {previewCopy[language].eyebrow}
                    </p>
                    <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#07111f]">
                      {previewCopy[language].title}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 font-mono text-[10px] uppercase text-emerald-700 shadow-[0_10px_30px_rgba(16,185,129,0.08)]">
                    {previewCopy[language].badge}
                  </span>
                </div>

                <div className="relative mt-8 rounded-[2rem] border border-[#e4edf8] bg-white/64 p-4">
                  <div className="absolute left-8 right-8 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(47,128,255,0.42),transparent)]" />
                  <div className="relative grid gap-3 sm:grid-cols-3">
                    {previewNodes[language].map((node) => (
                      <div
                        key={node}
                        data-testid="cta-monitoring-node"
                        className="rounded-[1.4rem] border border-[#e4edf8] bg-white/86 px-4 py-5 text-center shadow-[0_16px_45px_rgba(15,23,42,0.035)]"
                      >
                        <span className="mx-auto block h-2.5 w-2.5 rounded-full bg-[#2f80ff] shadow-[0_0_20px_rgba(47,128,255,0.55)]" />
                        <span className="mt-4 block text-sm font-semibold text-[#07111f]">{node}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.35rem] bg-[#07111f] px-4 py-4 text-white">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                      {previewCopy[language].publicLabel}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/72">
                      {previewCopy[language].note}
                    </p>
                  </div>
                  <div className="rounded-[1.35rem] border border-[#e4edf8] bg-white/72 px-4 py-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8a96a7]">
                      {previewCopy[language].privateLabel}
                    </p>
                    <div className="mt-4 space-y-2">
                      {previewCopy[language].privateItems.map((item) => (
                        <div key={item} className="flex items-center justify-between text-xs text-[#5f6c7e]">
                          <span>{item}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#9fb4d1]" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
