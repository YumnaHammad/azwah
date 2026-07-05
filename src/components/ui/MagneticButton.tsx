"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.18,
      y: (e.clientY - rect.top - rect.height / 2) * 0.18,
    });
  };

  const sharedClasses = `
    relative inline-flex items-center justify-center
    px-9 py-3.5 rounded-full
    border border-gold/25
    bg-gold/[0.04]
    text-cream text-[11px] tracking-[0.25em] uppercase font-light
    transition-all duration-500
    hover:border-gold/50 hover:bg-gold/10 hover:shadow-[0_0_30px_rgba(184,154,62,0.15)]
    overflow-hidden
    ${className}
  `;

  const motionProps = {
    animate: { x: position.x, y: position.y },
    transition: { type: "spring" as const, stiffness: 180, damping: 18 },
    onMouseMove: handleMouse,
    onMouseLeave: () => setPosition({ x: 0, y: 0 }),
  };

  const shimmer = (
    <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
  );

  if (href) {
    return (
      <motion.a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={sharedClasses} {...motionProps}>
        {shimmer}
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button ref={ref as React.RefObject<HTMLButtonElement>} onClick={onClick} className={sharedClasses} {...motionProps}>
      {shimmer}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
