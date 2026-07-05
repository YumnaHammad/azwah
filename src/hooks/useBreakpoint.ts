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
      return "min(360vh, 2800px)";
    case "tablet":
      return "min(440vh, 3600px)";
    default:
      return "520vh";
  }
}

/** When content sections fade in */
export function getContentThreshold(bp: Breakpoint) {
  switch (bp) {
    case "mobile":
      return 0.7;
    case "tablet":
      return 0.74;
    default:
      return 0.76;
  }
}

/** Pull content up to remove dead gap after scroll story */
export function getContentPullUp(bp: Breakpoint) {
  switch (bp) {
    case "mobile":
      return "min(-108vh, -820px)";
    case "tablet":
      return "min(-115vh, -950px)";
    default:
      return "-118vh";
  }
}
