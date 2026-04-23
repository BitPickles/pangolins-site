import { NextResponse } from "next/server";
import { getMonitoringSummary } from "@/lib/api/monitoring";

export async function GET() {
  const summary = await getMonitoringSummary();
  return NextResponse.json({ summary });
}
