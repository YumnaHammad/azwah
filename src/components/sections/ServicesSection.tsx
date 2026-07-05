"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: "◇",
    title: "Online Ordering",
    body: "Browse, select size, and order via WhatsApp or email. Secure payment and insured delivery worldwide.",
  },
  {
    icon: "✦",
    title: "Gift & Accessories",
    body: "Discovery sets, travel atomizers, and luxury gift wrapping for every occasion.",
  },
  {
    icon: "◈",
    title: "Private Consultation",
    body: "Not sure which scent? Our concierge matches fragrances to your style — men, women, or unisex.",
  },
  {
    icon: "◎",
    title: "Own Blends",
    body: "Azwah house compositions made with ingredients we source and age — oud, rose, amber, musk.",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.from(section.querySelectorAll("[data-service]"), {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 75%" },
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-pad px-0">
      <div className="section-container">
        <div className="text-center mb-12 sm:mb-16">
          <p className="section-label mb-5">How It Works</p>
          <h2 className="headline-xl text-3xl sm:text-4xl md:text-5xl text-cream">
            Luxury perfume,
            <br />
            <span className="text-gradient-gold">delivered.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {SERVICES.map((s) => (
            <motion.div
              key={s.title}
              data-service
              className="glass-panel rounded-xl p-6 sm:p-7 h-full"
            >
              <span className="text-2xl text-gold-soft block mb-4">{s.icon}</span>
              <h3 className="font-serif text-lg text-cream mb-2">{s.title}</h3>
              <p className="text-cream/40 text-sm font-light leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-gold/30 text-[10px] tracking-[0.25em] uppercase text-cream/70 hover:bg-gold/10 hover:border-gold/50 hover:text-gold-soft transition-all"
          >
            Start Your Order
          </a>
        </div>
      </div>
    </section>
  );
}
