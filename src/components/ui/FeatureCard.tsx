"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

export function FeatureCard({
  title,
  description,
  icon,
  index,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <GlassCard className="p-8 h-full text-center group">
        <span className="text-2xl text-gold block mb-5 group-hover:scale-110 transition-transform duration-500 inline-block">
          {icon}
        </span>
        <h3 className="font-serif text-xl text-cream mb-3">{title}</h3>
        <p className="text-cream/45 text-sm leading-relaxed font-light">
          {description}
        </p>
      </GlassCard>
    </motion.div>
  );
}
