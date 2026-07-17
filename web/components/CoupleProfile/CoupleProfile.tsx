"use client";

import { useRef } from "react";
import FloralLayer from "@/components/FloralLayer";
import SectionHeading from "@/components/SectionHeading";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useIdleFloat } from "@/hooks/useIdleFloat";
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
  const coupleRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef);
  useRevealOnScroll(sectionRef, { selector: "[data-reveal-faint]", opacity: 0.8 });
  useFloralParallax(sectionRef, coupleRef);
  useIdleFloat(coupleRef);

  const initial = name.trim().charAt(0);
  const isBride = id === "bride";
  const coupleCorner = floralSide === "left" ? "right" : "left";
  const couplePose = isBride
    ? { src: "/couple/couple-exchange.png", width: 744, height: 1423 }
    : { src: "/couple/couple-akad.png", width: 899, height: 1443 };

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24"
    >
      <div
        data-reveal-faint
        className={[
          "pointer-events-none absolute top-0 w-24 select-none opacity-80 sm:w-32",
          floralSide === "left" ? "left-0" : "right-0",
        ].join(" ")}
      >
        <FloralLayer
          src="/floral/left-top.svg"
          width={300}
          height={300}
          className={floralSide === "left" ? "h-auto w-full" : "h-auto w-full -scale-x-100"}
        />
      </div>

      <div
        data-reveal
        className={[
          "pointer-events-none absolute bottom-0 z-20 w-28 select-none drop-shadow-[0_10px_20px_rgba(43,20,32,0.25)] sm:w-40",
          coupleCorner === "left" ? "left-0" : "right-0",
        ].join(" ")}
      >
        <FloralLayer
          ref={coupleRef}
          src={couplePose.src}
          width={couplePose.width}
          height={couplePose.height}
          className="h-auto w-full"
        />
      </div>

      <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
        <SectionHeading eyebrow={eyebrow} />

        <div
          data-reveal
          className="mt-2 flex h-32 w-32 items-center justify-center rounded-full border border-gold/60 bg-gradient-to-b from-cream to-beige/60 shadow-[0_18px_40px_-16px_rgba(169,131,74,0.35)] sm:h-36 sm:w-36"
        >
          <span className="font-display text-6xl font-medium text-gold-dark">{initial}</span>
        </div>

        <h3
          data-reveal
          className="mt-6 max-w-full font-display text-[clamp(2rem,8vw,2.75rem)] font-semibold leading-tight tracking-wide text-gold-dark"
        >
          {name}
        </h3>

        <p data-reveal className="mt-4 max-w-xs font-body text-base leading-relaxed text-ink-soft">
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
            className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gold-dark transition-colors hover:text-ink"
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
