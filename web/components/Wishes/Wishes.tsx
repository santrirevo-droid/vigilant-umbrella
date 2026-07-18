"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloralLayer from "@/components/FloralLayer";
import SectionHeading from "@/components/SectionHeading";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useWishes } from "@/hooks/useWishes";

gsap.registerPlugin(ScrollTrigger);

export default function Wishes() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef);
  useFloralParallax(sectionRef, sprayRef);
  const { wishes } = useWishes();

  // re-run whenever the wish count changes, so newly-submitted or
  // newly-rendered cards still get their entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-wish-card]");
      if (!cards.length) return;
      gsap.set(cards, { opacity: 0, y: 28 });
      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [wishes.length]);

  return (
    <section
      id="ucapan"
      ref={sectionRef}
      className="relative overflow-hidden px-6 pt-24 pb-24 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 w-24 select-none opacity-[0.14] sm:w-32"
      >
        <FloralLayer
          ref={sprayRef}
          src="/floral/floral-wc-spray-b.png"
          width={571}
          height={509}
          sizes="(min-width: 640px) 128px, 96px"
          className="h-auto w-full"
        />
      </div>

      <div className="mx-auto max-w-md">
        <SectionHeading eyebrow="Guestbook" title="Ucapan & Doa" />

        <div ref={listRef} className="mt-10">
          {wishes.length === 0 ? (
            <p data-reveal className="font-body text-base text-ink-soft">
              Jadilah yang pertama mengirimkan ucapan &amp; doa.
            </p>
          ) : (
            <div className="flex max-h-[26rem] flex-col gap-3 overflow-y-auto pr-1 text-left">
              {wishes.map((wish) => (
                <div
                  key={wish.id}
                  data-wish-card
                  className="rounded-2xl border border-border bg-paper px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-display text-base font-semibold text-paper">
                      {wish.name.trim().charAt(0).toUpperCase() || "?"}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate font-body text-sm font-medium text-ink">
                        {wish.name}
                      </div>
                      <div
                        className={[
                          "text-xs tracking-wide",
                          wish.attend === "hadir" ? "text-sage-dark" : "text-red-400",
                        ].join(" ")}
                      >
                        {wish.attend === "hadir"
                          ? wish.guests
                            ? `Hadir · ${wish.guests} orang`
                            : "Hadir"
                          : "Berhalangan hadir"}
                      </div>
                    </div>
                  </div>
                  {wish.message && (
                    <p className="mt-3 font-body text-[15px] leading-[1.6] text-ink-soft">
                      {wish.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
