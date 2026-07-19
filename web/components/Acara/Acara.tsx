"use client";

import { useEffect, useRef, useState } from "react";
import FloralLayer from "@/components/FloralLayer";
import SectionHeading from "@/components/SectionHeading";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { CALENDAR_ICS_URL } from "@/lib/calendar";
import { WEDDING_DATE_ISO, events, venue } from "@/lib/weddingData";

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

export default function Acara() {
  const sectionRef = useRef<HTMLElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef);
  useFloralParallax(sectionRef, sprayRef);

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
      id="acara"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 w-24 select-none sm:w-32"
      >
        <FloralLayer
          ref={sprayRef}
          src="/floral/floral-wc-spray-c.png"
          width={324}
          height={321}
          sizes="(min-width: 640px) 128px, 96px"
          className="h-auto w-full -scale-x-100"
        />
      </div>

      <div className="mx-auto max-w-md">
        <SectionHeading eyebrow="Acara" />

        <p data-reveal className="mt-1 font-display text-xl font-semibold tracking-wide text-accent">
          18 Agustus 2026
        </p>

        <div data-reveal className="mt-8 grid grid-cols-4 gap-3">
          {cells.map((cell) => (
            <div
              key={cell.label}
              className="rounded-2xl border border-border bg-paper px-2 py-6 shadow-[0_10px_28px_-16px_rgba(74,30,43,0.18)]"
            >
              <div
                suppressHydrationWarning
                className="font-display text-[32px] font-semibold text-gold tabular-nums"
              >
                {String(cell.value).padStart(2, "0")}
              </div>
              <div className="mt-2 font-accent text-[10.5px] uppercase tracking-[0.3em] text-ink-soft opacity-70">
                {cell.label}
              </div>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-6 grid grid-cols-2 gap-3">
          {events.map((event) => (
            <div
              key={event.title}
              className="rounded-2xl border border-border bg-paper px-4 py-6 shadow-[0_10px_28px_-16px_rgba(74,30,43,0.18)]"
            >
              <h3 className="font-display text-lg font-medium text-ink">{event.title}</h3>
              <div className="mx-auto mt-2 h-px w-8 bg-gold" />
              <p className="mt-3 font-body text-sm font-semibold text-gold">{event.time}</p>
              <p className="mt-1 font-body text-xs text-ink-soft">{event.date}</p>
            </div>
          ))}
        </div>

        <div
          data-reveal
          className="mt-4 rounded-2xl border border-border bg-paper px-6 py-8"
        >
          <p className="font-accent text-sm font-medium tracking-[0.12em] text-ink-soft [font-variant-caps:small-caps]">
            Bertempat di
          </p>
          <h3 className="mt-3 font-display text-xl font-medium text-ink">{venue.name}</h3>
          <p className="mt-1 font-body text-[15px] text-ink-soft">{venue.location}</p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold-dark px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-paper shadow-[0_10px_26px_-10px_rgba(122,59,71,0.55)] transition-[filter] hover:brightness-90"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-paper" />
              Lihat Lokasi
            </a>

            <a
              href={CALENDAR_ICS_URL}
              download="Pernikahan-Falah-Risyqaa.ics"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold-dark px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark transition-[filter] hover:brightness-90"
            >
              Simpan ke Kalender
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
