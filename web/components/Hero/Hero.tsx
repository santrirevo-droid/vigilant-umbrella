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

export default function Hero() {
  const refs = useCoverRefs();
  const idle = useIdleMotion(refs);
  const { open } = useOpenInvitation(refs);
  useScrollReveal(refs);

  const { section, coverInner, background, glow, content, title, button, music } = refs;

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

        {/* one subtle corner accent — the cover's only floral ornament */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 w-28 select-none opacity-[0.14] sm:w-36"
        >
          <FloralLayer
            src="/floral/floral-wc-spray-c.png"
            width={324}
            height={321}
            priority
            sizes="(min-width: 640px) 144px, 112px"
            className="h-auto w-full -scale-x-100"
          />
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
        <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-center gap-8 px-6 py-20 text-center">
          <div ref={content} className="flex flex-col items-center gap-6">
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-2xl leading-relaxed text-gold-dark"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <div className="flex flex-col items-center gap-3">
              <p className="font-accent text-sm font-medium tracking-[0.12em] text-ink-soft [font-variant-caps:small-caps]">
                The Wedding Of
              </p>

              <div className="relative w-full max-w-[21rem] sm:max-w-[25rem] md:max-w-[27rem]">
                <FloralLayer
                  src="/floral/floral-wc-wreath.png"
                  width={744}
                  height={711}
                  priority
                  sizes="(min-width: 768px) 432px, (min-width: 640px) 400px, 336px"
                  className="w-full select-none"
                />
                <h1
                  ref={title}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1 leading-none text-ink"
                >
                  <span className="font-script text-[64px] leading-none">{couple.groom.shortName}</span>
                  <span className="font-script text-3xl leading-none text-gold">&amp;</span>
                  <span className="font-script text-[64px] leading-none">{couple.bride.shortName}</span>
                </h1>
              </div>

              <p className="font-display text-xl font-semibold tracking-wide text-gold">
                18 · 08 · 2026
              </p>
            </div>

            <Suspense fallback={<GuestGreetingFallback />}>
              <GuestGreeting />
            </Suspense>
          </div>

          <InvitationButton
            ref={button}
            onClick={() => {
              idle.stop();
              open();
            }}
          />
        </div>
      </div>

      <MusicPlayer ref={music} className="fixed bottom-6 right-6 z-20" />
    </section>
  );
}
