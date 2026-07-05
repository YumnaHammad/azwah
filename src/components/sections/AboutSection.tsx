"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (leftRef.current) {
      gsap.from(leftRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });
    }
    if (rightRef.current) {
      gsap.from(rightRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 65%" },
      });
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-pad px-0 overflow-hidden">
      <div className="section-container">
        <div className="divider-gold mb-12 sm:mb-16 md:mb-24" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 xl:gap-24 items-center">
          <div ref={leftRef}>
            <p className="section-label mb-6">About Us</p>
            <h2 className="headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream mb-6 sm:mb-8">
              Online boutique.
              <br />
              <span className="text-gradient-gold">Own ingredients.</span>
            </h2>
            <p className="text-cream/50 text-base md:text-lg leading-relaxed font-light mb-6">
              {BRAND.story}
            </p>
            <p className="text-cream/35 text-sm md:text-base leading-relaxed font-light mb-8">
              {BRAND.mission}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold/70 hover:text-gold-soft transition-colors link-underline"
            >
              Read Full Story →
            </Link>
            <div className="mt-10 flex items-center gap-6">
              <span className="text-gold text-3xl font-serif">✦</span>
              <p className="text-cream/40 text-xs tracking-[0.3em] uppercase italic font-serif">
                {BRAND.tagline}
              </p>
            </div>
          </div>

          <motion.div
            ref={rightRef}
            className="relative aspect-[4/5] max-w-lg mx-auto lg:ml-auto w-full"
          >
            <Link href="/about" className="block h-full group">
              <div className="absolute inset-0 glass-panel rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-gold/20 group-hover:shadow-[0_0_40px_rgba(184,154,62,0.08)]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-gold/10" />
                <div className="absolute inset-0 texture-grain opacity-30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.span
                    className="text-[100px] md:text-[140px] text-gold/10 font-serif select-none"
                    animate={{ rotate: [0, 5, 0], scale: [1, 1.02, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    A
                  </motion.span>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="section-label mb-2">Est. MMXX · J. Perfume Partner</p>
                  <p className="font-serif text-xl text-cream/80 group-hover:text-gold-soft transition-colors">
                    Azwah Enterprises
                  </p>
                </div>
              </div>
            </Link>
            <motion.div
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 border border-gold/20 rounded-full pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
