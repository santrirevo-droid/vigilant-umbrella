"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CoverRefs } from "./useCoverRefs";

gsap.registerPlugin(ScrollTrigger);

/**
 * Tahap 3 — Scroll Reveal.
 *
 * Pins the Hero while the cover disperses: florals fly out left/right/up,
 * the frame shrinks away, the background eases back, and the whole cover
 * fades so the invitation content underneath is revealed. Driven entirely
 * by GSAP ScrollTrigger with scrub — no CSS animation.
 *
 * Relative parallax speed per the design spec (bigger = travels further
 * for the same scroll distance = feels like it's moving "faster"):
 * background 0.5, leaves 0.8, florals 1, frame 1.5.
 */
export function useScrollReveal(refs: CoverRefs) {
  useEffect(() => {
    const section = refs.section.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
        },
      });

      const SPEED = { background: 0.5, leaves: 0.8, floral: 1, frame: 1.5 };
      const base = 22; // vh of travel at speed 1

      tl.to(
        refs.background.current,
        { scale: 1 + 0.06 * SPEED.background, ease: "none", duration: 1 },
        0
      )
        .to(
          refs.leaves.current,
          { yPercent: -SPEED.leaves * base, opacity: 0, ease: "none", duration: 1 },
          0
        )
        // Layer 1 — left florals part outward from their own corner, like a
        // curtain being pulled open: scale up while sliding diagonally out
        // (transform-origin set per-corner in Hero.tsx via origin-* classes).
        .to(
          refs.leftTop.current,
          {
            xPercent: -SPEED.floral * 140,
            yPercent: -SPEED.floral * 60,
            scale: 1.55,
            opacity: 0,
            ease: "none",
            duration: 1,
          },
          0
        )
        .to(
          refs.leftBottom.current,
          {
            xPercent: -SPEED.floral * 140,
            yPercent: SPEED.floral * 60,
            scale: 1.55,
            opacity: 0,
            ease: "none",
            duration: 1,
          },
          0
        )
        // Layer 2 — right florals part the same way, mirrored
        .to(
          refs.rightTop.current,
          {
            xPercent: SPEED.floral * 140,
            yPercent: -SPEED.floral * 60,
            scale: 1.55,
            opacity: 0,
            ease: "none",
            duration: 1,
          },
          0
        )
        .to(
          refs.rightBottom.current,
          {
            xPercent: SPEED.floral * 140,
            yPercent: SPEED.floral * 60,
            scale: 1.55,
            opacity: 0,
            ease: "none",
            duration: 1,
          },
          0
        )
        // Layer 3 — top garland moves up
        .to(
          refs.topCenter.current,
          { yPercent: -SPEED.floral * base * 1.4, opacity: 0, ease: "none", duration: 1 },
          0
        )
        // frame shrinks then disappears (fastest layer)
        .to(
          refs.frame.current,
          { scale: 0, opacity: 0, ease: "none", duration: 0.65 },
          0
        )
        // scroll hint — the first thing to go; its job is done the moment
        // the visitor starts scrolling
        .to(
          refs.scrollHint.current,
          { opacity: 0, ease: "none", duration: 0.35 },
          0
        )
        // invitation heading lifts away with the cover
        .to(
          refs.content.current,
          { yPercent: -SPEED.floral * base, opacity: 0, ease: "none", duration: 0.85 },
          0.05
        )
        // the whole cover fades fully so the content behind it shows through
        .to(refs.coverInner.current, { opacity: 0, ease: "none", duration: 0.4 }, 0.62);

      // watercolor curtain — parts outward faster than the vector florals,
      // so it visually "opens" first. Skipped under reduced-motion: the
      // layer simply stays put at rest rather than animating away.
      if (!reduceMotion) {
        const wcSpeed = SPEED.floral * 1.3;
        tl.to(
          refs.wcCurtainLeft.current,
          { xPercent: -wcSpeed * 140, opacity: 0, ease: "none", duration: 1 },
          0
        ).to(
          refs.wcCurtainRight.current,
          { xPercent: wcSpeed * 140, opacity: 0, ease: "none", duration: 1 },
          0
        );
      }
    }, section);

    return () => ctx.revert();
  }, [refs]);
}
