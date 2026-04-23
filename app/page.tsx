"use client";

import { useState } from "react";
import { BarbellPositioning } from "@/components/home/barbell-positioning";
import { CapabilityGrid } from "@/components/home/capability-grid";
import { Hero } from "@/components/home/hero";
import { MonitoringBridge } from "@/components/home/monitoring-bridge";
import { ProductOverview } from "@/components/home/product-overview";
import { RiskNotice } from "@/components/home/risk-notice";
import { StrategyStyle } from "@/components/home/strategy-style";
import { WhyThisExists } from "@/components/home/why-this-exists";
import { SiteHeader } from "@/components/site-header";
import { type SiteLanguage } from "@/lib/content/site-copy";

export default function HomePage() {
  const [language, setLanguage] = useState<SiteLanguage>("zh");

  return (
    <>
      <SiteHeader language={language} onLanguageChange={setLanguage} />
      <main className="site-shell">
        <Hero language={language} />
        <div className="mx-auto max-w-7xl px-6 pb-20">
          <ProductOverview language={language} />
          <WhyThisExists language={language} />
          <BarbellPositioning language={language} />
          <StrategyStyle language={language} />
          <CapabilityGrid language={language} />
          <MonitoringBridge language={language} />
          <RiskNotice language={language} />
        </div>
      </main>
    </>
  );
}
