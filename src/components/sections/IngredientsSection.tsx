"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { INGREDIENTS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

function IngredientPanel({
  name,
  origin,
  description,
  icon,
  index,
}: {
  name: string;
  origin: string;
  description: string;
  icon: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
    >
      <motion.div
        className="glass-panel rounded-2xl p-5 sm:p-6 md:p-8 h-full cursor-default relative overflow-hidden gold-glow"
        animate={{
          y: hovered ? -8 : [0, -4, 0],
          boxShadow: hovered
            ? "0 20px 60px rgba(184, 154, 62, 0.15), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "0 0 40px rgba(184, 154, 62, 0.06)",
        }}
        transition={{
          y: hovered ? { duration: 0.4 } : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 },
        }}
      >
        {hovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 rounded-full bg-gold-soft/60"
                style={{ left: `${20 + i * 20}%`, top: `${30 + i * 15}%` }}
                animate={{ y: [-5, -15], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        )}

        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
          style={{
            background: "linear-gradient(135deg, rgba(216,198,106,0.08) 0%, transparent 60%)",
          }}
        />

        <motion.span
          className="text-3xl text-gold-soft block mb-5"
          animate={{ y: hovered ? -2 : [0, -3, 0] }}
          transition={{ duration: hovered ? 0.3 : 4, repeat: hovered ? 0 : Infinity }}
        >
          {icon}
        </motion.span>
        <p className="section-label mb-2">{origin}</p>
        <h3 className="font-serif text-2xl text-cream mb-3 group-hover:text-gold-soft transition-colors">
          {name}
        </h3>
        <p className="text-cream/45 text-sm leading-relaxed font-light">{description}</p>
      </motion.div>
    </motion.div>
  );
}

export function IngredientsSection() {
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
    <section id="ingredients" ref={sectionRef} className="section-pad px-0">
      <div className="section-container">
      <div className="divider-gold mb-12 sm:mb-16 md:mb-24" />
      <div>
        <div ref={titleRef} className="text-center mb-12 sm:mb-16 md:mb-24">
          <p className="section-label mb-4 sm:mb-5">Rare Elements</p>
          <h2 className="headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-cream">
            Notes of
            <br />
            <span className="text-gradient-gold">distinction</span>
          </h2>
          <p className="mt-8 text-cream/40 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            Six precious ingredients — each sourced from its native terroir,
            each chosen for its irreplaceable character.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {INGREDIENTS.map((ing, i) => (
            <IngredientPanel key={ing.name} {...ing} index={i} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
