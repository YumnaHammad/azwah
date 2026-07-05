"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
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
          <p className="section-label mb-6">Our Heritage</p>
          <h2 className="headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream mb-6 sm:mb-8">
            Crafted for those who
            <br />
            <span className="text-gradient-gold">feel deeply.</span>
          </h2>
          <p className="text-cream/50 text-base md:text-lg leading-relaxed font-light mb-6">
            {BRAND.story}
          </p>
          <p className="text-cream/35 text-sm md:text-base leading-relaxed font-light">
            {BRAND.heritage}
          </p>
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
          <div className="absolute inset-0 glass-panel rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-gold/10" />
            <div className="absolute inset-0 texture-grain opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.span
                className="text-[120px] md:text-[160px] text-gold/10 font-serif select-none"
                animate={{ rotate: [0, 5, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                A
              </motion.span>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="section-label mb-2">Est. MMXX</p>
              <p className="font-serif text-2xl text-cream/80">Azwah Enterprises</p>
            </div>
          </div>
          <motion.div
            className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 border border-gold/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 border border-gold/10 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
      </div>
    </section>
  );
}
