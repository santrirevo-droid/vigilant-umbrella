"use client";

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import type Lenis from "lenis";
import type { CoverRefs } from "./useCoverRefs";

// easeInOutCubic — gentle glide in, cruise, gentle glide out
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// every section below the cover, in page order — the autoscroll hops
// between these one at a time instead of gliding the whole document
// length in one continuous (and far too rushed) motion
const AUTOSCROLL_STOPS = [
  "#opening-quote",
  "#bride",
  "#groom",
  "#countdown",
  "#event",
  "#gallery",
  "#rsvp",
  "#gift",
  "#wishes",
  "#footer",
];

const AUTOSCROLL_HOP_DURATION = 1.6; // s — glide between two sections
const AUTOSCROLL_PAUSE = 1800; // ms — dwell time to actually read a section

/**
 * Carries the visitor down through the invitation one section at a time:
 * glide, pause to read, glide to the next. Cancels itself the instant the
 * visitor scrolls/touches/presses a key themselves, so it never fights
 * manual scrolling.
 */
function autoScrollThroughInvitation(lenis: Lenis) {
  let cancelled = false;
  let pauseTimer: ReturnType<typeof setTimeout>;

  const cleanup = () => {
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", cancel);
  };

  const cancel = () => {
    if (cancelled) return;
    cancelled = true;
    clearTimeout(pauseTimer);
    cleanup();
  };

  window.addEventListener("wheel", cancel, { passive: true, once: true });
  window.addEventListener("touchstart", cancel, { passive: true, once: true });
  window.addEventListener("keydown", cancel, { once: true });

  let index = 0;
  const advance = () => {
    if (cancelled) return;

    const target = AUTOSCROLL_STOPS[index];
    index += 1;

    if (!target || !document.querySelector(target)) {
      if (index < AUTOSCROLL_STOPS.length) advance();
      else cleanup();
      return;
    }

    lenis.scrollTo(target, {
      duration: AUTOSCROLL_HOP_DURATION,
      easing: easeInOutCubic,
      onComplete: () => {
        if (cancelled) return;
        if (index < AUTOSCROLL_STOPS.length) {
          pauseTimer = setTimeout(advance, AUTOSCROLL_PAUSE);
        } else {
          cleanup();
        }
      },
    });
  };

  advance();
}

/**
 * Orchestrates the "Buka Undangan" cover animation (Tahap 2):
 * scroll locks, music starts, the florals bloom toward the wreath,
 * the wreath appears, the title lifts with a soft zoom, and the
 * background gets a brief glow — then scroll unlocks and, once
 * unlocked, autoScrollThroughInvitation carries the visitor down
 * through the rest of the page at a readable pace. Skipped under
 * reduced-motion so those visitors keep manual control.
 *
 * Kept separate from the Hero markup so the animation timeline can
 * be tuned without touching layout/JSX.
 */
export function useOpenInvitation(refs: CoverRefs) {
  const [isOpened, setIsOpened] = useState(false);
  const isAnimating = useRef(false);
  const lenis = useLenis();

  const open = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsOpened(true);

    document.documentElement.classList.add("scroll-locked");
    refs.music.current?.play();

    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          document.documentElement.classList.remove("scroll-locked");

          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
          }

          if (lenis) autoScrollThroughInvitation(lenis);
        },
      })
      .set(refs.button.current, { pointerEvents: "none" }, 0)
      .to(refs.button.current, { opacity: 0, y: 12, duration: 0.35 }, 0)
      .to(refs.glow.current, { opacity: 1, duration: 0.6, ease: "power1.out" }, 0)
      .to(
        [refs.topCenter.current, refs.leftTop.current, refs.rightTop.current],
        { scale: 1.08, y: 8, duration: 0.75 },
        0.05
      )
      .to(
        [refs.leftBottom.current, refs.rightBottom.current],
        { scale: 1.08, y: -8, duration: 0.75 },
        0.05
      )
      .fromTo(
        refs.wreath.current,
        { scale: 0.82, opacity: 0.4 },
        { scale: 1, opacity: 1, duration: 0.85, ease: "back.out(1.6)" },
        0.15
      )
      .fromTo(
        refs.title.current,
        { scale: 0.94 },
        { scale: 1.05, duration: 0.45, ease: "power2.out" },
        0.25
      )
      .to(refs.title.current, { scale: 1, duration: 0.55, ease: "power2.inOut" }, 0.7)
      .to(refs.glow.current, { opacity: 0, duration: 0.55, ease: "power1.in" }, 0.85);
  }, [refs]);

  return { isOpened, open };
}
