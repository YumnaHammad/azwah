"use client";

import dynamic from "next/dynamic";
import { SceneProvider, useSceneState } from "@/components/providers/SceneProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import {
  useBreakpoint,
  getScrollHeight,
  getContentThreshold,
  getContentPullUp,
} from "@/hooks/useBreakpoint";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { StoryOverlay, HeroIntro } from "@/components/sections/StoryOverlay";
import { PromoCarouselSection } from "@/components/sections/PromoCarouselSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyAzwahSection } from "@/components/sections/WhyAzwahSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { IngredientsSection } from "@/components/sections/IngredientsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ScrollChapters } from "@/components/ui/ScrollChapters";
import { MobileScrollProgress } from "@/components/ui/MobileScrollProgress";
import { AtmosphereOverlay } from "@/components/ui/AtmosphereOverlay";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { MobileHeroVisual } from "@/components/mobile/MobileHeroVisual";

const SceneCanvas = dynamic(
  () => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas),
  { ssr: false }
);

function ScrollStory() {
  const scrollRef = useScrollTimeline();
  const { progress, fragranceSpread } = useSceneState();
  const bp = useBreakpoint();

  return (
    <div
      ref={scrollRef}
      className="relative"
      style={{ height: getScrollHeight(bp) }}
    >
      <div className="sticky top-0 h-[100dvh] min-h-screen overflow-hidden flex flex-col">
        <div className="relative flex-1 min-h-0 overflow-hidden">
          <HeroIntro />
          <StoryOverlay />
          <AtmosphereOverlay />
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-1000"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(216,198,106,${fragranceSpread * 0.08}) 0%, transparent 70%)`,
              opacity: Math.max(0, (progress - 0.82) * 3),
            }}
          />
        </div>
        {/* Logo banner — pinned to bottom of hero */}
        <LogoMarquee className="shrink-0 z-[25] border-t border-gold/20 max-xl:mb-12 xl:mb-0 safe-bottom" />
      </div>
    </div>
  );
}

function BackgroundLayer() {
  const bp = useBreakpoint();
  const { progress } = useSceneState();
  if (progress > 0.8) return null;
  if (bp === "mobile") return <MobileHeroVisual />;
  return <SceneCanvas compact={bp === "tablet"} />;
}

function ContentSections() {
  const { progress } = useSceneState();
  const bp = useBreakpoint();
  const threshold = getContentThreshold(bp);
  const visible = progress > threshold;
  const pullUp = getContentPullUp(bp);

  return (
    <div
      className="content-layer relative z-20 transition-all duration-500 isolate"
      style={{
        marginTop: pullUp,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="section-bg">
        <ProductsSection />
        <PromoCarouselSection />
        <BrandsSection />
        <TestimonialsSection />
        <ServicesSection />
        <IngredientsSection />
        <WhyAzwahSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <SceneProvider>
      <SmoothScrollProvider>
        <main className="relative min-h-screen overflow-x-hidden">
          <BackgroundLayer />
          <CursorSpotlight />
          <Navigation />
          <ScrollChapters />
          <MobileScrollProgress />
          <ScrollStory />
          <ContentSections />
        </main>
      </SmoothScrollProvider>
    </SceneProvider>
  );
}
