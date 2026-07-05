import { NextResponse } from "next/server";
import { readProducts } from "@/lib/db/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
