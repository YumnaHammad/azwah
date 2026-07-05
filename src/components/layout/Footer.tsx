"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BRAND } from "@/lib/constants";

const NAV = [
  { label: "Collection", href: "/products" },
  { label: "Brands", href: "/#brands" },
  { label: "Ingredients", href: "/#ingredients" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];
const SOCIAL = ["Instagram", "Pinterest", "LinkedIn"];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative pt-16 sm:pt-20 pb-8 sm:pb-10 px-0 overflow-hidden safe-bottom">
      <div className="section-container">
      <div className="divider-gold mb-12 sm:mb-16">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mt-[-1px]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        <div className="lg:col-span-1">
          <p className="font-serif text-xl text-cream tracking-[0.2em] uppercase mb-4">
            Azwah
          </p>
          <p className="text-cream/35 text-sm leading-relaxed font-light max-w-xs">
            {BRAND.tagline} Composing fragrances for the discerning few since our founding.
          </p>
        </div>

        <div>
          <p className="section-label mb-5">Navigate</p>
          <ul className="space-y-3">
            {NAV.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-cream/40 text-sm hover:text-gold-soft transition-colors duration-500 link-underline inline-block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-label mb-5">Follow</p>
          <ul className="space-y-3">
            {SOCIAL.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-cream/40 text-sm hover:text-gold-soft transition-colors duration-500 link-underline inline-block"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-label mb-5">Newsletter</p>
          <p className="text-cream/35 text-sm font-light mb-4">
            Receive invitations to private launches and olfactory journeys.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 bg-white/5 border border-gold/15 rounded-full px-4 py-2.5 text-sm text-cream placeholder:text-cream/25 focus:outline-none focus:border-gold/40 transition-colors"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-full border border-gold/25 text-[10px] tracking-[0.2em] uppercase text-cream/60 hover:text-gold-soft hover:border-gold/50 transition-all"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gold/10 text-center sm:text-left">
        <p className="text-cream/20 text-xs tracking-wider">
          © 2026 Azwah Enterprises. All rights reserved.
        </p>
        <MagneticButton href="/products" className="!px-5 !py-2.5 !text-[10px] w-full sm:w-auto justify-center">
          Discover Collection
        </MagneticButton>
      </div>
      </div>
    </footer>
  );
}
