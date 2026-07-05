"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import type { Product, CategoryFilter } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";

gsap.registerPlugin(ScrollTrigger);

const FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "unisex", label: "Unisex" },
  { id: "accessories", label: "Accessories" },
];

function filterProducts(filter: CategoryFilter): Product[] {
  if (filter === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === filter);
}

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const filtered = filterProducts(filter);

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

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase border transition-all duration-300 ${
                  filter === f.id
                    ? "border-gold/50 bg-gold/10 text-gold-soft"
                    : "border-white/10 text-cream/40 hover:border-gold/25 hover:text-cream/70"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-cream/40 py-12">No products in this category yet.</p>
          )}

          <div className="text-center mt-12 sm:mt-16">
            <Link
              href="/about"
              className="text-[10px] tracking-[0.3em] uppercase text-cream/35 hover:text-gold-soft transition-colors link-underline"
            >
              Learn About Our Brands →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
