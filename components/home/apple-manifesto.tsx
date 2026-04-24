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
    <section className="relative overflow-hidden bg-white py-28 md:py-44">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[#e2e8f0]" />
      <motion.div
        className="relative mx-auto max-w-7xl px-6"
        initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="apple-eyebrow">Product Thesis</p>
          <h2 className="mt-6 text-balance text-5xl font-semibold leading-[0.96] text-[#07111f] md:text-7xl lg:text-[5.8rem]">
            {manifesto.title[language]}
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-balance text-xl leading-9 text-[#526071] md:text-2xl md:leading-10">
            {manifesto.body[language]}
          </p>
        </div>

        <div className="mt-16 grid gap-3 md:grid-cols-3">
          {manifesto.pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title.en}
              className="rounded-[2rem] border border-[#e2e8f0] bg-white/78 px-6 py-6 text-center shadow-[0_24px_80px_rgba(15,23,42,0.04)] backdrop-blur"
              initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <p className="font-mono text-[11px] uppercase text-[#2f80ff]">
                0{index + 1}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-[#07111f]">
                {pillar.title[language]}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#647083]">{pillar.body[language]}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
