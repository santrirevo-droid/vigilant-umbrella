"use client";

import { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { events, venue } from "@/lib/weddingData";

export default function Event() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef);

  return (
    <section id="event" ref={sectionRef} className="bg-warm-white px-6 py-24 text-center">
      <div className="mx-auto max-w-md">
        <SectionHeading eyebrow="Rangkaian Acara" />

        <div className="mt-10 flex flex-col gap-4">
          {events.map((event) => (
            <div
              key={event.title}
              data-reveal
              className="rounded-2xl border border-gold/30 bg-cream/60 px-6 py-8 shadow-[0_14px_36px_-20px_rgba(169,131,74,0.4)]"
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
          className="mt-6 rounded-2xl border border-gold/30 bg-cream/60 px-6 py-8"
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
