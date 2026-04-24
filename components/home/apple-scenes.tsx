"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";

type AppleScenesProps = {
  language: SiteLanguage;
};

export function AppleScenes({ language }: AppleScenesProps) {
  return (
    <section aria-label="Homepage narrative sequence">
      {siteCopy.home.scenes.map((scene, index) => (
        <Scene key={scene.kicker} language={language} index={index} scene={scene} />
      ))}
    </section>
  );
}

type SceneProps = {
  language: SiteLanguage;
  index: number;
  scene: (typeof siteCopy.home.scenes)[number];
};

function Scene({ language, index, scene }: SceneProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.16, 0.74, 1], [0, 1, 1, 0.18]);
  const contentY = useTransform(scrollYProgress, [0, 0.2, 0.78, 1], [72, 0, -8, -56]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.22, 0.76, 1], [0, 1, 0.92, 0.12]);
  const visualY = useTransform(scrollYProgress, [0, 0.24, 0.8, 1], [88, 0, -28, -72]);
  const ruleScale = useTransform(scrollYProgress, [0.08, 0.42, 0.82], [0.18, 1, 0.72]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.08, 0.26, 0.18, 0]);

  return (
    <section
      ref={ref}
      className={reduceMotion ? "relative py-20 md:py-28" : "relative h-[135vh]"}
    >
      <div
        className={
          reduceMotion
            ? "relative flex items-center overflow-hidden"
            : "sticky top-0 flex h-screen items-center overflow-hidden"
        }
      >
        <motion.div
          style={reduceMotion ? undefined : { opacity: glowOpacity }}
          className="pointer-events-none absolute right-[-12rem] top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(69,127,255,0.16),transparent_68%)] blur-3xl"
        />
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.8fr)] lg:items-center">
          <motion.div
            style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
            className="space-y-7"
          >
            <p className="apple-eyebrow">{scene.kicker}</p>
            <h2 className="max-w-4xl text-balance text-5xl font-semibold text-[#0b1220] md:text-7xl lg:text-[5.6rem] lg:leading-[0.94]">
              {scene.title[language]}
            </h2>
            <p className="max-w-2xl text-xl leading-9 text-[#4b5563] md:text-2xl md:leading-10">
              {scene.body[language]}
            </p>
          </motion.div>

          <motion.div
            style={reduceMotion ? undefined : { opacity: visualOpacity, y: visualY }}
            className="relative mx-auto hidden w-full max-w-[34rem] lg:block"
          >
            <div className="relative min-h-[30rem]">
              <div className="absolute inset-x-0 top-1/2 h-px bg-[#d9dee8]" />
              <motion.div
                style={reduceMotion ? undefined : { scaleX: ruleScale }}
                className="absolute inset-x-0 top-1/2 h-px origin-left bg-[#3568d4]"
              />
              <div className="absolute right-0 top-0 font-mono text-[11rem] font-semibold leading-none text-[#eef2f8]">
                0{index + 1}
              </div>
              <div className="absolute left-0 top-8 h-56 w-56 rounded-full border border-[#d9dee8]" />
              <div className="absolute left-16 top-24 h-24 w-24 rounded-full bg-[#3568d4]/10" />
              <div className="absolute left-[10.5rem] top-[8.15rem] h-4 w-4 rounded-full bg-[#3568d4] shadow-[0_0_0_12px_rgba(53,104,212,0.1)]" />
              <div className="absolute bottom-10 right-0 max-w-sm">
                <p className="text-xs font-medium uppercase text-[#8d98a8]">
                  {scene.panelTitle[language]}
                </p>
                <p className="mt-4 text-lg leading-8 text-[#4b5563]">{scene.panelBody[language]}</p>
              </div>
              <div className="absolute bottom-[7.5rem] left-0 grid w-44 gap-3 font-mono text-[0.68rem] uppercase text-[#9aa4b4]">
                <span>Boundary</span>
                <span>Liquidity</span>
                <span>Exit Path</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
