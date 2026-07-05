"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import { BRANDS } from "@/lib/brands";

gsap.registerPlugin(ScrollTrigger);

export function BrandsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    gsap.from(title, {
      opacity: 0,
      y: 50,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });
  }, []);

  return (
    <section id="brands" ref={sectionRef} className="section-pad px-0 bg-[#041a12]/80 border-y border-gold/5">
      <div className="section-container">
        <div className="divider-gold mb-12 sm:mb-16 md:mb-20" />
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <p className="section-label mb-5">Authorized Retailer</p>
          <h2 className="headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream">
            J. Perfume &amp;
            <br />
            <span className="text-gradient-gold">Partner Houses</span>
          </h2>
          <p className="mt-6 text-cream/40 text-sm md:text-base max-w-2xl mx-auto font-light">
            Authentic luxury fragrances for men and women — including the full J. Perfume line,
            available exclusively through our online boutique.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`glass-panel rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden ${
                brand.highlight ? "border border-gold/20 gold-glow" : ""
              }`}
            >
              {brand.highlight && (
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              )}
              {brand.highlight && (
                <span className="inline-block mb-4 px-3 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase bg-gold/10 text-gold-soft border border-gold/25">
                  Official Partner
                </span>
              )}
              <p className="section-label mb-2">{brand.tagline}</p>
              <h3 className="font-serif text-2xl sm:text-3xl text-cream mb-3">{brand.name}</h3>
              <p className="text-cream/40 text-sm leading-relaxed font-light mb-6">
                {brand.description}
              </p>
              {brand.id === "j-perfume" && (
                <Link
                  href="/#collection"
                  className="text-[10px] tracking-[0.25em] uppercase text-gold/60 hover:text-gold-soft transition-colors link-underline"
                >
                  Shop J. Perfume →
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
