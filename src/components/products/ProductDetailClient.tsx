"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Product, ProductImage } from "@/types/product";
import { CONTACT } from "@/lib/constants";
import { ProductVisual } from "./ProductVisual";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="space-y-4">
      <motion.div
        key={current.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden glass-panel border border-gold/10"
      >
        <ProductVisual image={current} size="lg" />
      </motion.div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square rounded-lg overflow-hidden border transition-all duration-300 ${
                active === i
                  ? "border-gold/50 ring-1 ring-gold/30"
                  : "border-white/10 opacity-60 hover:opacity-100"
              }`}
              aria-label={img.alt}
            >
              <ProductVisual image={img} size="sm" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState(0);
  const size = product.sizes[selectedSize];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20">
      <ProductGallery images={product.images} />

      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase border border-gold/20 text-gold/80">
            {product.brand}
          </span>
          <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase border border-white/10 text-cream/50 capitalize">
            {product.category}
          </span>
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-[10px] tracking-[0.15em] uppercase bg-white/5 text-cream/40"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="section-label mb-2">{product.subtitle}</p>
        <h1 className="headline-xl text-3xl sm:text-4xl md:text-5xl text-cream mb-4">
          {product.name}
        </h1>
        <p className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-6">{product.notes}</p>

        <p className="text-cream/55 text-base md:text-lg leading-relaxed font-light mb-8">
          {product.longDescription}
        </p>

        {/* Note pyramid */}
        <div className="glass-panel rounded-xl p-5 sm:p-6 mb-8 space-y-4">
          <p className="section-label">Olfactory Pyramid</p>
          {(
            [
              ["Top Notes", product.notePyramid.top],
              ["Heart Notes", product.notePyramid.heart],
              ["Base Notes", product.notePyramid.base],
            ] as const
          ).map(([label, notes]) => (
            <div key={label}>
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold/50 mb-1">{label}</p>
              <p className="text-cream/70 text-sm font-light">{notes.join(" · ")}</p>
            </div>
          ))}
        </div>

        {/* Own ingredients */}
        <div className="mb-8">
          <p className="section-label mb-3">Key Ingredients</p>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((ing) => (
              <span
                key={ing}
                className="px-3 py-1.5 rounded-full text-xs text-cream/60 border border-gold/10 bg-gold/[0.03]"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Sizes */}
        {product.sizes.length > 1 && (
          <div className="mb-6">
            <p className="section-label mb-3">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSelectedSize(i)}
                  className={`px-5 py-2.5 rounded-full text-xs tracking-[0.15em] uppercase border transition-all ${
                    selectedSize === i
                      ? "border-gold/50 bg-gold/10 text-gold-soft"
                      : "border-white/10 text-cream/50 hover:border-gold/30"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 pb-8 border-b border-gold/10">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-cream/35 mb-1">Price</p>
            <p className="font-serif text-3xl sm:text-4xl text-gold">
              ${size.price}
            </p>
            <p className="text-cream/30 text-xs mt-1">Delivery in {product.deliveryDays}</p>
          </div>
          {product.inStock ? (
            <span className="text-[10px] tracking-[0.2em] uppercase text-primary/80 bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
              In Stock
            </span>
          ) : (
            <span className="text-[10px] tracking-[0.2em] uppercase text-cream/40">Out of Stock</span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`Hello, I would like to order ${product.name} (${size.label}) — $${size.price}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center px-8 py-4 rounded-full border border-gold/40 bg-gold/10 text-cream text-[11px] tracking-[0.25em] uppercase hover:bg-gold/20 hover:border-gold/60 transition-all"
          >
            Order via WhatsApp
          </a>
          <a
            href="mailto:concierge@azwah.com"
            className="flex-1 inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/15 text-cream/70 text-[11px] tracking-[0.25em] uppercase hover:border-gold/30 hover:text-gold-soft transition-all"
          >
            Concierge Inquiry
          </a>
        </div>

        <div className="mt-8 glass-panel rounded-xl p-5 text-sm text-cream/45 font-light leading-relaxed">
          <p className="section-label mb-2">Online Boutique</p>
          Authentic fragrances shipped worldwide in protective packaging. Gift wrapping and
          personalized notes available. J. Perfume products include certificate of authenticity.
        </div>
      </div>
    </div>
  );
}
