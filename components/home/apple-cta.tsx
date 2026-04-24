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
    <section className="bg-[linear-gradient(180deg,#f7faff,#ffffff)] pb-24 pt-8 md:pb-36">
      <div className="launch-container">
        <motion.div
          className="launch-surface relative overflow-hidden rounded-[3rem] px-6 py-16 md:px-12 md:py-24"
          initial={reduceMotion ? undefined : { opacity: 0, y: 26, scale: 0.985 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="launch-grid-bg pointer-events-none absolute inset-0 opacity-70" />
          <div className="pointer-events-none absolute inset-x-12 top-16 signal-line" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <p className="apple-eyebrow">Monitoring / Transparency</p>
              <h2 className="mt-6 text-balance text-5xl font-semibold leading-[0.95] text-[var(--ink)] md:text-7xl">
                {cta.title[language]}
              </h2>
              <p className="mt-7 max-w-2xl text-balance text-xl leading-9 text-[var(--ink-soft)]">
                {cta.body[language]}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/monitoring"
                className="launch-button-dark"
              >
                {hero.primaryCta[language]}
              </Link>
              <Link
                href={morphoVaultUrl}
                target="_blank"
                rel="noreferrer"
                className="launch-button-light"
              >
                {hero.secondaryCta[language]}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
