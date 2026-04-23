import { NextResponse } from "next/server";
import { getMonitoringSections } from "@/lib/api/monitoring";

export async function GET() {
  const sections = await getMonitoringSections();
  return NextResponse.json({ sections });
}
