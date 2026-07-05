"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format-price";
import { ProductVisual } from "./ProductVisual";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const primaryImage = product.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/products/${product.slug}`} className="group block h-full">
        <div className="luxury-card relative rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-500 group-hover:border-gold/35 group-hover:shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(184,154,62,0.12)] group-hover:-translate-y-1">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent z-10" />

          {/* Dark showcase well */}
          <div className="relative h-52 sm:h-60 md:h-64 overflow-hidden luxury-card-showcase">
            <div className="absolute inset-4 rounded-xl border border-white/[0.06] bg-black/20" />
            <div className="absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent z-10" />
            <ProductVisual image={primaryImage} embedded className="transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              {product.brand === "J. Perfume" && (
                <span className="px-2 py-0.5 rounded-full text-[9px] tracking-[0.15em] uppercase bg-gold/25 text-gold-soft border border-gold/40">
                  J. Perfume
                </span>
              )}
              {product.isOwnBlend && (
                <span className="px-2 py-0.5 rounded-full text-[9px] tracking-[0.15em] uppercase bg-primary/60 text-cream border border-primary/70">
                  Own Blend
                </span>
              )}
            </div>
            {!product.inStock && (
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] uppercase bg-black/70 text-cream/70 border border-white/10">
                Sold Out
              </span>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-2 bg-gold/15 rounded-full blur-md z-10" />
          </div>

          <div className="p-5 sm:p-7 md:p-8 flex flex-col flex-1 bg-[#041a12]">
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="section-label !text-[0.55rem] !text-gold/70">{product.subtitle}</p>
              <span className="text-[9px] tracking-[0.2em] uppercase text-cream/45 shrink-0 capitalize">
                {product.category}
              </span>
            </div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-1">{product.brand}</p>
            <h3 className="font-serif text-xl sm:text-2xl text-cream mb-2 group-hover:text-gold-soft transition-colors">
              {product.name}
            </h3>
            <p className="text-gold/75 text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-3">
              {product.notes}
            </p>
            <p className="text-cream/55 text-sm font-light leading-relaxed mb-4 flex-1">
              {product.description}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-gold/15">
              <span className="font-serif text-lg sm:text-xl text-gold">
                From {formatPrice(product.priceFrom, product.currency)}
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-cream/50 group-hover:text-gold-soft transition-colors">
                View Details →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
