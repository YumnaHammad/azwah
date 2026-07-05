"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsTouchDevice } from "@/hooks/useBreakpoint";

export function CursorSpotlight() {
  const isTouch = useIsTouchDevice();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [isTouch]);

  if (isTouch || !visible) return null;

  return (
    <motion.div
      className="cursor-spotlight hidden lg:block"
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.5 }}
    />
  );
}
