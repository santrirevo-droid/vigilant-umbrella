"use client";

import FloralLayer from "@/components/FloralLayer";
import InvitationButton from "@/components/InvitationButton";
import MusicPlayer from "@/components/MusicPlayer";
import { useCoverRefs } from "@/hooks/useCoverRefs";
import { useOpenInvitation } from "@/hooks/useOpenInvitation";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const COUPLE = {
  groom: "Falah",
  bride: "Risyqaa",
};

export default function Hero() {
  const refs = useCoverRefs();
  const { open } = useOpenInvitation(refs);
  useScrollReveal(refs);

  const {
    section,
    coverInner,
    background,
    glow,
    leaves,
    topCenter,
    leftTop,
    rightTop,
    leftBottom,
    rightBottom,
    frame,
    content,
    title,
    button,
    music,
  } = refs;

  return (
    <section
      ref={section}
      className="relative min-h-svh w-full overflow-hidden bg-warm-white"
    >
      <div ref={coverInner} className="absolute inset-0">
        {/* background */}
        <div
          ref={background}
          className="absolute inset-0 bg-gradient-to-b from-cream via-warm-white to-beige/70"
        />

        {/* paper texture */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* soft vignette shadow */}
        <div className="absolute inset-0 [box-shadow:inset_0_0_18vw_rgba(58,54,46,0.12)]" />

        {/* glow — brief warm bloom triggered on open */}
        <div
          ref={glow}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            background:
              "radial-gradient(circle at 50% 34%, rgba(201,169,106,0.38), transparent 62%)",
          }}
        />

        {/* floral layer 1 — top garland (moves up on scroll) */}
        <FloralLayer
          ref={topCenter}
          src="/floral/top-center.svg"
          width={480}
          height={150}
          priority
          className="pointer-events-none absolute left-1/2 top-0 w-[86%] max-w-xl -translate-x-1/2 select-none"
        />

        {/* floral layer 2 — left corner spray (moves left on scroll) */}
        <FloralLayer
          ref={leftTop}
          src="/floral/left-top.svg"
          width={240}
          height={240}
          priority
          className="pointer-events-none absolute left-0 top-0 w-28 select-none sm:w-40 md:w-48"
        />

        {/* floral layer 3 — right corner spray (moves right on scroll; mirrored via transform) */}
        <FloralLayer
          ref={rightTop}
          src="/floral/right-top.svg"
          width={240}
          height={240}
          priority
          className="pointer-events-none absolute right-0 top-0 w-28 -scale-x-100 select-none sm:w-40 md:w-48"
        />

        {/* leaves — ambient parallax layer */}
        <FloralLayer
          ref={leaves}
          src="/floral/leaves.svg"
          width={800}
          height={1200}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        />

        {/* gold decoration — bottom corners */}
        <FloralLayer
          ref={leftBottom}
          src="/floral/left-bottom.svg"
          width={180}
          height={180}
          className="pointer-events-none absolute bottom-0 left-0 w-20 select-none sm:w-28 md:w-32"
        />
        <FloralLayer
          ref={rightBottom}
          src="/floral/right-bottom.svg"
          width={180}
          height={180}
          className="pointer-events-none absolute bottom-0 right-0 w-20 -scale-x-100 select-none sm:w-28 md:w-32"
        />

        {/* content column */}
        <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-center px-6 py-24 text-center">
          {/* frame — shrinks away on scroll */}
          <FloralLayer
            ref={frame}
            src="/frame/frame.svg"
            width={160}
            height={160}
            priority
            className="mb-2 h-28 w-28 select-none sm:h-32 sm:w-32"
          />

          <div ref={content} className="flex flex-col items-center">
            <p className="font-body text-[11px] font-medium uppercase tracking-[0.42em] text-gold-dark">
              The Wedding Of
            </p>

            <FloralLayer
              src="/floral/gold-ornament.svg"
              width={200}
              height={36}
              className="my-5 h-5 w-36 select-none sm:w-44"
            />

            <h1 ref={title} className="flex flex-col items-center gap-1">
              <span className="font-script text-[clamp(2.75rem,15vw,5.25rem)] leading-none text-ink">
                {COUPLE.groom}
              </span>
              <span className="my-1 font-display text-2xl italic text-gold-dark">
                &amp;
              </span>
              <span className="font-script text-[clamp(2.75rem,15vw,5.25rem)] leading-none text-ink">
                {COUPLE.bride}
              </span>
            </h1>

            <p className="mt-5 font-display text-lg italic tracking-wide text-ink-soft">
              18 · 08 · 2026
            </p>
          </div>

          <div className="mt-12">
            <InvitationButton ref={button} onClick={open} />
          </div>
        </div>
      </div>

      <MusicPlayer ref={music} className="fixed bottom-6 right-6 z-20" />
    </section>
  );
}
