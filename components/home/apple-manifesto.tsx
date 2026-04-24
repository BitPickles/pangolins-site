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
    <section className="bg-white py-28 md:py-40">
      <motion.div
        className="mx-auto max-w-7xl px-6"
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-start">
          <div className="space-y-7">
            <p className="apple-eyebrow">Product Thesis</p>
            <h2 className="max-w-4xl text-balance text-5xl font-semibold text-[#0b1220] md:text-7xl md:leading-[0.98]">
              {manifesto.title[language]}
            </h2>
            <p className="max-w-2xl text-xl leading-9 text-[#4b5563] md:text-2xl md:leading-10">
              {manifesto.body[language]}
            </p>
          </div>
          <div className="border-t border-[#dfe4ec]">
            {manifesto.pillars.map((pillar, index) => (
              <motion.article
                key={pillar.title.en}
                className="grid gap-5 border-b border-[#dfe4ec] py-8 sm:grid-cols-[4rem_minmax(0,1fr)]"
                initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : index * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <p className="font-mono text-sm uppercase text-[#9aa4b4]">
                  0{index + 1}
                </p>
                <div>
                  <h3 className="text-2xl font-semibold text-[#111827]">
                    {pillar.title[language]}
                  </h3>
                  <p className="mt-3 text-lg leading-8 text-[#5b6472]">{pillar.body[language]}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
