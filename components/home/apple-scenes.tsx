"use client";

import { useRef } from "react";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { TitleLines } from "@/components/title-lines";
import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";

type AppleScenesProps = {
  language: SiteLanguage;
};

const visualLabels: Array<Record<SiteLanguage, readonly string[]>> = [
  {
    zh: ["原则", "路径", "执行"],
    en: ["Principle", "Path", "Execution"]
  },
  {
    zh: ["边界", "退出", "纪律"],
    en: ["Boundary", "Exit", "Discipline"]
  },
  {
    zh: ["监控", "预警", "响应"],
    en: ["Monitor", "Alert", "Respond"]
  }
];

const visualModes = ["filter", "route", "pulse"] as const;
const sceneVisualCopy: Record<
  SiteLanguage,
  {
    clear: string;
    reject: string;
    gateCheck: string;
    selective: string;
    boundaryFirst: string;
    checks: readonly string[];
    live: string;
    signalStack: string;
  }
> = {
  zh: {
    clear: "通过",
    reject: "拒绝",
    gateCheck: "准入检查",
    selective: "选择性进入",
    boundaryFirst: "边界优先。",
    checks: ["风险路径", "退出路径", "收益来源"],
    live: "运行",
    signalStack: "信号层"
  },
  en: {
    clear: "Clear",
    reject: "Reject",
    gateCheck: "Gate check",
    selective: "Selective",
    boundaryFirst: "Boundary first.",
    checks: ["Risk path", "Exit route", "Yield source"],
    live: "Live",
    signalStack: "Signal stack"
  }
};

