"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSceneState } from "@/components/providers/SceneProvider";
import { MobileNav } from "@/components/layout/MobileNav";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Navigation() {
  const { progress } = useSceneState();
  const showLinks = progress > 0.88;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="nav-glass fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 flex items-center justify-between safe-top"
    >
      <Link href="/" className="flex items-baseline gap-1.5 sm:gap-2 min-w-0">
        <span className="font-serif text-base sm:text-lg md:text-xl text-cream tracking-[0.15em] sm:tracking-[0.2em] uppercase truncate">
          Azwah
        </span>
        <span className="hidden sm:inline text-cream/30 text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase">
          Enterprises
        </span>
      </Link>

      <motion.div
        className="hidden lg:flex items-center gap-8 xl:gap-10"
        animate={{ opacity: showLinks ? 1 : 0.4 }}
      >
        {[
          { label: "Collection", href: "#collection" },
          { label: "Brands", href: "#brands" },
          { label: "Ingredients", href: "#ingredients" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "#contact" },
        ].map((item) =>
          item.href.startsWith("/") ? (
            <Link
              key={item.label}
              href={item.href}
              className="text-cream/45 text-[10px] tracking-[0.25em] xl:tracking-[0.3em] uppercase hover:text-gold-soft transition-colors duration-500 link-underline whitespace-nowrap"
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="text-cream/45 text-[10px] tracking-[0.25em] xl:tracking-[0.3em] uppercase hover:text-gold-soft transition-colors duration-500 link-underline whitespace-nowrap"
            >
              {item.label}
            </a>
          )
        )}
      </motion.div>

      <div className="flex items-center gap-2 sm:gap-3">
        <MagneticButton
          href="#contact"
          className="!px-4 !py-2 !text-[9px] sm:!text-[10px] hidden md:inline-flex"
        >
          Order Online
        </MagneticButton>
        <MobileNav />
      </div>
    </motion.nav>
  );
}
