import { NextResponse } from "next/server";
import { getMonitoringStatusCards } from "@/lib/api/monitoring";

export async function GET() {
  const statusCards = await getMonitoringStatusCards();
  return NextResponse.json({ statusCards });
}
