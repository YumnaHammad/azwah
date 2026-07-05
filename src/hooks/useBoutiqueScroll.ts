"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScene } from "@/components/providers/SceneProvider";

gsap.registerPlugin(ScrollTrigger);

export function useBoutiqueScroll() {
  const ref = useRef<HTMLElement>(null);
  const { setBoutiqueProgress, setViewMode } = useScene();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const enter = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => setViewMode("boutique"),
      onEnterBack: () => setViewMode("boutique"),
      onLeave: () => setViewMode("bottle"),
      onLeaveBack: () => setViewMode("bottle"),
    });

    const scrub = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => setBoutiqueProgress(self.progress),
    });

    return () => {
      enter.kill();
      scrub.kill();
    };
  }, [setBoutiqueProgress, setViewMode]);

  return ref;
}
