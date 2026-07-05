"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteBanner } from "@/types/cms";
import { useSiteContent } from "@/hooks/useSiteContent";
import { CenterBannerModal } from "@/components/banners/CenterBannerModal";

const DISMISS_KEY = "azwah_dismissed_banners";

const ACCENT = {
  gold: {
    border: "border-gold/35",
    bg: "bg-gradient-to-r from-[#2a2008]/95 via-[#041a12]/98 to-[#2a2008]/95",
    badge: "bg-gold/20 text-gold-soft border-gold/30",
    btn: "border-gold/40 bg-gold/15 hover:bg-gold/25 text-cream",
  },
  oud: {
    border: "border-amber-900/40",
    bg: "bg-gradient-to-r from-[#1a1008]/95 via-[#041a12]/98 to-[#1a1008]/95",
    badge: "bg-amber-900/30 text-amber-200/80 border-amber-800/40",
    btn: "border-amber-800/40 bg-amber-900/20 hover:bg-amber-900/30 text-cream",
  },
  jade: {
    border: "border-primary/40",
    bg: "bg-gradient-to-r from-primary-dark/95 via-[#041a12]/98 to-primary-dark/95",
    badge: "bg-primary/30 text-cream border-primary/40",
    btn: "border-primary/40 bg-primary/20 hover:bg-primary/30 text-cream",
  },
  rose: {
    border: "border-rose-900/35",
    bg: "bg-gradient-to-r from-[#2a1020]/95 via-[#041a12]/98 to-[#2a1020]/95",
    badge: "bg-rose-900/30 text-rose-100/80 border-rose-800/35",
    btn: "border-rose-800/35 bg-rose-900/20 hover:bg-rose-900/30 text-cream",
  },
} as const;

const KIND_LABEL: Record<SiteBanner["kind"], string> = {
  sale: "Sale",
  "new-arrival": "New Arrival",
  announcement: "Notice",
  custom: "Promo",
};

function readDismissed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(DISMISS_KEY) || "[]") as string[];
  } catch {
    return [];
  }
}

function BannerCard({
  banner,
  onDismiss,
  compact = false,
}: {
  banner: SiteBanner;
  onDismiss: () => void;
  compact?: boolean;
}) {
  const style = ACCENT[banner.accent];

  return (
    <div className={`relative overflow-hidden rounded-xl border backdrop-blur-md shadow-[0_16px_48px_rgba(0,0,0,0.5)] ${style.border} ${style.bg}`}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className={`${compact ? "p-4" : "p-5 sm:p-6"} flex flex-col gap-3`}>
        <div className="flex items-start justify-between gap-3">
          <span className={`shrink-0 px-2 py-0.5 rounded-full text-[9px] tracking-[0.2em] uppercase border ${style.badge}`}>
            {KIND_LABEL[banner.kind]}
          </span>
          {banner.dismissible && (
            <button
              type="button"
              onClick={onDismiss}
              className="text-cream/35 hover:text-cream text-lg leading-none -mt-1"
              aria-label="Dismiss"
            >
              ×
            </button>
          )}
        </div>
        <div>
          <h3 className={`font-serif text-cream ${compact ? "text-lg" : "text-xl sm:text-2xl"} mb-1`}>
            {banner.title}
          </h3>
          <p className={`text-cream/55 font-light leading-relaxed ${compact ? "text-xs" : "text-sm"}`}>
            {banner.message}
          </p>
        </div>
        {banner.cta && (
          <Link
            href={banner.href}
            className={`inline-flex items-center justify-center self-start px-5 py-2 rounded-full border text-[10px] tracking-[0.22em] uppercase transition-colors ${style.btn}`}
          >
            {banner.cta} →
          </Link>
        )}
      </div>
    </div>
  );
}

export function SiteBanners() {
  const { site } = useSiteContent();
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    setDismissed(readDismissed());
  }, []);

  const dismiss = useCallback((id: string) => {
    setDismissed((prev) => {
      const next = [...new Set([...prev, id])];
      localStorage.setItem(DISMISS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const visible = useMemo(
    () => (site.banners ?? []).filter((b) => b.enabled && !dismissed.includes(b.id)),
    [site.banners, dismissed]
  );

  const topBanner = visible.find((b) => b.position === "top");
  const centerBanner = visible.find((b) => b.position === "center");
  const bottomLeft = visible.filter((b) => b.position === "bottom-left");
  const bottomRight = visible.filter((b) => b.position === "bottom-right");
  const topBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!topBanner) {
      document.documentElement.style.setProperty("--site-top-banner", "0px");
      return;
    }

    const el = topBannerRef.current;
    if (!el) return;

    const syncHeight = () => {
      document.documentElement.style.setProperty("--site-top-banner", `${el.offsetHeight}px`);
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(el);
    window.addEventListener("resize", syncHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeight);
      document.documentElement.style.setProperty("--site-top-banner", "0px");
    };
  }, [topBanner]);

  return (
    <>
      <AnimatePresence>
        {topBanner && (
          <motion.div
            ref={topBannerRef}
            key={topBanner.id}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[45]"
          >
            <div className={`border-b ${ACCENT[topBanner.accent].border} ${ACCENT[topBanner.accent].bg}`}>
              <div className="section-container py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-[9px] tracking-[0.2em] uppercase border ${ACCENT[topBanner.accent].badge}`}>
                    {KIND_LABEL[topBanner.kind]}
                  </span>
                  <p className="text-cream text-xs sm:text-sm font-light truncate">
                    <span className="font-serif text-cream mr-2">{topBanner.title}</span>
                    {topBanner.message}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {topBanner.cta && (
                    <Link
                      href={topBanner.href}
                      className={`px-4 py-1.5 rounded-full border text-[9px] tracking-[0.2em] uppercase transition-colors ${ACCENT[topBanner.accent].btn}`}
                    >
                      {topBanner.cta}
                    </Link>
                  )}
                  {topBanner.dismissible && (
                    <button
                      type="button"
                      onClick={() => dismiss(topBanner.id)}
                      className="text-cream/35 hover:text-cream text-lg leading-none"
                      aria-label="Dismiss"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {centerBanner && (
          <motion.div
            key={centerBanner.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <CenterBannerModal banner={centerBanner} onDismiss={() => dismiss(centerBanner.id)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-5 left-4 z-[70] flex flex-col gap-3 max-w-[min(100vw-2rem,20rem)] pointer-events-none">
        <AnimatePresence mode="popLayout">
          {bottomLeft.map((banner) => (
            <motion.div
              key={banner.id}
              layout
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="pointer-events-auto"
            >
              <BannerCard banner={banner} onDismiss={() => dismiss(banner.id)} compact />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-5 right-4 z-[70] flex flex-col gap-3 max-w-[min(100vw-2rem,20rem)] pointer-events-none">
        <AnimatePresence mode="popLayout">
          {bottomRight.map((banner) => (
            <motion.div
              key={banner.id}
              layout
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="pointer-events-auto"
            >
              <BannerCard banner={banner} onDismiss={() => dismiss(banner.id)} compact />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
