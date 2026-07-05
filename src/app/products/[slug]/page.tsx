import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, Breadcrumb } from "@/components/layout/PageShell";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { ProductCard } from "@/components/products/ProductCard";
import { getProductBySlug, getRelatedProducts, getProducts } from "@/lib/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | ${product.brand} — Azwah Enterprises`,
    description: product.longDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Collection", href: "/products" },
          { label: product.name },
        ]}
      />

      <div className="section-container pb-16 sm:pb-24">
        <ProductDetailClient product={product} />
      </div>

      {related.length > 0 && (
        <section className="section-pad border-t border-gold/10 bg-[#041a12]">
          <div className="section-container">
            <div className="text-center mb-12 sm:mb-16">
              <p className="section-label mb-4">You May Also Like</p>
              <h2 className="headline-xl text-2xl sm:text-3xl md:text-4xl text-cream">
                Related <span className="text-gradient-gold">Selections</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="text-[10px] tracking-[0.3em] uppercase text-cream/40 hover:text-gold-soft transition-colors link-underline"
              >
                View Full Collection
              </Link>
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
