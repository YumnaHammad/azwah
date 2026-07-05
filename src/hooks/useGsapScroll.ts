"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useFadeUp<T extends HTMLElement>(
  delay = 0,
  start = "top 85%"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 40 });

    const anim = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [delay, start]);

  return ref;
}
