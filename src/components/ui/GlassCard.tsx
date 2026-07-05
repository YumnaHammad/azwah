"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <motion.div
      className={`glass-panel rounded-2xl gold-glow ${className}`}
      whileHover={{
        y: -6,
        boxShadow: "0 0 60px rgba(184, 154, 62, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
