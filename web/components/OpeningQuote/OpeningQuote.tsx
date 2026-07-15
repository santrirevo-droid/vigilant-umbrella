"use client";

import { useRef } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function OpeningQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh w-full items-center justify-center bg-warm-white px-6 text-center"
    >
      <div className="max-w-md">
        <p data-reveal className="font-body text-[11px] font-medium uppercase tracking-[0.42em] text-gold-dark">
          Opening Quote
        </p>
        <p data-reveal className="mt-6 font-display text-2xl italic leading-relaxed text-ink-soft">
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia
          menciptakan untukmu pasangan hidup dari jenismu sendiri, agar
          kamu cenderung dan merasa tenteram kepadanya.&rdquo;
        </p>
        <p data-reveal className="mt-4 font-body text-xs uppercase tracking-[0.3em] text-ink-mute">
          Q.S. Ar-Rum : 21
        </p>
      </div>
    </section>
  );
}
