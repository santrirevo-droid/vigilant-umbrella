"use client";

import FloralLayer from "@/components/FloralLayer";
import InvitationButton from "@/components/InvitationButton";
import MusicPlayer from "@/components/MusicPlayer";
import { useCoverRefs } from "@/hooks/useCoverRefs";
import { useIdleMotion } from "@/hooks/useIdleMotion";
import { useOpenInvitation } from "@/hooks/useOpenInvitation";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const COUPLE = {
  groom: "Falah",
  bride: "Risyqaa",
};

const PARTICLE_POSITIONS = [
  "left-[12%] top-[18%] h-3 w-3",
  "left-[82%] top-[24%] h-2.5 w-2.5",
  "left-[22%] top-[62%] h-2 w-2",
  "left-[76%] top-[58%] h-3 w-3",
  "left-[48%] top-[14%] h-2 w-2",
  "left-[8%] top-[78%] h-2.5 w-2.5",
  "left-[90%] top-[76%] h-2 w-2",
];

export default function Hero() {
  const refs = useCoverRefs();
  const idle = useIdleMotion(refs);
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
          className="absolute inset-0 bg-gradient-to-b from-cream via-warm-white to-beige/80"
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
        <div className="absolute inset-0 [box-shadow:inset_0_0_18vw_rgba(23,61,36,0.18)]" />

        {/* ambient light — breathes idly, blooms warm on open */}
        <div
          ref={glow}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(circle at 50% 34%, rgba(216,175,71,0.45), transparent 62%)",
          }}
        />

        {/* leaves — ambient back layer, swaying idly + slower scroll parallax */}
        <FloralLayer
          ref={leaves}
          src="/floral/leaves.svg"
          width={800}
          height={1200}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        />

        {/* main floral clusters — top garland + corner sprays */}
        <FloralLayer
          ref={topCenter}
          src="/floral/top-center.svg"
          width={600}
          height={190}
          priority
          className="pointer-events-none absolute left-1/2 top-0 w-[92%] max-w-2xl -translate-x-1/2 select-none"
        />
        <FloralLayer
          ref={leftTop}
          src="/floral/left-top.svg"
          width={300}
          height={300}
          priority
          className="pointer-events-none absolute left-0 top-0 w-32 select-none sm:w-44 md:w-56"
        />
        <FloralLayer
          ref={rightTop}
          src="/floral/left-top.svg"
          width={300}
          height={300}
          priority
          className="pointer-events-none absolute right-0 top-0 w-32 -scale-x-100 select-none sm:w-44 md:w-56"
        />

        {/* smaller accent blooms + gold — bottom corners */}
        <FloralLayer
          ref={leftBottom}
          src="/floral/left-bottom.svg"
          width={220}
          height={220}
          className="pointer-events-none absolute bottom-0 left-0 w-24 select-none sm:w-32 md:w-36"
        />
        <FloralLayer
          ref={rightBottom}
          src="/floral/left-bottom.svg"
          width={220}
          height={220}
          className="pointer-events-none absolute bottom-0 right-0 w-24 -scale-x-100 select-none sm:w-32 md:w-36"
        />

        {/* floating gold particles */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {PARTICLE_POSITIONS.map((pos, i) => (
            <div key={i} data-particle className={`absolute opacity-60 ${pos}`}>
              <FloralLayer
                src="/floral/particle.svg"
                width={24}
                height={24}
                className="h-full w-full select-none"
              />
            </div>
          ))}
        </div>

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
            <p className="font-accent text-[11px] font-medium uppercase tracking-[0.42em] text-gold-dark">
              The Wedding
            </p>

            <FloralLayer
              src="/floral/gold-ornament.svg"
              width={200}
              height={36}
              className="my-5 h-5 w-36 select-none sm:w-44"
            />

            <h1 ref={title} className="flex flex-col items-center gap-1">
              <span className="font-display text-[clamp(2.75rem,15vw,5.25rem)] font-medium leading-none text-ink">
                {COUPLE.groom}
              </span>
              <span className="my-1 font-accent text-xl text-gold-dark">
                &amp;
              </span>
              <span className="font-display text-[clamp(2.75rem,15vw,5.25rem)] font-medium leading-none text-ink">
                {COUPLE.bride}
              </span>
            </h1>

            <p className="mt-5 font-display text-lg italic tracking-wide text-ink-soft">
              18 · 08 · 2026
            </p>
          </div>

          <div className="mt-12">
            <InvitationButton
              ref={button}
              onClick={() => {
                idle.stop();
                open();
              }}
            />
          </div>
        </div>
      </div>

      <MusicPlayer ref={music} className="fixed bottom-6 right-6 z-20" />
    </section>
  );
}
