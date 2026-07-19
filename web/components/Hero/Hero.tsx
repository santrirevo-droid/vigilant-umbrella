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
      className="relative min-h-svh w-full overflow-hidden bg-maroon-deep"
    >
      <div ref={coverInner} className="absolute inset-0">
        {/* background */}
        <div
          ref={background}
          className="absolute inset-0 bg-gradient-to-b from-maroon via-maroon-deep to-maroon-light"
        />

        {/* paper texture */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* a couple of loose, scattered leaves instead of a symmetric frame —
            matches the reference's organic (not boxed-in) feel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-8 top-8 w-9 rotate-[18deg] opacity-70 sm:right-12 sm:top-10 sm:w-11"
        >
          <FloralLayer
            src="/floral/floral-wc-spray-e.png"
            width={585}
            height={579}
            sizes="44px"
            className="h-auto w-full"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-24 left-6 w-8 -rotate-[24deg] opacity-60 sm:left-10 sm:w-10"
        >
          <FloralLayer
            src="/floral/floral-wc-spray-e.png"
            width={585}
            height={579}
            sizes="40px"
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
              "radial-gradient(circle at 50% 32%, rgba(217,169,78,0.35), transparent 62%)",
          }}
        />

        {/* content column */}
        <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-center gap-6 px-6 py-20 text-center">
          <div ref={content} className="flex flex-col items-center gap-5">
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-2xl leading-relaxed text-accent"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <p className="font-accent text-sm font-medium tracking-[0.12em] text-on-maroon-soft [font-variant-caps:small-caps]">
              The Wedding Of
            </p>

            {/* monogram badge — the small wreath asset reused at a fraction
                of its usual size, wrapped around initials instead of the
                full names */}
            <div className="relative flex h-[168px] w-[176px] shrink-0 items-center justify-center">
              <FloralLayer
                src="/floral/floral-wc-wreath.png"
                width={744}
                height={711}
                sizes="176px"
                className="absolute inset-0 h-full w-full select-none"
              />
              <div className="relative flex flex-col items-center gap-1.5">
                <span className="h-px w-9 bg-accent/50" />
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[2.1rem] font-semibold italic leading-none text-accent">
                    {couple.groom.shortName.charAt(0)}
                  </span>
                  <span className="font-script text-2xl leading-none text-accent">
                    &amp;
                  </span>
                  <span className="font-display text-[2.1rem] font-semibold italic leading-none text-accent">
                    {couple.bride.shortName.charAt(0)}
                  </span>
                </div>
                <span className="h-px w-9 bg-accent/50" />
              </div>
            </div>

            <h1
              ref={title}
              className="flex flex-wrap items-baseline justify-center gap-x-2 leading-none text-on-maroon"
            >
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

            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent/40" />
              <p className="font-display text-lg font-semibold tracking-wide text-accent">
                18 · 08 · 2026
              </p>
              <span className="h-px w-8 bg-accent/40" />
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
            <p className="font-accent text-[11px] tracking-[0.25em] text-on-maroon-soft [font-variant-caps:small-caps]">
              Ketuk untuk membuka
            </p>
          </div>
        </div>
      </div>

      <MusicPlayer ref={music} className="fixed bottom-6 right-6 z-20" />
    </section>
  );
}
