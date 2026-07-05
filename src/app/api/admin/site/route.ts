import { NextResponse } from "next/server";
import { readSiteContent, writeSiteContent } from "@/lib/db/store";
import type { SiteContent } from "@/types/cms";

export const dynamic = "force-dynamic";

export async function GET() {
  const site = await readSiteContent();
  return NextResponse.json(site);
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as SiteContent;
    await writeSiteContent(body);
    return NextResponse.json(body);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
