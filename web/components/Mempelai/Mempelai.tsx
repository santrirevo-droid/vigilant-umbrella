"use client";

import { useRef } from "react";
import FloralLayer from "@/components/FloralLayer";
import SectionHeading from "@/components/SectionHeading";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { couple, type CoupleRole } from "@/lib/weddingData";

type Person = {
  name: string;
  father: string;
  mother: string;
  instagram: string;
};

function PersonBlock({ person, role }: { person: Person; role: CoupleRole }) {
  return (
    <div data-reveal className="flex flex-col items-center text-center">
      <h3 className="font-fullname text-2xl text-on-maroon">{person.name}</h3>

      <p className="mt-2 max-w-xs font-mempelai text-[15px] leading-[1.6] text-on-maroon-soft">
        {role === "putra" ? "Putra" : "Putri"} dari {person.father}
        <br />
        &amp; {person.mother}
      </p>

      {person.instagram && (
        <a
          href={`https://instagram.com/${person.instagram.replace(/^@/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-handle text-xs font-medium uppercase tracking-[0.2em] text-accent transition-colors hover:text-on-maroon"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
          </svg>
          {person.instagram}
        </a>
      )}
    </div>
  );
}

export default function Mempelai() {
  const sectionRef = useRef<HTMLElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef);
  useFloralParallax(sectionRef, sprayRef);

  return (
    <section
      id="mempelai"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 w-24 select-none sm:w-32"
      >
        <FloralLayer
          ref={sprayRef}
          src="/floral/floral-wc-spray-b.png"
          width={571}
          height={509}
          sizes="(min-width: 640px) 128px, 96px"
          className="h-auto w-full -scale-x-100"
        />
      </div>

      <div className="relative mx-auto max-w-md text-center">
        <SectionHeading eyebrow="Mempelai" />

        <p data-reveal className="mx-auto mt-4 max-w-sm font-mempelai text-[15px] leading-[1.6] text-on-maroon-soft">
          Dengan memohon rahmat Allah SWT, kami bermaksud menyelenggarakan
          pernikahan putra-putri kami:
        </p>

        <div className="mt-10 flex flex-col items-center gap-8">
          <PersonBlock person={couple.bride} role="putri" />
          <span data-reveal className="font-display text-3xl italic text-accent">
            &amp;
          </span>
          <PersonBlock person={couple.groom} role="putra" />
        </div>
      </div>
    </section>
  );
}
