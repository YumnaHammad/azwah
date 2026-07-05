"use client";

import dynamic from "next/dynamic";
import { SceneProvider, useSceneState } from "@/components/providers/SceneProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { StoryOverlay, HeroIntro } from "@/components/sections/StoryOverlay";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { IngredientsSection } from "@/components/sections/IngredientsSection";
import { WhySection } from "@/components/sections/WhySection";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollChapters } from "@/components/ui/ScrollChapters";
import { MobileHeroVisual } from "@/components/mobile/MobileHeroVisual";

const SceneCanvas = dynamic(
  () =>
    import("@/components/three/SceneCanvas").then((mod) => mod.SceneCanvas),
  { ssr: false }
);

function ScrollStory() {
  const scrollRef = useScrollTimeline();
  const { progress } = useSceneState();

  return (
    <div ref={scrollRef} className="relative h-[600vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroIntro />
        <StoryOverlay />
        <div
          className="absolute inset-0 bg-primary-dark/20 transition-opacity duration-700 pointer-events-none"
          style={{ opacity: Math.max(0, (progress - 0.85) * 4) }}
        />
      </div>
    </div>
  );
}

function BackgroundLayer() {
  const isMobile = useIsMobile();
  if (isMobile) return <MobileHeroVisual />;
  return <SceneCanvas />;
}

function ContentSections() {
  const { progress } = useSceneState();
  const visible = progress > 0.82;

  return (
    <div
      className="content-layer relative z-20 transition-all duration-1000"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="bg-gradient-to-b from-transparent via-primary-dark/95 to-primary-dark backdrop-blur-sm">
        <ProductsSection />
        <IngredientsSection />
        <WhySection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <SceneProvider>
      <SmoothScrollProvider>
        <main className="relative min-h-screen">
          <BackgroundLayer />
          <Navigation />
          <ScrollChapters />
          <ScrollStory />
          <ContentSections />
        </main>
      </SmoothScrollProvider>
    </SceneProvider>
  );
}
