"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScene } from "@/components/providers/SceneProvider";

gsap.registerPlugin(ScrollTrigger);

export function useScrollTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setProgress } = useScene();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [setProgress]);

  return containerRef;
}
