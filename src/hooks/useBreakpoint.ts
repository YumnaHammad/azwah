"use client";

import { useEffect, useState } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

const MOBILE_MAX = 767;
const TABLET_MAX = 1023;

function getBreakpoint(width: number): Breakpoint {
  if (width <= MOBILE_MAX) return "mobile";
  if (width <= TABLET_MAX) return "tablet";
  return "desktop";
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    if (typeof window === "undefined") return "desktop";
    return getBreakpoint(window.innerWidth);
  });

  useEffect(() => {
    const update = () => setBreakpoint(getBreakpoint(window.innerWidth));
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return breakpoint;
}

export function useIsMobile() {
  const bp = useBreakpoint();
  return bp === "mobile";
}

export function useIsTablet() {
  const bp = useBreakpoint();
  return bp === "tablet";
}

export function usePreferLightScene() {
  const bp = useBreakpoint();
  return bp === "mobile" || bp === "tablet";
}

export function useIsTouchDevice() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(
      window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window
    );
  }, []);

  return touch;
}

/** Scroll story height per device */
export function getScrollHeight(bp: Breakpoint) {
  switch (bp) {
    case "mobile":
      return "min(420vh, 3200px)";
    case "tablet":
      return "min(520vh, 4200px)";
    default:
      return "650vh";
  }
}

/** When content sections fade in */
export function getContentThreshold(bp: Breakpoint) {
  switch (bp) {
    case "mobile":
      return 0.72;
    case "tablet":
      return 0.78;
    default:
      return 0.8;
  }
}
