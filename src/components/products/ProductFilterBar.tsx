"use client";

import type { CategoryFilter } from "@/types/product";
import { PRODUCT_FILTERS } from "@/lib/product-filters";

interface ProductFilterBarProps {
  value: CategoryFilter;
  onChange: (filter: CategoryFilter) => void;
  count?: number;
  total?: number;
  sticky?: boolean;
}

export function ProductFilterBar({
  value,
  onChange,
  count,
  total,
  sticky = false,
}: ProductFilterBarProps) {
  return (
    <div
      className={`${
        sticky
          ? "sticky top-[4.5rem] sm:top-[5rem] z-30 -mx-[clamp(1rem,4vw,3rem)] px-[clamp(1rem,4vw,3rem)] py-4 sm:py-5 bg-[#041f16]/95 backdrop-blur-md border-b border-gold/10"
          : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {PRODUCT_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange(f.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase border transition-all duration-300 ${
                value === f.id
                  ? "border-gold/50 bg-gold/10 text-gold-soft"
                  : "border-white/10 text-cream/40 hover:border-gold/25 hover:text-cream/70"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        {count !== undefined && total !== undefined && (
          <p className="text-[10px] tracking-[0.2em] uppercase text-cream/35 shrink-0">
            {count} of {total} products
          </p>
        )}
      </div>
    </div>
  );
}
