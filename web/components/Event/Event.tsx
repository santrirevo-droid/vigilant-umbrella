"use client";

import { useRef } from "react";
import FloralLayer from "@/components/FloralLayer";
import SectionHeading from "@/components/SectionHeading";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { events, venue } from "@/lib/weddingData";

export default function Event() {
  const sectionRef = useRef<HTMLElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  const coupleRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef);
  useFloralParallax(sectionRef, sprayRef);
  useFloralParallax(sectionRef, coupleRef);

  return (
    <section
      id="event"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 text-center"
    >
      <FloralLayer
        ref={sprayRef}
        src="/floral/floral-wc-spray-c.png"
        width={324}
        height={321}
        className="pointer-events-none absolute left-0 top-0 w-20 select-none opacity-50 sm:w-28"
      />

      <div
        data-reveal
        className="pointer-events-none absolute bottom-0 left-0 w-24 select-none drop-shadow-[0_10px_20px_rgba(43,20,32,0.25)] sm:w-32"
      >
        <FloralLayer
          ref={coupleRef}
          src="/couple/couple-bouquet.png"
          width={867}
          height={1442}
          className="h-auto w-full"
        />
      </div>

      <div className="mx-auto max-w-md">
        <SectionHeading eyebrow="Rangkaian Acara" />

        <div className="mt-10 flex flex-col gap-4">
          {events.map((event) => (
            <div
              key={event.title}
              data-reveal
              className="rounded-2xl border border-gold/45 bg-paper px-6 py-8 shadow-[0_14px_36px_-20px_rgba(169,131,74,0.4)]"
            >
              <h3 className="font-display text-2xl text-ink">{event.title}</h3>
              <div className="mx-auto mt-3 h-px w-9 bg-gold" />
              <p className="mt-3 text-sm tracking-wide text-gold-dark">{event.time}</p>
              <p className="mt-1 text-xs font-light text-ink-soft">{event.date}</p>
            </div>
          ))}
        </div>

        <div
          data-reveal
          className="mt-6 rounded-2xl border border-gold/45 bg-paper px-6 py-8"
        >
          <p className="font-accent text-[11px] uppercase tracking-[0.24em] text-ink-mute">
            Bertempat di
          </p>
          <h3 className="mt-3 font-display text-xl text-ink">{venue.name}</h3>
          <p className="mt-1 text-xs font-light text-ink-soft">{venue.location}</p>
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-paper shadow-[0_10px_26px_-10px_rgba(169,131,74,0.55)] transition-opacity hover:opacity-90"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-paper" />
            Lihat Lokasi
          </a>
        </div>
      </div>
    </section>
  );
}
