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
    <section className="relative isolate overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,rgba(47,128,255,0.14),transparent_66%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_top,#f7faff,transparent)]" />

      <div className="relative mx-auto flex min-h-[94vh] max-w-7xl flex-col items-center justify-center px-6 pb-20 pt-16 text-center md:pb-28 md:pt-20">
        <motion.div
          className="relative mb-10 flex h-48 w-48 items-center justify-center md:mb-14 md:h-64 md:w-64"
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.86 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(47,128,255,0.18),transparent_68%)] blur-2xl" />
          <div className="absolute inset-5 rounded-full border border-[#d7e6ff]" />
          <div className="absolute inset-11 rounded-full border border-[#e8eef8]" />
          <motion.div
            className="absolute inset-0 rounded-full border border-[#2f80ff]/45"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          />
          <div className="relative w-32 md:w-40">
            <BrandMark />
          </div>
        </motion.div>

        <motion.div
          className="flex max-w-5xl flex-col items-center"
          initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <p className="text-xs font-semibold uppercase text-[#687386]">{hero.eyebrow}</p>
          <h1 className="mt-6 text-balance text-6xl font-semibold leading-[0.92] text-[#07111f] md:text-8xl lg:text-[7.4rem]">
            {hero.title[language]}
          </h1>
          <p className="mt-6 max-w-3xl text-balance text-lg leading-8 text-[#526071] md:text-2xl md:leading-10">
            {hero.body[language]}
          </p>
          <p className="mt-4 font-mono text-xs uppercase text-[#2f80ff] md:text-sm">
            {hero.support[language]}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/monitoring"
              aria-label="View Monitoring"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#2f80ff] px-6 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(47,128,255,0.28)] transition hover:bg-[#1f6fee]"
            >
              {hero.primaryCta[language]}
            </Link>
            <Link
              href={morphoVaultUrl}
              aria-label="Morpho Vault"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d9e1ec] bg-white px-6 text-sm font-semibold text-[#0f172a] transition hover:border-[#b9c7dc] hover:bg-[#f7faff]"
              target="_blank"
              rel="noreferrer"
            >
              {hero.secondaryCta[language]}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {hero.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#e2e8f0] bg-white/70 px-3 py-1.5 font-mono text-[11px] uppercase text-[#6f7b8d] backdrop-blur"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
