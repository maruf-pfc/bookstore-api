import { NextResponse } from "next/server";
import { API_BASE } from "@/lib/constants";

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/books`, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json({ ok: true, upstreamStatus: res.status, sample: data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? "Ping failed" }, { status: 500 });
  }
}
