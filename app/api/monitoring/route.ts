import { NextResponse } from "next/server";
import { getMonitoringSnapshot } from "@/lib/api/monitoring";

export async function GET() {
  const snapshot = await getMonitoringSnapshot();
  return NextResponse.json(snapshot);
}
