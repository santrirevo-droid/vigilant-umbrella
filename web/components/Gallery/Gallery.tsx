"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloralLayer from "@/components/FloralLayer";
import SectionHeading from "@/components/SectionHeading";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

gsap.registerPlugin(ScrollTrigger);

const PHOTOS = [1, 2, 3, 4, 5, 6];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef);
  useFloralParallax(sectionRef, sprayRef);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-gallery-item]");
      items.forEach((item, i) => {
        const speed = i % 2 === 0 ? -16 : 16;
        gsap.to(item.querySelector("img, [data-placeholder]"), {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4,
          },
        });
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-hidden bg-warm-white px-6 py-24 text-center"
    >
      <FloralLayer
        ref={sprayRef}
        src="/floral/floral-wc-spray-d.png"
        width={529}
        height={466}
        className="pointer-events-none absolute right-0 top-0 w-24 -scale-x-100 select-none opacity-50 sm:w-32"
      />

      <div className="mx-auto max-w-md">
        <SectionHeading
          eyebrow="Galeri Kami"
          title="Momen Bahagia"
        />
        <p data-reveal className="mt-4 text-sm font-light text-ink-soft">
          Beberapa momen yang ingin kami bagikan bersama Anda.
        </p>

        <div ref={gridRef} className="mt-10 columns-2 gap-3">
          {PHOTOS.map((n, i) => (
            <div
              key={n}
              data-reveal
              data-gallery-item
              className={[
                "mb-3 break-inside-avoid overflow-hidden rounded-2xl",
                "border border-gold/25 bg-gradient-to-br from-cream to-beige/70",
                i % 3 === 0 ? "aspect-[3/4]" : "aspect-square",
              ].join(" ")}
            >
              <div className="relative h-full w-full overflow-hidden">
                <div
                  data-placeholder
                  className="absolute inset-0 flex scale-125 items-center justify-center"
                >
                  <svg width="28" height="28" viewBox="0 0 40 40" className="opacity-50">
                    <circle r="16" cx="20" cy="19" fill="#E7D6C3" />
                    <circle r="5" cx="20" cy="19" fill="#C89B3C" />
                  </svg>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/gallery/${n}.jpg`}
                  alt={`Momen kami ${n}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full scale-125 object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
