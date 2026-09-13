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
      id="penutup"
      ref={sectionRef}
      className="relative overflow-hidden bg-maroon px-6 py-24 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 w-28 select-none sm:w-36"
      >
        <FloralLayer
          src="/floral/footer-sprig.svg"
          width={220}
          height={220}
          sizes="(min-width: 640px) 144px, 112px"
          className="h-auto w-full"
        />
      </div>

      <div className="relative mx-auto max-w-md">
        <p data-reveal className="font-body text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
          Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </p>

        <p data-reveal className="mt-6 font-display text-lg italic leading-[1.7] text-on-maroon-soft">
          Atas kehadiran serta doa restu Bapak/Ibu/Saudara/i, kami
          sekeluarga mengucapkan terima kasih yang sebesar-besarnya.
        </p>
        <p data-reveal className="mt-3 font-display text-lg italic leading-[1.7] text-on-maroon-soft">
          Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </p>

        <div className="mt-10">
          <SectionHeading eyebrow="Kami Yang Berbahagia" kickerOnly />
        </div>

        <h2 data-reveal className="mt-2 flex flex-col items-center gap-1">
          <span className="font-script text-[clamp(3rem,15vw,5.5rem)] leading-none text-accent">
            {couple.groom.shortName}
          </span>
          <span className="my-0.5 font-script text-2xl leading-none text-accent">
            &amp;
          </span>
          <span className="font-script text-[clamp(3rem,15vw,5.5rem)] leading-none text-accent">
            {couple.bride.shortName}
          </span>
        </h2>
      </div>
    </footer>
  );
}
