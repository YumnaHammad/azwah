"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { STATS } from "@/lib/content";
import { CONTACT } from "@/lib/constants";

const PILLARS = [
  {
    icon: "◈",
    title: "Own Ingredients",
    body: "Oud, rose, amber, and sandalwood sourced and aged in our atelier — never mass-produced.",
  },
  {
    icon: "✦",
    title: "J. Perfume Official",
    body: "Authorized retailer for the full J. Perfume line with certificate of authenticity.",
  },
  {
    icon: "◇",
    title: "WhatsApp Concierge",
    body: "Personal guidance on men's, women's, and unisex scents. Order in minutes.",
  },
  {
    icon: "◎",
    title: "Gift Ready",
    body: "Luxury packaging, discovery sets, and travel atomizers for every occasion.",
  },
];

export function WhyAzwahSection() {
  return (
    <section className="section-pad px-0">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="luxury-card rounded-xl p-5 sm:p-6 text-center"
            >
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold mb-1">
                {stat.value}
              </p>
              <p className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-cream/40">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-10 sm:mb-14">
          <p className="section-label mb-4">Why Azwah</p>
          <h2 className="headline-xl text-2xl sm:text-3xl md:text-4xl text-cream">
            More than a
            <span className="text-gradient-gold"> perfume shop</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-panel rounded-xl p-6 sm:p-7 h-full"
            >
              <span className="text-2xl text-gold-soft block mb-4">{p.icon}</span>
              <h3 className="font-serif text-lg text-cream mb-2">{p.title}</h3>
              <p className="text-cream/40 text-sm font-light leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="luxury-card rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="section-label mb-2">Ready to order?</p>
            <p className="font-serif text-xl sm:text-2xl text-cream">
              WhatsApp us at {CONTACT.phone}
            </p>
            <p className="text-cream/40 text-sm mt-2 font-light">
              Men · Women · Unisex · J. Perfume · Gift Sets
            </p>
          </div>
          <Link
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-gold/35 bg-gold/10 text-[10px] tracking-[0.25em] uppercase text-cream hover:bg-gold/20 hover:border-gold/55 transition-all"
          >
            Chat on WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}
