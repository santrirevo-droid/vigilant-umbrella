"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  /** px to rise from */
  y?: number;
  duration?: number;
  /** stagger between matched children, in seconds */
  stagger?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** selector (within the container) for the elements to stagger in; falls back to the container itself */
  selector?: string;
};

/**
 * Generic "section entrance" reveal: elements fade + rise into place once
 * when scrolled into view. Driven by GSAP ScrollTrigger (not scrub — this
 * plays once, unlike the Hero's pinned scroll-reveal timeline).
 */
export function useRevealOnScroll(
  containerRef: RefObject<HTMLElement | null>,
  {
    y = 36,
    duration = 0.9,
    stagger = 0.12,
    start = "top 82%",
    selector = "[data-reveal]",
  }: RevealOptions = {}
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const matched = gsap.utils.toArray<HTMLElement>(selector);
      const els = matched.length ? matched : [container];

      if (reduceMotion) {
        gsap.set(els, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(els, { opacity: 0, y });
      ScrollTrigger.create({
        trigger: container,
        start,
        once: true,
        onEnter: () => {
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease: "power3.out",
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, y, duration, stagger, start, selector]);
}
