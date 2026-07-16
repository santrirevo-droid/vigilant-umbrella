"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { CoverRefs } from "./useCoverRefs";

/**
 * The cover's ambient "alive" motion before the invitation is opened:
 * florals drift very slowly, leaves sway, gold particles float, and the
 * light glow breathes. All infinite yoyo tweens — call stop() once
 * (from useOpenInvitation) so they don't fight the open/scroll timelines.
 */
export function useIdleMotion(refs: CoverRefs) {
  const stopRef = useRef<() => void>(() => {});

  useEffect(() => {
    const section = refs.section.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });

      tl.to(refs.topCenter.current, { y: 6, rotation: 0.6, duration: 6 }, 0)
        .to(refs.leftTop.current, { y: 5, x: -3, rotation: -0.8, duration: 7 }, 0)
        .to(refs.rightTop.current, { y: 5, x: 3, rotation: 0.8, duration: 7.5 }, 0)
        .to(refs.leftBottom.current, { y: -5, rotation: 1, duration: 6.5 }, 0)
        .to(refs.rightBottom.current, { y: -5, rotation: -1, duration: 6.8 }, 0)
        .to(refs.leaves.current, { rotation: 0.4, duration: 9 }, 0)
        .to(refs.wcCurtainLeft.current, { y: 10, x: -4, duration: 10 }, 0)
        .to(refs.wcCurtainRight.current, { y: -10, x: 4, duration: 10.5 }, 0)
        .to(
          refs.glow.current,
          { opacity: 0.22, x: 14, y: -10, duration: 8 },
          0
        );

      const particles = gsap.utils.toArray<HTMLElement>(
        "[data-particle]",
        section
      );
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: -18 - i * 4,
          x: i % 2 === 0 ? 8 : -8,
          opacity: 0.85,
          duration: 3.5 + i * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });

      stopRef.current = () => ctx.revert();
    }, section);

    return () => ctx.revert();
  }, [refs]);

  return {
    stop: () => stopRef.current(),
  };
}
