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
    <section className="bg-white pb-24 pt-2 md:pb-36">
      <motion.div
        className="relative mx-auto max-w-7xl overflow-hidden border-t border-[#dfe4ec] px-6 pt-14 md:pt-20"
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-none absolute right-[-16rem] top-[-14rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(69,127,255,0.13),transparent_67%)] blur-2xl" />
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl space-y-6">
            <p className="apple-eyebrow">
              Monitoring / Transparency
            </p>
            <h2 className="text-balance text-5xl font-semibold text-[#0b1220] md:text-7xl md:leading-[0.98]">
              {cta.title[language]}
            </h2>
            <p className="max-w-2xl text-xl leading-9 text-[#4b5563]">{cta.body[language]}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:pb-2">
            <Link
              href="/monitoring"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#111827] px-6 text-sm font-medium text-white transition hover:bg-[#263244]"
            >
              {hero.primaryCta[language]}
            </Link>
            <Link
              href={morphoVaultUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d5dce7] bg-white px-6 text-sm font-medium text-[#111827] transition hover:border-[#aeb8c8] hover:bg-[#f7f9fc]"
            >
              {hero.secondaryCta[language]}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
