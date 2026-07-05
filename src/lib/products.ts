import "server-only";

import type { Product } from "@/types/product";
import { readProducts } from "@/lib/db/store";
import { DEFAULT_PRODUCTS } from "@/lib/default-products";
export { DEFAULT_PRODUCTS, PRODUCTS } from "@/lib/default-products";

export async function getProducts(): Promise<Product[]> {
  try {
    return await readProducts();
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getRelatedProducts(product: Product, limit = 3): Promise<Product[]> {
  const products = await getProducts();
  return products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.category === product.category || p.brand === product.brand)
    )
    .slice(0, limit);
}