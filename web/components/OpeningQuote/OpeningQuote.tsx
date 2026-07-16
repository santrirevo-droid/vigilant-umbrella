"use client";

import { useRef } from "react";
import FloralLayer from "@/components/FloralLayer";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function OpeningQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  const coupleRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef);
  useFloralParallax(sectionRef, sprayRef);
  useFloralParallax(sectionRef, coupleRef);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh w-full items-center justify-center overflow-hidden px-6 text-center"
    >
      <FloralLayer
        ref={sprayRef}
        src="/floral/floral-wc-spray-a.png"
        width={302}
        height={424}
        className="pointer-events-none absolute left-0 top-0 w-20 select-none opacity-50 sm:w-28"
      />

      <div
        data-reveal
        className="pointer-events-none absolute bottom-0 left-0 w-24 select-none drop-shadow-[0_10px_20px_rgba(43,20,32,0.25)] sm:w-32"
      >
        <FloralLayer
          ref={coupleRef}
          src="/couple/couple-bouquet.png"
          width={867}
          height={1442}
          className="h-auto w-full"
        />
      </div>

      <div className="max-w-md">
        <p data-reveal className="font-accent text-[11px] font-medium uppercase tracking-[0.42em] text-gold-dark">
          Opening Quote
        </p>
        <p data-reveal className="mt-6 font-display text-2xl italic leading-relaxed text-ink-soft">
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia
          menciptakan untukmu pasangan hidup dari jenismu sendiri, agar
          kamu cenderung dan merasa tenteram kepadanya.&rdquo;
        </p>
        <p data-reveal className="mt-4 font-accent text-xs uppercase tracking-[0.3em] text-ink-mute">
          Q.S. Ar-Rum : 21
        </p>
      </div>
    </section>
  );
}
