"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

type IdleFloatOptions = {
  /** px to drift up/down, yoyo'd infinitely */
  y?: number;
  /** degrees to sway, yoyo'd infinitely */
  rotation?: number;
  duration?: number;
};

/**
 * Gentle, continuous "breathing" float for a single element — infinite
 * yoyo drift on its own timeline, independent of scroll position. Safe to
 * combine with useFloralParallax on the same node: this animates plain
 * y/rotation while the parallax hook animates yPercent, and GSAP composes
 * the two transform channels on the same element without conflict (same
 * pattern as the Hero's idle motion + scroll reveal). Skipped entirely
 * under reduced-motion — the element just stays put.
 */
export function useIdleFloat(
  elRef: RefObject<HTMLElement | null>,
  { y = 9, rotation = 1.4, duration = 4.5 }: IdleFloatOptions = {}
) {
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y,
        rotation,
        duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, el);

    return () => ctx.revert();
  }, [elRef, y, rotation, duration]);
}
