"use client";

import { useEffect, useRef } from "react";
import FloralLayer from "@/components/FloralLayer";
import MusicPlayer, { type MusicPlayerHandle } from "@/components/MusicPlayer";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { couple } from "@/lib/weddingData";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  const musicRef = useRef<MusicPlayerHandle>(null);
  useRevealOnScroll(sectionRef, { start: "top 100%", duration: 0.8, stagger: 0.1 });
  useFloralParallax(sectionRef, sprayRef);

  // a little grace, then try a soft autoplay — most browsers will still
  // block it without a prior gesture, in which case the visible toggle
  // in the corner just sits ready and unlit until tapped
  useEffect(() => {
    const t = setTimeout(() => musicRef.current?.play(), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="cover"
      ref={sectionRef}
      className="relative min-h-svh w-full overflow-hidden bg-maroon-deep"
    >
      <div className="absolute inset-0">
        {/* background */}
        <div className="absolute inset-0 bg-gradient-to-b from-maroon via-maroon-deep to-maroon-light" />

        {/* paper texture */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-8 top-8 w-9 rotate-[18deg] sm:right-12 sm:top-10 sm:w-11"
        >
          <FloralLayer
            ref={sprayRef}
            src="/floral/floral-wc-spray-e.png"
            width={585}
            height={579}
            sizes="44px"
            className="h-auto w-full"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-24 left-6 w-8 -rotate-[24deg] sm:left-10 sm:w-10"
        >
          <FloralLayer
            src="/floral/floral-wc-spray-e.png"
            width={585}
            height={579}
            sizes="40px"
            className="h-auto w-full -scale-x-100"
          />
        </div>

        {/* ambient light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(circle at 50% 32%, rgba(217,169,78,0.35), transparent 62%)",
          }}
        />

        {/* content column */}
        <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-center gap-6 px-6 py-20 text-center">
          <div className="flex flex-col items-center gap-5">
            <p
              data-reveal
              dir="rtl"
              lang="ar"
              className="font-arabic text-2xl leading-relaxed text-accent"
            >
              الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
            </p>

            <p data-reveal className="font-accent text-sm font-medium tracking-[0.12em] text-on-maroon-soft [font-variant-caps:small-caps]">
              Telah Menikah
            </p>

            {/* monogram — the couple's own gold F&R crest, extracted from
                their Instagram invitation art */}
            <div data-reveal className="w-[220px] shrink-0 sm:w-[248px]">
              <FloralLayer
                src="/floral/monogram-fr.png"
                width={921}
                height={731}
                sizes="248px"
                priority
                className="h-auto w-full select-none"
              />
            </div>

            <h1 data-reveal className="flex flex-wrap items-baseline justify-center gap-x-2 leading-none text-on-maroon">
              <span className="font-script text-[clamp(2.25rem,11vw,3.25rem)] leading-none">
                {couple.groom.shortName}
              </span>
              <span className="font-script text-[clamp(1.5rem,7vw,2.25rem)] leading-none text-accent">
                &amp;
              </span>
              <span className="font-script text-[clamp(2.25rem,11vw,3.25rem)] leading-none">
                {couple.bride.shortName}
              </span>
            </h1>

            <div data-reveal className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent/40" />
              <p className="font-display text-lg font-semibold tracking-wide text-accent">
                18 · 08 · 2026
              </p>
              <span className="h-px w-8 bg-accent/40" />
            </div>

            <p data-reveal className="max-w-xs font-body text-[15px] leading-[1.7] text-on-maroon-soft">
              Terima kasih atas kehadiran, doa, dan restu yang telah
              diberikan untuk hari bahagia kami.
            </p>
          </div>

          <a
            data-reveal
            href="#galeri"
            className="mt-2 flex flex-col items-center gap-2 text-on-maroon-soft transition-colors hover:text-on-maroon"
          >
            <span className="font-accent text-[11px] tracking-[0.25em] [font-variant-caps:small-caps]">
              Lihat kilas balik
            </span>
            <span className="flex h-8 w-5 items-start justify-center rounded-full border border-accent/40 p-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
            </span>
          </a>
        </div>
      </div>

      <MusicPlayer ref={musicRef} className="fixed bottom-6 right-6 z-20" />
    </section>
  );
}
