"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";

type AppleManifestoProps = {
  language: SiteLanguage;
};

export function AppleManifesto({ language }: AppleManifestoProps) {
  const reduceMotion = useReducedMotion();
  const manifesto = siteCopy.home.manifesto;

  return (
    <section className="relative overflow-hidden bg-[#f7faff] py-24 md:py-36">
      <div className="launch-container">
        <motion.div
          className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
          initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="apple-eyebrow">Product Thesis</p>
            <h2 className="mt-6 text-balance text-5xl font-semibold leading-[0.96] text-[var(--ink)] md:text-7xl">
              {manifesto.title[language]}
            </h2>
          </div>
          <p className="max-w-3xl text-balance text-xl leading-9 text-[var(--ink-soft)] md:text-2xl md:leading-10">
            {manifesto.body[language]}
          </p>
        </motion.div>

        <div
          data-testid="principle-band"
          className="launch-surface mt-14 grid overflow-hidden rounded-[2.5rem] md:grid-cols-3"
        >
          {manifesto.pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title.en}
              className="relative min-h-56 border-b border-[#e2e8f0] p-7 md:border-b-0 md:border-r md:last:border-r-0"
              initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <p className="font-mono text-[11px] uppercase text-[#2f80ff]">0{index + 1}</p>
              <h3 className="mt-12 text-3xl font-semibold text-[var(--ink)]">
                {pillar.title[language]}
              </h3>
              <p className="mt-4 max-w-xs text-sm leading-6 text-[#5f6c7e]">{pillar.body[language]}</p>
              <div className="absolute bottom-7 left-7 h-1.5 w-12 rounded-full bg-[#2f80ff]" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
