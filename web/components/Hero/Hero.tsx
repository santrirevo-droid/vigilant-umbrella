"use client";

import { Suspense } from "react";
import FloralLayer from "@/components/FloralLayer";
import GuestGreeting, { GuestGreetingFallback } from "@/components/GuestGreeting";
import InvitationButton from "@/components/InvitationButton";
import MusicPlayer from "@/components/MusicPlayer";
import { useCoverRefs } from "@/hooks/useCoverRefs";
import { useIdleMotion } from "@/hooks/useIdleMotion";
import { useOpenInvitation } from "@/hooks/useOpenInvitation";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { couple } from "@/lib/weddingData";

const sprigProps = { src: "/floral/footer-sprig.svg", width: 220, height: 220 } as const;

export default function Hero() {
  const refs = useCoverRefs();
  const idle = useIdleMotion(refs);
  const { open } = useOpenInvitation(refs);
  useScrollReveal(refs);

  const { section, coverInner, background, glow, content, title, button, music } = refs;

  const monogram = `${couple.groom.shortName.charAt(0)}&${couple.bride.shortName.charAt(0)}`;

  return (
    <section
      id="cover"
      ref={section}
      className="relative min-h-svh w-full overflow-hidden bg-warm-white"
    >
      <div ref={coverInner} className="absolute inset-0">
        {/* background */}
        <div
          ref={background}
          className="absolute inset-0 bg-gradient-to-b from-cream via-warm-white to-beige"
        />

        {/* paper texture */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* thin bordered frame, inset from the viewport edges — the cover's
            outer boundary, echoed by a small sprig tucked in each corner */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 rounded-[2rem] border border-gold/35 sm:inset-6"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-3 w-12 opacity-60 sm:left-5 sm:top-5 sm:w-16"
        >
          <FloralLayer {...sprigProps} className="h-auto w-full" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 w-12 -scale-x-100 opacity-60 sm:right-5 sm:top-5 sm:w-16"
        >
          <FloralLayer {...sprigProps} className="h-auto w-full" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-3 w-12 -scale-y-100 opacity-60 sm:bottom-5 sm:left-5 sm:w-16"
        >
          <FloralLayer {...sprigProps} className="h-auto w-full" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3 w-12 -scale-x-100 -scale-y-100 opacity-60 sm:bottom-5 sm:right-5 sm:w-16"
        >
          <FloralLayer {...sprigProps} className="h-auto w-full" />
        </div>

        {/* ambient light — breathes idly, blooms warm on open */}
        <div
          ref={glow}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(circle at 50% 32%, rgba(139,75,88,0.4), transparent 62%)",
          }}
        />

        {/* content column */}
        <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-center gap-6 px-6 py-20 text-center">
          <div ref={content} className="flex flex-col items-center gap-5">
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-2xl leading-relaxed text-gold-dark"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <p className="font-accent text-sm font-medium tracking-[0.12em] text-ink-soft [font-variant-caps:small-caps]">
              The Wedding Of
            </p>

            {/* monogram badge — a quiet symbol before the full names below */}
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-gold-dark/55" />
              <span className="absolute inset-[6px] rounded-full border border-gold-dark/30" />
              <span className="font-script text-2xl text-gold-dark">{monogram}</span>
            </div>

            <h1
              ref={title}
              className="flex flex-col items-center gap-1 leading-none text-ink"
            >
              <span className="font-script text-5xl leading-none">{couple.groom.shortName}</span>
              <span className="font-script text-2xl leading-none text-gold">&amp;</span>
              <span className="font-script text-5xl leading-none">{couple.bride.shortName}</span>
            </h1>

            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/40" />
              <p className="font-display text-lg font-semibold tracking-wide text-gold">
                18 · 08 · 2026
              </p>
              <span className="h-px w-8 bg-gold/40" />
            </div>

            <Suspense fallback={<GuestGreetingFallback />}>
              <GuestGreeting />
            </Suspense>
          </div>

          <div ref={button} className="flex flex-col items-center gap-3">
            <InvitationButton
              onClick={() => {
                idle.stop();
                open();
              }}
            />
            <p className="font-accent text-[11px] tracking-[0.25em] text-ink-soft [font-variant-caps:small-caps]">
              Ketuk untuk membuka
            </p>
          </div>
        </div>
      </div>

      <MusicPlayer ref={music} className="fixed bottom-6 right-6 z-20" />
    </section>
  );
}
