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
              "radial-gradient(circle at 50% 32%, rgba(169,139,93,0.4), transparent 62%)",
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
              <p className="font-accent text-[11px] font-medium uppercase tracking-[0.34em] text-ink-mute">
                The Wedding Of
              </p>

              <h1
                ref={title}
                className="flex flex-col items-center gap-1 font-display leading-none text-ink"
              >
                <span className="text-[46px] font-medium">{couple.groom.shortName}</span>
                <span className="text-2xl italic text-gold">&amp;</span>
                <span className="text-[46px] font-medium">{couple.bride.shortName}</span>
              </h1>

              <p className="font-display text-xl font-medium tracking-wide text-gold-dark">
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
