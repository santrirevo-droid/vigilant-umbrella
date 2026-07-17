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
  /** resting opacity once revealed — lets ambient washes settle at their intended faintness instead of snapping to fully opaque */
  opacity?: number;
  /** starting scale, eases up to 1 */
  scale?: number;
  /** starting blur in px, eases down to 0 */
  blur?: number;
};

/**
 * Generic "section entrance" reveal: elements fade, rise, unblur and
 * settle into scale once when scrolled into view — an elegant "emerging"
 * feel. Driven by GSAP ScrollTrigger (not scrub — this plays once, unlike
 * the Hero's pinned scroll-reveal timeline).
 */
export function useRevealOnScroll(
  containerRef: RefObject<HTMLElement | null>,
  {
    y = 40,
    duration = 1.1,
    stagger = 0.12,
    start = "top 82%",
    selector = "[data-reveal]",
    opacity = 1,
    scale = 0.94,
    blur = 8,
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
        gsap.set(els, { opacity, y: 0, scale: 1, filter: "blur(0px)" });
        return;
      }

      gsap.set(els, { opacity: 0, y, scale, filter: `blur(${blur}px)` });
      ScrollTrigger.create({
        trigger: container,
        start,
        once: true,
        onEnter: () => {
          gsap.to(els, {
            opacity,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration,
            stagger,
            ease: "power4.out",
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, y, duration, stagger, start, selector, opacity, scale, blur]);
}
