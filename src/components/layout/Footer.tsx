"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative py-16 px-6 md:px-12 border-t border-gold/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="font-serif text-lg text-cream tracking-[0.15em] uppercase">
            Azwah Enterprises
          </p>
          <p className="text-cream/30 text-xs mt-2 tracking-wider">
            Pure Luxury · Timeless Essence
          </p>
        </div>

        <div className="flex gap-8">
          {["Instagram", "Contact", "Boutiques"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-cream/40 text-xs tracking-[0.2em] uppercase hover:text-gold-soft transition-colors duration-500"
            >
              {link}
            </a>
          ))}
        </div>

        <motion.p
          className="text-cream/20 text-xs tracking-wider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © 2026 Azwah Enterprises
        </motion.p>
      </div>
    </footer>
  );
}