export function AppleScenes({ language }: AppleScenesProps) {
  return (
    <section aria-label="Homepage narrative sequence" className="bg-[#f7faff]">
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
  const isReversedLayout = index === 2;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.18, 0.74, 1], [0, 1, 1, 0.16]);
  const contentY = useTransform(scrollYProgress, [0, 0.2, 0.78, 1], [70, 0, -8, -58]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.2, 0.78, 1], [0, 1, 0.92, 0.14]);
  const visualY = useTransform(scrollYProgress, [0, 0.26, 0.8, 1], [56, 0, -16, -46]);
  const lineScale = useTransform(scrollYProgress, [0.14, 0.48, 0.84], [0.08, 1, 0.72]);

  return (
    <section
      ref={ref}
      className={reduceMotion ? "relative py-20 md:py-32" : "relative py-20 lg:h-[118vh] lg:py-0"}
    >
      <div
        className={
          reduceMotion
            ? "relative flex items-center overflow-hidden"
            : "relative flex items-center overflow-hidden lg:sticky lg:top-0 lg:h-screen"
        }
      >
        <SceneAtmosphere
          index={index}
          opacity={reduceMotion ? undefined : visualOpacity}
          lineScale={reduceMotion ? undefined : lineScale}
        />
        <div className="launch-container grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div
            style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
            className={[
              "max-w-3xl",
              isReversedLayout ? "lg:order-2 lg:ml-auto" : ""
            ].join(" ")}
          >
            <p className="apple-eyebrow">{scene.kicker}</p>
            <h2
              data-testid={`scene-title-${index}`}
              className="mt-5 max-w-full break-words text-balance text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--ink)] md:text-6xl lg:text-[4.45rem]"
            >
              <TitleLines
                text={scene.title[language]}
                lines={scene.titleLines[language]}
                lineTestId={`scene-title-line-${index}`}
              />
            </h2>
            <p className="mt-7 max-w-2xl text-balance text-xl leading-9 text-[var(--ink-soft)] md:text-2xl md:leading-10">
              {scene.body[language]}
            </p>
          </motion.div>

          <motion.div
            style={reduceMotion ? undefined : { opacity: visualOpacity, y: visualY }}
            className={["relative", isReversedLayout ? "lg:order-1" : ""].join(" ")}
          >
            <SceneVisual
              index={index}
              mode={visualModes[index]}
              language={language}
              labels={visualLabels[index][language]}
              panelTitle={scene.panelTitle[language]}
              panelBody={scene.panelBody[language]}
              lineScale={reduceMotion ? undefined : lineScale}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type SceneAtmosphereProps = {
  index: number;
  opacity: MotionValue<number> | undefined;
  lineScale: MotionValue<number> | undefined;
};

function SceneAtmosphere({ index, opacity, lineScale }: SceneAtmosphereProps) {
  const atmosphere = [
    {
      orb: "left-[8%] top-[18%] h-[26rem] w-[26rem] bg-[radial-gradient(circle,rgba(47,128,255,0.12),transparent_68%)]",
      line: "left-[12%] top-[28%] w-[46%] rotate-[-8deg]",
      grid: "right-[6%] top-[10%]"
    },
    {
      orb: "right-[10%] bottom-[14%] h-[30rem] w-[30rem] bg-[radial-gradient(circle,rgba(7,17,31,0.08),transparent_70%)]",
      line: "right-[9%] top-[46%] w-[38%] rotate-[18deg]",
      grid: "left-[5%] bottom-[8%]"
    },
    {
      orb: "left-[32%] top-[12%] h-[34rem] w-[34rem] bg-[radial-gradient(circle,rgba(47,128,255,0.16),transparent_66%)]",
      line: "left-[22%] bottom-[24%] w-[52%] rotate-[4deg]",
      grid: "right-[3%] bottom-[4%]"
    }
  ][index];

  return (
    <motion.div
      data-testid={`scene-atmosphere-${index}`}
      aria-hidden="true"
      style={opacity ? { opacity } : undefined}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className={["absolute rounded-full blur-3xl", atmosphere.orb].join(" ")} />
      <div
        className={[
          "launch-grid-bg absolute h-72 w-72 opacity-60",
          atmosphere.grid
        ].join(" ")}
      />
      <motion.div
        style={lineScale ? { scaleX: lineScale } : undefined}
        className={[
          "absolute h-px origin-left bg-[linear-gradient(90deg,transparent,rgba(47,128,255,0.5),transparent)]",
          atmosphere.line
        ].join(" ")}
      />
    </motion.div>
  );
}

type SceneVisualProps = {
  index: number;
  mode: (typeof visualModes)[number];
  language: SiteLanguage;
  labels: readonly string[];
  panelTitle: string;
  panelBody: string;
  lineScale: MotionValue<number> | undefined;
};

function SceneVisual({ index, mode, language, labels, panelTitle, panelBody, lineScale }: SceneVisualProps) {
  return (
    <div
      data-testid={`scene-visual-${index}`}
      className="launch-surface relative min-h-[30rem] overflow-hidden rounded-[3rem] p-6 md:min-h-[35rem] md:p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_35%,rgba(47,128,255,0.14),transparent_52%)]" />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase text-[#7b8798]">{panelTitle}</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-[#5c6879]">{panelBody}</p>
        </div>
        <span className="font-mono text-5xl font-semibold text-[#e4ebf5] md:text-7xl">
          0{index + 1}
        </span>
      </div>

      {mode === "filter" ? (
        <FilterPathVisual labels={labels} language={language} lineScale={lineScale} />
      ) : null}

      {mode === "route" ? (
        <BoundaryGatewayVisual labels={labels} language={language} lineScale={lineScale} />
      ) : null}

      {mode === "pulse" ? (
        <MonitoringCoreVisual labels={labels} language={language} lineScale={lineScale} />
      ) : null}
    </div>
  );
}

type SceneVisualBodyProps = {
  labels: readonly string[];
  language: SiteLanguage;
  lineScale: MotionValue<number> | undefined;
};

function FilterPathVisual({ labels, language, lineScale }: SceneVisualBodyProps) {
  return (
    <div data-testid="scene-filter-visual" className="relative mt-12 h-64 md:h-72">
      <div className="absolute inset-y-0 left-0 flex flex-col justify-center gap-3">
        {labels.map((label) => (
          <span
            key={label}
            className="launch-pill min-w-24 px-3 py-2 text-center font-mono text-[10px] uppercase text-[#5f6c7e]"
          >
            {label}
          </span>
        ))}
      </div>

      <motion.div
        style={lineScale ? { scaleX: lineScale } : undefined}
        className="absolute left-28 right-24 top-1/2 h-px origin-left bg-[#2f80ff]"
      />

      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2f80ff]/40 bg-white shadow-[0_0_0_24px_rgba(47,128,255,0.07)]" />
      <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f80ff] shadow-[0_20px_55px_rgba(47,128,255,0.3)]" />

      <div className="absolute right-0 top-1/2 grid -translate-y-1/2 gap-2">
        <span className="rounded-full bg-[#07111f] px-4 py-2 font-mono text-[10px] uppercase text-white">
          {sceneVisualCopy[language].clear}
        </span>
        <span className="rounded-full border border-[#dbe5f3] bg-white px-4 py-2 font-mono text-[10px] uppercase text-[#8894a4]">
          {sceneVisualCopy[language].reject}
        </span>
      </div>
    </div>
  );
}

