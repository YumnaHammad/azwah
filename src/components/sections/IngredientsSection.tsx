"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INGREDIENTS } from "@/lib/constants";
import { IngredientCard } from "@/components/ui/IngredientCard";

gsap.registerPlugin(ScrollTrigger);

export function IngredientsSection() {
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
      id="ingredients"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-20 md:mb-28">
          <p className="section-label mb-6">Finest Elements</p>
          <h2 className="headline-xl text-5xl md:text-7xl text-cream">
            Precious
            <br />
            <span className="text-gradient-gold">Ingredients</span>
          </h2>
          <p className="mt-8 text-cream/40 text-sm md:text-base max-w-lg mx-auto font-light leading-relaxed">
            Sourced from the most revered regions of the world, each ingredient
            is selected for its exceptional quality and character.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {INGREDIENTS.map((ingredient, i) => (
            <IngredientCard key={ingredient.name} {...ingredient} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
