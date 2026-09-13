"use client";

import { useRef } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import FloralLayer from "@/components/FloralLayer";
import SectionHeading from "@/components/SectionHeading";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { events, venue } from "@/lib/weddingData";

export default function Acara() {
  const sectionRef = useRef<HTMLElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.12 });
  useFloralParallax(sectionRef, sprayRef);

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
          width={585}
          height={579}
          sizes="(min-width: 640px) 128px, 96px"
          className="h-auto w-full"
        />
      </div>

      <div className="relative mx-auto max-w-md">
        <SectionHeading eyebrow="Acara" title="Waktu &amp; Tempat" />

        <div className="mt-10 flex flex-col gap-5">
          {events.map((event) => (
            <div
              key={event.title}
              data-reveal
              className="rounded-2xl border border-border bg-paper px-6 py-7 shadow-[0_14px_36px_-22px_rgba(74,30,43,0.25)]"
            >
              <div className="font-display text-xl font-medium text-ink">{event.title}</div>
              <div className="mt-3 flex items-center justify-center gap-2 font-body text-sm text-ink-soft">
                <Calendar size={15} className="shrink-0 text-gold" aria-hidden="true" />
                {event.date}
              </div>
              <div className="mt-1.5 flex items-center justify-center gap-2 font-body text-sm text-ink-soft">
                <Clock size={15} className="shrink-0 text-gold" aria-hidden="true" />
                {event.time}
              </div>
            </div>
          ))}

          <div
            data-reveal
            className="rounded-2xl border border-border bg-paper px-6 py-7 shadow-[0_14px_36px_-22px_rgba(74,30,43,0.25)]"
          >
            <div className="flex items-center justify-center gap-2 font-display text-xl font-medium text-ink">
              <MapPin size={17} className="shrink-0 text-gold" aria-hidden="true" />
              {venue.name}
            </div>
            <div className="mt-2 font-body text-sm text-ink-soft">{venue.location}</div>
            {venue.mapsUrl ? (
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-maroon-deep shadow-[0_10px_26px_-10px_rgba(0,0,0,0.45)] transition-[filter] hover:brightness-95"
              >
                Buka Peta
              </a>
            ) : (
              <p className="mt-4 font-body text-xs text-ink-soft">
                Tautan peta menyusul.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
