"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const texts = [text1Ref.current, text2Ref.current, text3Ref.current];
    texts.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, y: 50 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    if (text1Ref.current) {
      tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 0.3 }).to(
        text1Ref.current,
        { opacity: 0, y: -30, duration: 0.3 },
        "+=0.2"
      );
    }
    if (text2Ref.current) {
      tl.to(text2Ref.current, { opacity: 1, y: 0, duration: 0.3 }, "-=0.1").to(
        text2Ref.current,
        { opacity: 0, y: -30, duration: 0.3 },
        "+=0.2"
      );
    }
    if (text3Ref.current) {
      tl.to(text3Ref.current, { opacity: 1, y: 0, duration: 0.3 }, "-=0.1");
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div ref={text1Ref} className="absolute inset-0 flex items-center justify-center px-6">
          <div>
            <p className="section-label mb-6">The Essence</p>
            <h2 className="headline-xl text-4xl md:text-6xl lg:text-7xl text-cream">
              Every drop tells
              <br />
              <span className="text-gradient-gold">a story</span>
            </h2>
            <p className="mt-8 text-cream/40 text-sm md:text-base leading-relaxed font-light max-w-md mx-auto">
              Handcrafted in the tradition of master perfumers, each fragrance
              captures the soul of rare ingredients from distant lands.
            </p>
          </div>
        </div>

        <div ref={text2Ref} className="absolute inset-0 flex items-center justify-center px-6">
          <div>
            <p className="section-label mb-6">The Ritual</p>
            <h2 className="headline-xl text-4xl md:text-6xl lg:text-7xl text-cream">
              Uncover the
              <br />
              <span className="text-gradient-gold">secret within</span>
            </h2>
            <p className="mt-8 text-cream/40 text-sm md:text-base leading-relaxed font-light max-w-md mx-auto">
              Watch as the cap releases its hold, revealing the precious elixir
              that awaits. A moment of pure anticipation.
            </p>
          </div>
        </div>

        <div ref={text3Ref} className="absolute inset-0 flex items-center justify-center px-6">
          <div>
            <p className="section-label mb-6">The Experience</p>
            <h2 className="headline-xl text-4xl md:text-6xl lg:text-7xl text-cream">
              Let the fragrance
              <br />
              <span className="text-gradient-gold">transform you</span>
            </h2>
            <p className="mt-8 text-cream/40 text-sm md:text-base leading-relaxed font-light max-w-md mx-auto">
              A gentle mist of golden essence fills the air, wrapping you in
              layers of oud, amber, and rose. Pure luxury, distilled.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