function BoundaryGatewayVisual({ labels, language, lineScale }: SceneVisualBodyProps) {
  return (
    <div data-testid="scene-boundary-gateway" className="relative mt-10 min-h-[18rem] md:min-h-[22rem]">
      <div className="absolute inset-0 rounded-[2.5rem] border border-[#dbe5f3] bg-white/58" />
      <div className="absolute -left-7 bottom-5 top-5 w-[56%] rounded-[2.35rem] bg-[#07111f] p-6 text-white shadow-[0_30px_80px_rgba(7,17,31,0.2)]">
        <div className="flex h-full flex-col justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
              Admission layer
            </p>
            <p className="mt-5 max-w-[12rem] text-3xl font-semibold leading-none md:text-5xl">
              {sceneVisualCopy[language].boundaryFirst}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {labels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/12 bg-white/8 px-3 py-2 text-center font-mono text-[9px] uppercase text-white/70"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 right-6 top-7 w-[49%] rounded-[2rem] border border-[#dbe5f3] bg-[linear-gradient(180deg,#ffffff,rgba(246,250,255,0.82))] p-4 shadow-[0_22px_65px_rgba(15,23,42,0.06)]">
        <div className="flex items-center justify-between border-b border-[#e5edf7] pb-3">
          <span className="font-mono text-[10px] uppercase text-[#8a96a7]">
            {sceneVisualCopy[language].gateCheck}
          </span>
          <span className="rounded-full bg-[#ecf5ff] px-2.5 py-1 font-mono text-[9px] uppercase text-[#2f80ff]">
            {sceneVisualCopy[language].selective}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {sceneVisualCopy[language].checks.map((item, itemIndex) => (
            <div key={item} className="rounded-2xl border border-[#e5edf7] bg-white px-3 py-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-[#64748b]">{item}</span>
                <span className="h-2 w-2 rounded-full bg-[#2f80ff]" />
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#edf3fb]">
                <motion.div
                  style={lineScale ? { scaleX: lineScale } : undefined}
                  className={[
                    "h-full origin-left rounded-full bg-[#2f80ff]",
                    itemIndex === 1 ? "opacity-70" : "",
                    itemIndex === 2 ? "opacity-45" : ""
                  ].join(" ")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-[45%] top-8 w-px bg-[linear-gradient(180deg,transparent,#2f80ff,transparent)]" />
      <div className="absolute left-[45%] top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2f80ff]/30 bg-white shadow-[0_0_0_12px_rgba(47,128,255,0.08)]" />
    </div>
  );
}

function MonitoringCoreVisual({ labels, language, lineScale }: SceneVisualBodyProps) {
  return (
    <div data-testid="scene-monitoring-core" className="relative mt-10 min-h-[18rem] md:min-h-[22rem]">
      <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(47,128,255,0.16),transparent_42%)]" />
      <div className="absolute inset-6 rounded-[2.2rem] border border-[#dbe5f3] bg-white/56" />

      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2f80ff]/30 bg-white shadow-[0_0_0_34px_rgba(47,128,255,0.05),0_30px_80px_rgba(47,128,255,0.18)]" />
      <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#07111f] p-2 shadow-[0_20px_55px_rgba(7,17,31,0.22)]">
        <div className="flex h-full items-center justify-center rounded-full bg-[#2f80ff] font-mono text-[10px] uppercase text-white">
          {sceneVisualCopy[language].live}
        </div>
      </div>

      {labels.map((label, labelIndex) => {
        const positions = [
          "left-4 top-8",
          "right-4 top-14",
          "bottom-8 left-10"
        ];

        return (
          <div
            key={label}
            className={[
              "absolute rounded-2xl border border-[#dbe5f3] bg-white/86 px-3 py-2 shadow-[0_18px_55px_rgba(15,23,42,0.06)]",
              positions[labelIndex]
            ].join(" ")}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#2f80ff] shadow-[0_0_18px_rgba(47,128,255,0.68)]" />
              <span className="font-mono text-[10px] uppercase text-[#607086]">{label}</span>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-6 right-6 w-44 rounded-[1.6rem] border border-[#dbe5f3] bg-white/88 p-4 shadow-[0_22px_65px_rgba(15,23,42,0.06)]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase text-[#8a96a7]">
            {sceneVisualCopy[language].signalStack}
          </span>
          <span className="h-2 w-2 rounded-full bg-[#4ade80]" />
        </div>
        <div className="mt-4 space-y-2">
          {[0.96, 0.72, 0.46].map((opacity, barIndex) => (
            <div key={opacity} className="h-1.5 overflow-hidden rounded-full bg-[#edf3fb]">
              <motion.div
                style={lineScale ? { scaleX: lineScale } : undefined}
                className="h-full origin-left rounded-full bg-[#2f80ff]"
                initial={false}
                animate={{ opacity }}
                transition={{ duration: 0.4, delay: barIndex * 0.05 }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-12 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(47,128,255,0.55),transparent)]" />
      <div className="absolute bottom-14 left-1/2 h-px w-40 -translate-x-1/2 rotate-[-28deg] bg-[linear-gradient(90deg,transparent,rgba(47,128,255,0.45),transparent)]" />
      <div className="absolute left-1/2 top-16 h-px w-40 -translate-x-1/2 rotate-[22deg] bg-[linear-gradient(90deg,transparent,rgba(47,128,255,0.45),transparent)]" />
    </div>
  );
}
