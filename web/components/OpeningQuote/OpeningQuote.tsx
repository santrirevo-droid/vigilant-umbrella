"use client";

import { useRef } from "react";
import FloralLayer from "@/components/FloralLayer";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function OpeningQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef);
  useFloralParallax(sectionRef, sprayRef);

  return (
    <section
      id="ayat-pembuka"
      ref={sectionRef}
      className="relative flex min-h-svh w-full items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 w-24 select-none opacity-30 sm:w-32"
      >
        <FloralLayer
          ref={sprayRef}
          src="/floral/floral-wc-spray-a.png"
          width={302}
          height={424}
          sizes="(min-width: 640px) 128px, 96px"
          className="h-auto w-full"
        />
      </div>

      <div className="max-w-md">
        <p className="font-accent text-sm font-medium tracking-[0.12em] text-on-maroon-soft [font-variant-caps:small-caps]">
          Ayat Pembuka
        </p>

        <p
          data-reveal
          dir="rtl"
          lang="ar"
          className="mt-6 font-arabic text-[26px] leading-[1.9] text-on-maroon"
        >
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا
          لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ
          إِنَّ فِي ذٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
        </p>

        <p data-reveal className="mt-6 font-display text-lg italic leading-[1.7] text-on-maroon-soft">
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia
          menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar
          kamu hidup tenang bersamanya. Dia menjadikan di antaramu rasa
          cinta dan kasih sayang. Sungguh, pada yang demikian itu terdapat
          tanda-tanda kebesaran Allah bagi kaum yang berpikir.&rdquo;
        </p>
        <p data-reveal className="mt-5 font-accent text-xs uppercase tracking-[0.3em] text-on-maroon-soft">
          Q.S. Ar-Rum : 21
        </p>
      </div>
    </section>
  );
}
