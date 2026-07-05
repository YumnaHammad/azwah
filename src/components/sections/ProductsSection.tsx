"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";

gsap.registerPlugin(ScrollTrigger);

function ProductCard({
  name,
  subtitle,
  notes,
  price,
  index,
}: {
  name: string;
  subtitle: string;
  notes: string;
  price: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard className="p-8 md:p-10 group cursor-pointer relative overflow-hidden h-full">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-gold/[0.06] via-transparent to-gold/[0.02]" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </div>

        <div className="relative h-52 md:h-60 flex items-end justify-center mb-10 pb-4">
          <div className="relative group-hover:scale-105 transition-transform duration-700 ease-out">
            <div className="w-[72px] h-[168px] rounded-xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-x-2 top-14 bottom-4 rounded-lg bg-gradient-to-b from-primary/40 to-primary-dark/60" />
              <div className="absolute inset-x-3 top-0 h-9 rounded-t-xl bg-gradient-to-b from-gold to-gold-soft" />
              <div className="absolute inset-x-2 top-9 h-2 bg-gold/40 rounded-full" />
              <div className="absolute inset-x-3 top-16 h-10 border border-gold/20 rounded-sm" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-gold/20 rounded-full blur-sm" />
          </div>
        </div>

        <p className="section-label mb-3">{subtitle}</p>
        <h3 className="font-serif text-2xl md:text-3xl text-cream mb-2 group-hover:text-gold-soft transition-colors duration-500">
          {name}
        </h3>
        <p className="text-cream/35 text-sm mb-8 font-light tracking-wide">{notes}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gold/10">
          <p className="text-gold font-serif text-xl">{price}</p>
          <span className="text-[10px] tracking-[0.25em] uppercase text-cream/30 group-hover:text-gold-soft/70 transition-colors">
            View →
          </span>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    gsap.from(title, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 75%" },
    });
  }, []);

  return (
    <section id="collection" ref={sectionRef} className="relative py-28 md:py-40 px-6 md:px-12">
      <div className="divider-gold max-w-7xl mx-auto mb-20 md:mb-28" />
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16 md:mb-24">
          <p className="section-label mb-5">The Collection</p>
          <h2 className="headline-xl text-5xl md:text-6xl lg:text-7xl text-cream">
            Signature
            <br />
            <span className="text-gradient-gold">Creations</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.name} {...product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
