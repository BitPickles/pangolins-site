import { NextResponse } from "next/server";
import { monitoringSnapshot } from "@/lib/content/monitoring-data";

export function GET() {
  return NextResponse.json(monitoringSnapshot.liquidity);
}
