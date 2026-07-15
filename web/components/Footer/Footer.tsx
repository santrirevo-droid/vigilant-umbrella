"use client";

import { useRef } from "react";
import FloralLayer from "@/components/FloralLayer";
import SectionHeading from "@/components/SectionHeading";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { couple } from "@/lib/weddingData";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef);

  return (
    <footer
      id="footer"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink px-6 py-24 text-center"
    >
      <FloralLayer
        src="/floral/footer-sprig.svg"
        width={220}
        height={220}
        className="pointer-events-none absolute left-0 top-0 w-32 select-none sm:w-40"
      />
      <FloralLayer
        src="/floral/footer-sprig.svg"
        width={220}
        height={220}
        className="pointer-events-none absolute bottom-0 right-0 w-32 rotate-180 select-none sm:w-40"
      />

      <div className="relative mx-auto max-w-md">
        <p data-reveal className="font-display text-base italic text-warm-white/80">
          Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami
          sekeluarga mengucapkan terima kasih.
        </p>
        <p data-reveal className="mt-3 font-display text-base italic text-warm-white/80">
          Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </p>

        <div className="mt-10">
          <SectionHeading eyebrow="Kami Yang Berbahagia" dark />
        </div>

        <h2 data-reveal className="mt-2 flex flex-col items-center gap-1">
          <span className="font-script text-[clamp(2.5rem,13vw,4.5rem)] leading-none text-warm-white">
            {couple.groom.shortName}
          </span>
          <span className="my-0.5 font-display text-xl italic text-gold-light">
            &amp;
          </span>
          <span className="font-script text-[clamp(2.5rem,13vw,4.5rem)] leading-none text-warm-white">
            {couple.bride.shortName}
          </span>
        </h2>

        <p data-reveal className="mt-10 text-[10px] uppercase tracking-[0.3em] text-warm-white/40">
          Made with GSAP &amp; Lenis
        </p>
      </div>
    </footer>
  );
}
