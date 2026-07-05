"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

function ShowcaseCard({
  name,
  subtitle,
  notes,
  description,
  price,
  index,
}: {
  name: string;
  subtitle: string;
  notes: string;
  description: string;
  price: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="glass-panel rounded-2xl overflow-hidden relative cursor-pointer"
        animate={{ y: hovered ? -10 : [0, -5, 0] }}
        transition={
          hovered
            ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }
        }
        style={{
          boxShadow: hovered
            ? "0 30px 80px rgba(0,0,0,0.4), 0 0 40px rgba(184,154,62,0.12)"
            : "0 10px 40px rgba(0,0,0,0.2)",
        }}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* Glass showcase */}
        <div className="relative h-52 sm:h-60 md:h-72 flex items-end justify-center pb-6 sm:pb-8 overflow-hidden">
          <div className="absolute inset-4 rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm" />
          <div className="absolute inset-x-8 bottom-6 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          <motion.div
            className="relative z-10"
            animate={{ scale: hovered ? 1.08 : 1, rotateY: hovered ? 8 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-[68px] h-[160px] rounded-lg bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 relative overflow-hidden shadow-[0_0_30px_rgba(216,198,106,0.08)]">
              <div className="absolute inset-x-2 top-12 bottom-3 rounded-md bg-gradient-to-b from-primary/50 to-primary-dark/70" />
              <div className="absolute inset-x-2 top-0 h-10 rounded-t-lg bg-gradient-to-b from-gold to-gold-soft" />
              <div className="absolute inset-x-1 top-9 h-2 bg-gold/40 rounded-full" />
              <div className="absolute inset-x-2 top-14 h-9 border border-gold/15 rounded-sm" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
            </div>
          </motion.div>

          <div className="absolute bottom-4 w-24 h-2 bg-gold/10 rounded-full blur-md" />
        </div>

        <div className="p-5 sm:p-8 md:p-10 pt-2">
          <p className="section-label mb-2">{subtitle}</p>
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-cream mb-2">{name}</h3>
          <p className="text-gold/60 text-xs tracking-[0.2em] uppercase mb-4">{notes}</p>
          <p className="text-cream/35 text-sm font-light mb-6 leading-relaxed">{description}</p>
          <div className="flex items-center justify-between pt-4 border-t border-gold/10">
            <span className="font-serif text-xl text-gold">{price}</span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-cream/30 hover:text-gold-soft transition-colors">
              Explore →
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProductsSection() {
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
    <section id="collection" ref={sectionRef} className="section-pad px-0 overflow-hidden">
      <div className="section-container">
      <div className="divider-gold mb-12 sm:mb-16 md:mb-20 lg:mb-24" />
      <div>
        <div ref={titleRef} className="text-center mb-16 md:mb-24">
          <p className="section-label mb-5">The Collection</p>
          <h2 className="headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-cream">
            Glass &amp;
            <br />
            <span className="text-gradient-gold">Gold</span>
          </h2>
          <p className="mt-8 text-cream/40 text-sm md:text-base max-w-lg mx-auto font-light">
            Three signature compositions — each housed in a vessel worthy of its contents.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {PRODUCTS.map((p, i) => (
            <ShowcaseCard key={p.name} {...p} index={i} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
