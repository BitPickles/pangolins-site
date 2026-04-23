"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";
import { SectionFrame } from "@/components/home/section-frame";

type CapabilityGridProps = {
  language: SiteLanguage;
};

export function CapabilityGrid({ language }: CapabilityGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <SectionFrame
      id="core-capabilities"
      index="05"
      label={siteCopy.capabilities.label}
      language={language}
      title={siteCopy.capabilities.title}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {siteCopy.capabilities.items.map((item, index) => (
          <motion.article
            key={item.kicker}
            className="group rounded-[1.5rem] border border-slate-900/8 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-[color:var(--line-strong)] hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
            initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: reduceMotion ? 0 : index * 0.08 }}
          >
            <p className="font-mono text-xs tracking-[0.28em] text-[#9ba6b6]">
              {item.kicker}
            </p>
            <h3 className="mt-5 font-display text-2xl text-[#0f172a]">
              {item.title[language]}
            </h3>
            <p className="mt-4 text-base leading-7 text-[#5c697b]">
              {item.body[language]}
            </p>
          </motion.article>
        ))}
      </div>
    </SectionFrame>
  );
}
