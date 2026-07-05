"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS } from "@/lib/products";
import type { Product, CategoryFilter } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilterBar } from "@/components/products/ProductFilterBar";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const HOME_PREVIEW_COUNT = 6;

function filterProducts(filter: CategoryFilter): Product[] {
  if (filter === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === filter);
}

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const filtered = filterProducts(filter);
  const preview = filtered.slice(0, HOME_PREVIEW_COUNT);
  const hasMore = filtered.length > HOME_PREVIEW_COUNT;

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    gsap.from(title, {
      opacity: 0,
      y: 50,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });
  }, []);

  const viewAllHref =
    filter === "all" ? "/products" : `/products?category=${filter}`;

  return (
    <section id="collection" ref={sectionRef} className="section-pad px-0 overflow-hidden">
      <div className="section-container">
        <div className="divider-gold mb-12 sm:mb-16 md:mb-20 lg:mb-24" />
        <div>
          <div ref={titleRef} className="text-center mb-10 sm:mb-14 md:mb-16">
            <p className="section-label mb-5">Online Boutique</p>
            <h2 className="headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-cream">
              Curated
              <br />
              <span className="text-gradient-gold">Collection</span>
            </h2>
            <p className="mt-6 sm:mt-8 text-cream/40 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
              Men&apos;s, women&apos;s, and unisex fragrances — Azwah own blends, J. Perfume, and
              select luxury houses. Click any product for full details, notes, and ordering.
            </p>
          </div>

          <ProductFilterBar
            value={filter}
            onChange={setFilter}
            count={preview.length}
            total={filtered.length}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mt-8 sm:mt-10">
            {preview.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-cream/40 py-12">No products in this category yet.</p>
          )}

          {filtered.length > 0 && (
            <div className="text-center mt-12 sm:mt-16 pt-10 border-t border-gold/10">
              {hasMore && (
                <p className="text-cream/30 text-xs tracking-[0.15em] uppercase mb-5">
                  Showing {preview.length} of {filtered.length} in this category
                </p>
              )}
              <MagneticButton href={viewAllHref} className="!px-10">
                View All Products
              </MagneticButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
