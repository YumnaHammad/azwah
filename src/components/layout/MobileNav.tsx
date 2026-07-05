"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";

const LINKS = [
  { label: "Collection", href: "/products" },
  { label: "Brands", href: "/#brands" },
  { label: "Ingredients", href: "/#ingredients" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="lg:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`block h-px w-6 bg-cream/80 transition-all duration-300 ${
            open ? "rotate-45 translate-y-[3.5px]" : ""
          }`}
        />
        <span
          className={`block h-px w-6 bg-cream/80 transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-[3.5px]" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-primary-dark/90 backdrop-blur-xl lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 right-0 z-[58] pt-[max(6rem,calc(env(safe-area-inset-top)+4rem))] pb-10 px-6 sm:px-8 safe-bottom lg:hidden"
            >
              <ul className="space-y-6">
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-serif text-3xl sm:text-4xl text-cream hover:text-gold-soft transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10">
                <MagneticButton
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="w-full justify-center"
                >
                  Order Online
                </MagneticButton>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
