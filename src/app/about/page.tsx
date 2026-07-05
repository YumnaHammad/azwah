"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSiteContent } from "@/hooks/useSiteContent";

const VALUES = [
  {
    title: "Authenticity",
    body: "Every bottle is sourced directly from houses and verified before it reaches you. J. Perfume and partner brands ship with certificates where applicable.",
  },
  {
    title: "Own Compositions",
    body: "Azwah house fragrances are composed in our atelier using ingredients we select, age, and blend — oud from Assam, rose from Grasse, amber from the Baltic.",
  },
  {
    title: "Online Concierge",
    body: "Order from anywhere. WhatsApp, email, or boutique visit — our team guides you to the perfect scent for men, women, or unisex wear.",
  },
  {
    title: "Global Delivery",
    body: "Protective packaging, insured shipping, and gift wrapping. Most orders arrive within 2–5 business days.",
  },
];

const TIMELINE = [
  { year: "Founding", text: "Azwah Enterprises established with a single vision: fragrance as art, not commodity." },
  { year: "Atelier", text: "In-house blending begins — own oud aging program and Grasse rose partnership." },
  { year: "J. Perfume", text: "Authorized as official retailer for J. Perfume — one of the region's most requested luxury lines." },
  { year: "Today", text: "Full online boutique: men's, women's, unisex, accessories, and bespoke consultations." },
];

export default function AboutPage() {
  const { site } = useSiteContent();
  const { brand, contact, ingredients, brands } = site;

  return (
    <PageShell>
      {/* Hero */}
      <section className="section-container pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="section-label mb-4">About Azwah Enterprises</p>
          <h1 className="headline-xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream mb-8">
            Where heritage meets
            <br />
            <span className="text-gradient-gold">the sublime.</span>
          </h1>
          <p className="text-cream/50 text-lg md:text-xl font-light leading-relaxed mb-6">
            {brand.story}
          </p>
          <p className="text-cream/35 text-base font-light leading-relaxed max-w-2xl">
            {brand.heritage}
          </p>
        </motion.div>
      </section>

      <div className="divider-gold section-container mb-16 sm:mb-24" />

      {/* Mission */}
      <section className="section-container pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="section-label mb-4">Our Mission</p>
            <h2 className="headline-xl text-3xl sm:text-4xl text-cream mb-6">
              Online luxury,
              <br />
              <span className="text-gradient-gold">human touch.</span>
            </h2>
            <p className="text-cream/45 text-base leading-relaxed font-light mb-6">
              {brand.mission}
            </p>
            <p className="text-cream/35 text-sm leading-relaxed font-light">
              {brand.online}
            </p>
          </div>
          <div className="glass-panel rounded-2xl aspect-[4/3] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-gold/10" />
            <div className="absolute inset-0 texture-grain opacity-25" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-[100px] sm:text-[140px] text-gold/10">A</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="section-label mb-1">Est. MMXX</p>
              <p className="font-serif text-xl text-cream/80">Azwah Enterprises</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-[#041a12] border-y border-gold/10">
        <div className="section-container">
          <div className="text-center mb-12 sm:mb-16">
            <p className="section-label mb-4">What We Stand For</p>
            <h2 className="headline-xl text-3xl sm:text-4xl text-cream">
              Our <span className="text-gradient-gold">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-panel rounded-xl p-6 sm:p-8"
              >
                <h3 className="font-serif text-xl text-gold-soft mb-3">{v.title}</h3>
                <p className="text-cream/45 text-sm leading-relaxed font-light">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Own ingredients */}
      <section className="section-pad">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <p className="section-label mb-4">Own Ingredients</p>
              <h2 className="headline-xl text-3xl sm:text-4xl text-cream mb-6">
                Composed, not
                <br />
                <span className="text-gradient-gold">assembled.</span>
              </h2>
              <p className="text-cream/45 text-base leading-relaxed font-light mb-8">
                {brand.ingredientsStory}
              </p>
              <Link
                href="/#ingredients"
                className="text-[10px] tracking-[0.3em] uppercase text-gold/60 hover:text-gold-soft transition-colors link-underline"
              >
                Explore Ingredients →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {ingredients.slice(0, 6).map((ing) => (
                <div
                  key={ing.name}
                  className="glass-panel rounded-xl p-4 sm:p-5 text-center"
                >
                  <span className="text-2xl text-gold-soft block mb-2">{ing.icon}</span>
                  <p className="font-serif text-cream text-sm">{ing.name}</p>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-cream/30 mt-1">
                    {ing.origin}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* J. Perfume & Brands */}
      <section className="section-pad bg-[#041a12] border-y border-gold/10">
        <div className="section-container">
          <div className="text-center mb-12 sm:mb-16">
            <p className="section-label mb-4">Partner Houses</p>
            <h2 className="headline-xl text-3xl sm:text-4xl text-cream mb-4">
              Men · Women · <span className="text-gradient-gold">All Brands</span>
            </h2>
            <p className="text-cream/40 text-sm max-w-xl mx-auto font-light">
              From our own Azwah compositions to J. Perfume and curated international houses.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {brands.map((brandItem) => (
              <div
                key={brandItem.id}
                className={`glass-panel rounded-xl p-6 sm:p-8 relative overflow-hidden ${
                  brandItem.highlight ? "border border-gold/25 gold-glow" : ""
                }`}
              >
                {brandItem.highlight && (
                  <span className="absolute top-4 right-4 text-[9px] tracking-[0.2em] uppercase text-gold-soft bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
                    Featured
                  </span>
                )}
                <p className="section-label mb-2">{brandItem.tagline}</p>
                <h3 className="font-serif text-2xl text-cream mb-3">{brandItem.name}</h3>
                <p className="text-cream/40 text-sm font-light leading-relaxed">{brandItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad">
        <div className="section-container max-w-3xl">
          <p className="section-label mb-4 text-center">Our Journey</p>
          <h2 className="headline-xl text-3xl sm:text-4xl text-cream text-center mb-12 sm:mb-16">
            The <span className="text-gradient-gold">Story</span>
          </h2>
          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 sm:gap-8"
              >
                <div className="shrink-0 w-20 sm:w-24">
                  <p className="font-serif text-gold text-sm sm:text-base">{item.year}</p>
                </div>
                <div className="flex-1 pb-8 border-b border-gold/10 last:border-0">
                  <p className="text-cream/50 text-sm sm:text-base font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad border-t border-gold/10">
        <div className="section-container text-center">
          <p className="section-label mb-4">Begin Your Journey</p>
          <h2 className="headline-xl text-3xl sm:text-4xl text-cream mb-6">
            {brand.tagline}
          </h2>
          <p className="text-cream/40 text-sm max-w-md mx-auto mb-10 font-light">
            Browse the collection, order online, or speak with our concierge for a private consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton href="/products">Shop Collection</MagneticButton>
            <MagneticButton href={contact.whatsapp}>WhatsApp Concierge</MagneticButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
