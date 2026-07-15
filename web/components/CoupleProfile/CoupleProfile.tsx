"use client";

import { useRef } from "react";
import FloralLayer from "@/components/FloralLayer";
import SectionHeading from "@/components/SectionHeading";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

type CoupleProfileProps = {
  id?: string;
  eyebrow: string;
  name: string;
  role: "putra" | "putri";
  father: string;
  mother: string;
  instagram?: string;
  floralSide: "left" | "right";
};

export default function CoupleProfile({
  id,
  eyebrow,
  name,
  role,
  father,
  mother,
  instagram,
  floralSide,
}: CoupleProfileProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef);

  const initial = name.trim().charAt(0);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative overflow-hidden bg-warm-white px-6 py-24"
    >
      <FloralLayer
        src={floralSide === "left" ? "/floral/left-top.svg" : "/floral/right-top.svg"}
        width={240}
        height={240}
        className={[
          "pointer-events-none absolute top-0 w-24 select-none opacity-70 sm:w-32",
          floralSide === "left" ? "left-0" : "right-0 -scale-x-100",
        ].join(" ")}
      />

      <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
        <SectionHeading eyebrow={eyebrow} />

        <div
          data-reveal
          className="mt-2 flex h-32 w-32 items-center justify-center rounded-full border border-gold/60 bg-gradient-to-b from-cream to-beige/60 shadow-[0_18px_40px_-16px_rgba(169,131,74,0.35)] sm:h-36 sm:w-36"
        >
          <span className="font-script text-6xl text-gold-dark">{initial}</span>
        </div>

        <h3
          data-reveal
          className="mt-6 max-w-full font-script text-[clamp(2rem,8vw,2.75rem)] leading-tight text-ink"
        >
          {name}
        </h3>

        <p data-reveal className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ink-soft">
          {role === "putra" ? "Putra" : "Putri"} dari {father}
          <br />
          &amp; {mother}
        </p>

        {instagram && (
          <a
            data-reveal
            href={`https://instagram.com/${instagram.replace(/^@/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-dark transition-colors hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
            </svg>
            {instagram}
          </a>
        )}
      </div>
    </section>
  );
}
