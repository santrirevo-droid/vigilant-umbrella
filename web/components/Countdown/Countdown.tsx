"use client";

import { useEffect, useRef, useState } from "react";
import FloralLayer from "@/components/FloralLayer";
import SectionHeading from "@/components/SectionHeading";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { WEDDING_DATE_ISO } from "@/lib/weddingData";

const WEDDING_DATE = new Date(WEDDING_DATE_ISO).getTime();

function getTimeLeft() {
  const diff = Math.max(0, WEDDING_DATE - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

export default function Countdown() {
  const sectionRef = useRef<HTMLElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  const coupleRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef);
  useRevealOnScroll(sectionRef, { selector: "[data-reveal-faint]", opacity: 0.5 });
  useFloralParallax(sectionRef, sprayRef);
  useFloralParallax(sectionRef, coupleRef);

  // lazy init so the first paint already shows real numbers instead of
  // "--"; the value legitimately differs between server and client render
  // (it's a live clock), so the digits below carry suppressHydrationWarning
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 text-center"
    >
      <div
        data-reveal-faint
        className="pointer-events-none absolute right-0 top-0 w-24 select-none opacity-50 sm:w-32"
      >
        <FloralLayer
          ref={sprayRef}
          src="/floral/floral-wc-spray-b.png"
          width={571}
          height={509}
          className="h-auto w-full -scale-x-100"
        />
      </div>

      <div
        data-reveal
        className="pointer-events-none absolute bottom-0 right-0 z-20 w-28 select-none drop-shadow-[0_10px_20px_rgba(43,20,32,0.25)] sm:w-40"
      >
        <FloralLayer
          ref={coupleRef}
          src="/couple/couple-veil.png"
          width={904}
          height={1420}
          className="h-auto w-full"
        />
      </div>

      <div className="mx-auto max-w-md">
        <SectionHeading eyebrow="Save The Date" />

        <p data-reveal className="-mt-2 font-display text-2xl italic text-ink-soft sm:text-3xl">
          18 Agustus 2026
        </p>

        <div data-reveal className="mt-10 grid grid-cols-4 gap-3">
          {cells.map((cell) => (
            <div
              key={cell.label}
              className="rounded-2xl border border-gold/45 bg-paper px-2 py-5 shadow-[0_10px_28px_-16px_rgba(169,131,74,0.4)]"
            >
              <div
                suppressHydrationWarning
                className="font-display text-3xl text-gold-dark tabular-nums sm:text-4xl"
              >
                {String(cell.value).padStart(2, "0")}
              </div>
              <div className="mt-1.5 font-accent text-[9.5px] uppercase tracking-[0.18em] text-ink-mute">
                {cell.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
