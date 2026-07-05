"use client";

import { motion } from "framer-motion";
import { LuxuryCarousel } from "@/components/ui/LuxuryCarousel";
import { useSiteContent } from "@/hooks/useSiteContent";

export function TestimonialsSection() {
  const { site } = useSiteContent();

  return (
    <section className="section-pad px-0 bg-[#041a12]/50 border-y border-gold/5">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="section-label mb-4">Client Voices</p>
          <h2 className="headline-xl text-2xl sm:text-3xl md:text-4xl text-cream">
            Loved by those who
            <span className="text-gradient-gold"> wear it</span>
          </h2>
        </motion.div>

        <LuxuryCarousel autoPlayMs={2000}>
          {site.testimonials.map((t) => (
            <div
              key={t.id}
              className="glass-panel rounded-2xl p-8 sm:p-10 md:p-12 text-center max-w-3xl mx-auto"
            >
              <span className="text-gold-soft text-3xl font-serif block mb-6">&ldquo;</span>
              <p className="font-serif text-lg sm:text-xl md:text-2xl text-cream/85 leading-relaxed font-light italic mb-8">
                {t.quote}
              </p>
              <div>
                <p className="text-cream text-sm tracking-[0.15em] uppercase">{t.name}</p>
                <p className="text-cream/35 text-xs mt-1 tracking-wider">{t.detail}</p>
              </div>
            </div>
          ))}
        </LuxuryCarousel>
      </div>
    </section>
  );
}
