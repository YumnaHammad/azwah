import { NextResponse } from "next/server";
import { readProducts, writeProducts } from "@/lib/db/store";
import type { Product } from "@/types/product";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const products = await readProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const body = (await request.json()) as Product;
    const products = await readProducts();
    const index = products.findIndex((p) => p.slug === slug);
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const updated: Product = {
      ...body,
      slug: body.slug || slug,
      priceFrom: body.sizes?.[0]?.price ?? body.priceFrom,
    };

    if (updated.slug !== slug) {
      if (products.some((p) => p.slug === updated.slug && p.slug !== slug)) {
        return NextResponse.json({ error: "Slug already taken" }, { status: 409 });
      }
    }

    products[index] = updated;
    await writeProducts(products);
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { slug } = await params;
  const products = await readProducts();
  const filtered = products.filter((p) => p.slug !== slug);
  if (filtered.length === products.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await writeProducts(filtered);
  return NextResponse.json({ ok: true });
}
