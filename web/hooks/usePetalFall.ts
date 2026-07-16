"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * Optional ambient garnish: a handful of small watercolor petals drifting
 * down through the section, looping forever. Targets `[data-petal]` markup
 * the caller renders (mirrors how useIdleMotion drives Hero's `[data-particle]`
 * nodes) — transform/opacity only, skipped entirely under reduced-motion.
 */
export function usePetalFall(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const petals = gsap.utils.toArray<HTMLElement>("[data-petal]", section);
      const fallDistance = section.clientHeight + 120;

      petals.forEach((petal, i) => {
        const duration = 11 + i * 1.8;

        gsap.set(petal, { y: -60, opacity: 0 });

        gsap
          .timeline({ repeat: -1, delay: i * 1.6 })
          .to(petal, { y: fallDistance, duration, ease: "none" }, 0)
          .to(petal, { opacity: 0.7, duration: 1.2, ease: "sine.out" }, 0)
          .to(petal, { opacity: 0, duration: 1.5, ease: "sine.in" }, duration - 1.5);

        gsap.to(petal, {
          x: i % 2 === 0 ? 16 : -16,
          rotation: i % 2 === 0 ? 20 : -20,
          duration: 3.5 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, section);

    return () => ctx.revert();
  }, [sectionRef]);
}
