"use client";

import { motion } from "framer-motion";
import { useSceneState } from "@/components/providers/SceneProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Navigation() {
  const { progress } = useSceneState();
  const showLinks = progress > 0.88;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="nav-glass fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 md:py-6 flex items-center justify-between"
    >
      <a href="#" className="flex items-baseline gap-2">
        <span className="font-serif text-lg md:text-xl text-cream tracking-[0.2em] uppercase">
          Azwah
        </span>
        <span className="hidden md:inline text-cream/30 text-[10px] tracking-[0.35em] uppercase">
          Enterprises
        </span>
      </a>

      <motion.div
        className="hidden md:flex items-center gap-10"
        animate={{ opacity: showLinks ? 1 : 0.4 }}
      >
        {["Collection", "Ingredients", "About"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-cream/45 text-[10px] tracking-[0.3em] uppercase hover:text-gold-soft transition-colors duration-500"
          >
            {item}
          </a>
        ))}
      </motion.div>

      <MagneticButton className="!px-5 !py-2 !text-[10px] hidden sm:inline-flex">
        Discover
      </MagneticButton>
    </motion.nav>
  );
}
