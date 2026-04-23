import Link from "next/link";
import {
  morphoVaultUrl,
  siteCopy,
  type SiteLanguage
} from "@/lib/content/site-copy";
import { SectionFrame } from "@/components/home/section-frame";

type MonitoringBridgeProps = {
  language: SiteLanguage;
};

export function MonitoringBridge({ language }: MonitoringBridgeProps) {
  return (
    <SectionFrame
      id="monitoring-bridge"
      index="06"
      label={siteCopy.monitoringBridge.label}
      language={language}
      title={siteCopy.monitoringBridge.title}
    >
      <div className="flex flex-col gap-6 rounded-[1.75rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(235,242,255,0.7))] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:flex-row md:items-end md:justify-between">
        <p className="max-w-2xl text-lg leading-8 text-[#566375]">
          {siteCopy.monitoringBridge.body[language]}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/monitoring"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[#101828] px-5 text-sm font-medium text-white transition hover:bg-[#1f3258]"
          >
            {siteCopy.hero.primaryCta[language]}
          </Link>
          <Link
            href={morphoVaultUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-900/10 bg-white/70 px-5 text-sm text-[#213147] transition hover:bg-[#eef3fb]"
          >
            {siteCopy.hero.secondaryCta[language]}
          </Link>
        </div>
      </div>
    </SectionFrame>
  );
}
