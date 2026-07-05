"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HEADLINES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    if (!section || !headline || !sub) return;

    gsap.set(headline, { opacity: 0, y: 60 });
    gsap.set(sub, { opacity: 0, y: 30 });

    const tl = gsap.timeline({ delay: 1 });
    tl.to(headline, {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: "power3.out",
    }).to(
      sub,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8"
    );

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(headline, {
          opacity: 1 - self.progress * 1.5,
          y: -self.progress * 80,
        });
        gsap.set(sub, {
          opacity: 1 - self.progress * 2,
          y: -self.progress * 40,
        });
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="absolute inset-0 flex flex-col items-center justify-end pb-32 md:pb-40 px-6 pointer-events-none"
    >
      <div className="text-center max-w-4xl mx-auto">
        <p className="section-label mb-6 md:mb-8">Azwah Enterprises</p>
        <h1
          ref={headlineRef}
          className="headline-xl text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-cream"
        >
          {HEADLINES[0]}
          <br />
          <span className="text-gradient-gold">{HEADLINES[1]}</span>
        </h1>
        <p
          ref={subRef}
          className="mt-8 md:mt-10 text-cream/40 text-sm md:text-base tracking-[0.3em] uppercase font-light"
        >
          The art of fragrance
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40">
        <span className="text-[10px] tracking-[0.3em] uppercase text-cream/60">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
