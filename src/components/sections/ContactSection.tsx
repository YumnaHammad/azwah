"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBoutiqueScroll } from "@/hooks/useBoutiqueScroll";
import { CONTACT } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useBoutiqueScroll();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    gsap.from(content.children, {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: content, start: "top 75%" },
    });
  }, []);

  const items = [
    { label: "Address", value: CONTACT.address },
    { label: "Telephone", value: CONTACT.phone },
    { label: "Concierge", value: CONTACT.email },
    { label: "Hours", value: CONTACT.hours },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-pad min-h-0 lg:min-h-screen flex items-center px-0 overflow-hidden"
    >
      <div className="contact-video-overlay absolute inset-0 z-0" />

      <div ref={contentRef} className="section-container relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
        <div>
          <p className="section-label mb-6">Visit Us</p>
          <h2 className="headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream mb-6 sm:mb-8">
            Step inside
            <br />
            <span className="text-gradient-gold">the boutique.</span>
          </h2>
          <p className="text-cream/45 text-base leading-relaxed font-light max-w-md mb-10">
            Order online or visit in person. Men&apos;s, women&apos;s, and unisex fragrances —
            including J. Perfume — shipped with gift wrapping and concierge support.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <MagneticButton href={CONTACT.maps} className="w-full sm:w-auto justify-center">
              Google Maps
            </MagneticButton>
            <MagneticButton href={CONTACT.whatsapp} className="w-full sm:w-auto justify-center">
              WhatsApp
            </MagneticButton>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-12 gold-glow space-y-6 sm:space-y-8">
          {items.map((item) => (
            <div key={item.label} className="group">
              <p className="section-label mb-2">{item.label}</p>
              <p className="text-cream/80 text-base md:text-lg font-light group-hover:text-gold-soft transition-colors duration-500 link-underline inline-block">
                {item.value}
              </p>
            </div>
          ))}
          <div className="pt-4">
            <MagneticButton className="w-full sm:w-auto justify-center">
              Book a Private Consultation
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
