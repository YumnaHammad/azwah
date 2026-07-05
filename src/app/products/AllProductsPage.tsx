"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PageShell, Breadcrumb } from "@/components/layout/PageShell";
import { ProductFilterBar } from "@/components/products/ProductFilterBar";
import { ProductCard } from "@/components/products/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useSiteContent } from "@/hooks/useSiteContent";
import { isValidCategory } from "@/lib/product-filters";
import type { CategoryFilter, Product } from "@/types/product";
import { MagneticButton } from "@/components/ui/MagneticButton";

function filterProducts(products: Product[], category: CategoryFilter) {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

function AllProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products, loading } = useProducts();
  const { site } = useSiteContent();

  const categoryParam = searchParams.get("category");
  const filter: CategoryFilter = isValidCategory(categoryParam) ? categoryParam : "all";

  const filtered = useMemo(() => filterProducts(products, filter), [products, filter]);

  const setFilter = (next: CategoryFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") {
      params.delete("category");
    } else {
      params.set("category", next);
    }
    const query = params.toString();
    router.push(query ? `/products?${query}` : "/products", { scroll: false });
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Collection", href: "/products" },
          { label: "All Products" },
        ]}
      />

      <div className="section-container pb-16 sm:pb-24">
        <div className="text-center mb-8 sm:mb-10">
          <p className="section-label mb-4">Full Catalogue</p>
          <h1 className="headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream">
            All
            <span className="text-gradient-gold"> Products</span>
          </h1>
          <p className="mt-6 text-cream/40 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Men&apos;s, women&apos;s, unisex fragrances and accessories — Azwah house blends,
            J. Perfume, and curated luxury houses.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-cream/40 py-16">Loading collection…</p>
        ) : (
          <>
            <ProductFilterBar
              value={filter}
              onChange={setFilter}
              count={filtered.length}
              total={products.length}
              sticky
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mt-8 sm:mt-10">
              {filtered.map((product, i) => (
                <ProductCard key={product.slug} product={product} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-cream/40 py-16">No products in this category.</p>
            )}
          </>
        )}

        <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton href={site.contact.whatsapp}>Order via WhatsApp</MagneticButton>
          <Link
            href="/"
            className="text-[10px] tracking-[0.3em] uppercase text-cream/35 hover:text-gold-soft transition-colors link-underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default function AllProductsPage() {
  return (
    <PageShell>
      <Suspense
        fallback={
          <div className="section-container py-24 text-center text-cream/40 text-sm tracking-widest uppercase">
            Loading collection…
          </div>
        }
      >
        <AllProductsContent />
      </Suspense>
    </PageShell>
  );
}
