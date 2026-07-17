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
      <div
        data-reveal
        className="pointer-events-none absolute left-0 top-0 w-32 select-none sm:w-40"
      >
        <FloralLayer
          src="/floral/footer-sprig.svg"
          width={220}
          height={220}
          className="h-auto w-full"
        />
      </div>
      <div
        data-reveal
        className="pointer-events-none absolute bottom-0 right-0 w-32 select-none sm:w-40"
      >
        <FloralLayer
          src="/floral/footer-sprig.svg"
          width={220}
          height={220}
          className="h-auto w-full rotate-180"
        />
      </div>

      <div className="relative mx-auto max-w-md">
        <p data-reveal className="font-display text-lg italic leading-relaxed text-paper/80">
          Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami
          sekeluarga mengucapkan terima kasih.
        </p>
        <p data-reveal className="mt-3 font-display text-lg italic leading-relaxed text-paper/80">
          Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </p>

        <div className="mt-10">
          <SectionHeading eyebrow="Kami Yang Berbahagia" dark kickerOnly />
        </div>

        <h2 data-reveal className="mt-2 flex flex-col items-center gap-1">
          <span className="font-display text-[clamp(2.5rem,13vw,4.5rem)] font-semibold leading-none tracking-wide text-gold-light">
            {couple.groom.shortName}
          </span>
          <span className="my-0.5 font-accent text-lg text-gold-light">
            &amp;
          </span>
          <span className="font-display text-[clamp(2.5rem,13vw,4.5rem)] font-semibold leading-none tracking-wide text-gold-light">
            {couple.bride.shortName}
          </span>
        </h2>
      </div>
    </footer>
  );
}
