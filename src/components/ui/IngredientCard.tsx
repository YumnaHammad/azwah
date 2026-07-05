"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";

interface IngredientCardProps {
  name: string;
  description: string;
  icon: string;
  index: number;
}

export function IngredientCard({
  name,
  description,
  icon,
  index,
}: IngredientCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <GlassCard className="p-8 h-full group cursor-default">
        <motion.span
          className="text-3xl text-gold-soft block mb-6"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.span>
        <h3 className="font-serif text-2xl text-cream mb-3 group-hover:text-gold-soft transition-colors duration-500">
          {name}
        </h3>
        <p className="text-cream/50 text-sm leading-relaxed font-light">
          {description}
        </p>
      </GlassCard>
    </motion.div>
  );
}
