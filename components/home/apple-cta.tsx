"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { morphoVaultUrl, siteCopy, type SiteLanguage } from "@/lib/content/site-copy";

type AppleCtaProps = {
  language: SiteLanguage;
};

export function AppleCta({ language }: AppleCtaProps) {
  const reduceMotion = useReducedMotion();
  const cta = siteCopy.home.cta;
  const hero = siteCopy.home.hero;

  return (
    <section className="bg-white pb-24 pt-4 md:pb-36">
      <motion.div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-[#e2e8f0] bg-[linear-gradient(145deg,#ffffff,#f3f8ff)] px-6 py-16 text-center shadow-[0_40px_130px_rgba(15,23,42,0.08)] md:px-10 md:py-24"
        initial={reduceMotion ? undefined : { opacity: 0, y: 26, scale: 0.98 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,128,255,0.17),transparent_68%)] blur-2xl" />
        <div className="pointer-events-none absolute inset-x-12 top-16 h-px bg-[linear-gradient(90deg,transparent,#2f80ff,transparent)]" />

        <div className="relative mx-auto max-w-4xl">
          <p className="apple-eyebrow">Monitoring / Transparency</p>
          <h2 className="mt-6 text-balance text-5xl font-semibold leading-[0.96] text-[#07111f] md:text-7xl">
            {cta.title[language]}
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-balance text-xl leading-9 text-[#526071]">
            {cta.body[language]}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/monitoring"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#2f80ff] px-6 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(47,128,255,0.28)] transition hover:bg-[#1f6fee]"
            >
              {hero.primaryCta[language]}
            </Link>
            <Link
              href={morphoVaultUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d5dce7] bg-white px-6 text-sm font-semibold text-[#111827] transition hover:border-[#aeb8c8] hover:bg-[#f7faff]"
            >
              {hero.secondaryCta[language]}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
