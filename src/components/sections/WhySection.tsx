"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURES } from "@/lib/constants";
import { FeatureCard } from "@/components/ui/FeatureCard";

gsap.registerPlugin(ScrollTrigger);

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    gsap.from(title, {
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
      },
    });
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-20 md:mb-28">
          <p className="section-label mb-6">Our Promise</p>
          <h2 className="headline-xl text-5xl md:text-7xl text-cream">
            Why Choose
            <br />
            <span className="text-gradient-gold">Azwah</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
