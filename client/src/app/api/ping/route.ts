import { NextResponse } from "next/server";
import { API_BASE } from "@/lib/constants";

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/books`, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json({ ok: true, upstreamStatus: res.status, sample: data }, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Ping failed";
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}
