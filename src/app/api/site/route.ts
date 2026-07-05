import { NextResponse } from "next/server";
import { readSiteContent } from "@/lib/db/store";

export async function GET() {
  try {
    const site = await readSiteContent();
    return NextResponse.json(site);
  } catch {
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}
