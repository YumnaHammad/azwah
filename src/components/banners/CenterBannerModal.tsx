"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { SiteBanner } from "@/types/cms";
import { ProductVisual } from "@/components/products/ProductVisual";

/** Center modal always uses Azwah green luxury palette */
const GREEN = {
  border: "border-primary/45",
  shell: "bg-gradient-to-br from-[#0a4d32] via-[#041f16] to-[#021510]",
  imageWell: "from-[#0e5a39]/80 via-[#041f16] to-[#062a1e]",
  copyPanel: "bg-gradient-to-br from-[#041a12]/95 to-[#021510]",
  badge: "bg-primary/40 text-gold-soft border-primary/50",
  btn: "border-gold/40 bg-gold/12 hover:bg-gold/22 text-cream",
  glow: "rgba(14,90,57,0.4)",
  detail: "text-gold/70",
  subtitle: "text-cream/45",
};

const KIND_LABEL: Record<SiteBanner["kind"], string> = {
  sale: "Sale",
  "new-arrival": "New Arrival",
  announcement: "Notice",
  custom: "Promo",
};

interface CenterBannerModalProps {
  banner: SiteBanner;
  onDismiss: () => void;
}

export function CenterBannerModal({ banner, onDismiss }: CenterBannerModalProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border shadow-[0_32px_80px_rgba(0,0,0,0.65)] ${GREEN.border} ${GREEN.shell}`}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(14,90,57,0.25),transparent_55%)] pointer-events-none" />

      {banner.dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full border border-primary/30 bg-[#041a12]/80 text-cream/50 hover:text-cream hover:border-gold/40 transition-colors text-lg leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.05fr] min-h-[300px] sm:min-h-[340px]">
        {/* Product image — green showcase */}
        <div className={`relative overflow-hidden min-h-[220px] md:min-h-0 bg-gradient-to-br ${GREEN.imageWell}`}>
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${GREEN.glow} 0%, transparent 68%)`,
            }}
          />
          <div className="absolute inset-0 texture-grain opacity-10" />
          <div className="absolute top-4 left-4 z-10">
            <span className={`px-2.5 py-1 rounded-full text-[8px] tracking-[0.25em] uppercase border ${GREEN.badge}`}>
              Azwah Atelier
            </span>
          </div>
          <div className="relative h-full flex items-center justify-center p-6 sm:p-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[200px] sm:max-w-[240px] aspect-[3/4] rounded-xl overflow-hidden border border-primary/25 shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(14,90,57,0.15)] bg-[#041a12]/60"
            >
              <ProductVisual
                image={{
                  id: banner.id,
                  alt: banner.title,
                  variant: "bottle",
                  accent: "jade",
                  url: banner.imageUrl,
                }}
                size="lg"
                embedded
                className="h-full"
              />
            </motion.div>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-2/5 bg-gradient-to-t from-[#021510]/90 to-transparent pointer-events-none" />
        </div>

        {/* Copy — deep green panel */}
        <div className={`relative flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12 ${GREEN.copyPanel}`}>
          <span
            className={`self-start mb-4 px-3 py-1 rounded-full text-[9px] tracking-[0.25em] uppercase border ${GREEN.badge}`}
          >
            {KIND_LABEL[banner.kind]}
          </span>

          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl text-cream leading-tight mb-2"
          >
            {banner.title}
          </motion.h3>

          {banner.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className={`text-[10px] tracking-[0.28em] uppercase mb-4 ${GREEN.subtitle}`}
            >
              {banner.subtitle}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="text-cream/60 text-sm sm:text-base font-light leading-relaxed mb-3 max-w-md"
          >
            {banner.message}
          </motion.p>

          {banner.detail && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className={`text-xs tracking-[0.12em] font-light mb-6 sm:mb-8 ${GREEN.detail}`}
            >
              {banner.detail}
            </motion.p>
          )}

          {!banner.detail && <div className="mb-6 sm:mb-8" />}

          {banner.cta && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
            >
              <Link
                href={banner.href}
                onClick={onDismiss}
                className={`inline-flex items-center justify-center px-7 py-3 rounded-full border text-[10px] tracking-[0.28em] uppercase transition-all ${GREEN.btn}`}
              >
                {banner.cta} →
              </Link>
            </motion.div>
          )}

          <p className="mt-6 text-[9px] tracking-[0.3em] uppercase text-primary/50 hidden sm:block">
            Azwah Enterprises · Online Boutique
          </p>
        </div>
      </div>
    </div>
  );
}
