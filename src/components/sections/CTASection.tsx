"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    gsap.from(content.children, {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 65%" },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/[0.04] blur-[100px]" />
      </div>

      <div ref={contentRef} className="max-w-3xl mx-auto text-center relative z-10">
        <p className="section-label mb-8">Begin Your Journey</p>
        <h2 className="headline-xl text-5xl md:text-6xl lg:text-7xl text-cream mb-8">
          Experience
          <br />
          <span className="text-gradient-gold">Pure Luxury</span>
        </h2>
        <p className="text-cream/40 text-sm md:text-base leading-relaxed font-light max-w-lg mx-auto mb-12">
          The bottle may fade from view, but the essence endures. Discover
          fragrances crafted for those who appreciate the extraordinary.
        </p>
        <MagneticButton>Discover Collection</MagneticButton>
      </div>

      <div className="divider-gold max-w-xs mx-auto mt-24 opacity-50" />
    </section>
  );
}
