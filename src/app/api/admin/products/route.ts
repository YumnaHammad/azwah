import { NextResponse } from "next/server";
import { readProducts, writeProducts } from "@/lib/db/store";
import type { Product } from "@/types/product";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET() {
  const products = await readProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Product;
    const products = await readProducts();

    const slug = body.slug || slugify(body.name);
    if (products.some((p) => p.slug === slug)) {
      return NextResponse.json({ error: "Product slug already exists" }, { status: 409 });
    }

    const product: Product = {
      ...body,
      slug,
      priceFrom: body.sizes?.[0]?.price ?? body.priceFrom ?? 0,
      tags: body.tags ?? [],
      ingredients: body.ingredients ?? [],
      images: body.images ?? [],
      sizes: body.sizes ?? [{ ml: 50, price: body.priceFrom ?? 0, label: "50 ml" }],
    };

    products.push(product);
    await writeProducts(products);
    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
