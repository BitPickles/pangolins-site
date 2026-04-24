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
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(47,128,255,0.08),transparent_68%)]" />
      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl gap-12 px-6 pb-18 pt-14 md:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] md:items-center md:pb-24 md:pt-20">
        <motion.div
          className="space-y-9"
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase text-[#6e7787]">{hero.eyebrow}</p>
            <h1 className="max-w-5xl text-balance text-5xl font-semibold text-[#0b0f17] md:text-7xl lg:text-[5.8rem]">
              {hero.title[language]}
            </h1>
            <p className="max-w-2xl text-xl font-medium leading-8 text-[#2d66d9] md:text-2xl">
              {hero.support[language]}
            </p>
            <p className="max-w-[38rem] text-lg leading-8 text-[#5f6673] md:text-xl">
              {hero.body[language]}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/monitoring"
              aria-label="View Monitoring"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#111827] px-6 text-sm font-medium text-white transition hover:bg-[#1f2937]"
            >
              {hero.primaryCta[language]}
            </Link>
            <Link
              href={morphoVaultUrl}
              aria-label="Morpho Vault"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d9dce3] bg-white px-6 text-sm font-medium text-[#111827] transition hover:border-[#aab4c7] hover:bg-[#f7f8fa]"
              target="_blank"
              rel="noreferrer"
            >
              {hero.secondaryCta[language]}
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto flex w-full max-w-[34rem] items-center justify-center"
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : 0.1 }}
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(83,142,255,0.2),transparent_62%)] blur-3xl" />
          <div className="absolute bottom-6 h-10 w-[68%] rounded-full bg-[rgba(15,23,42,0.08)] blur-2xl" />
          <div className="relative w-[18rem] md:w-[25rem] lg:w-[28rem]">
            <BrandMark />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
