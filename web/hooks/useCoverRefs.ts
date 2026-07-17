"use client";

import { useRef } from "react";
import type { MusicPlayerHandle } from "@/components/MusicPlayer";

/**
 * Single source of truth for the refs shared between the Hero's two
 * animation hooks — useOpenInvitation (Tahap 2, click) and
 * useScrollReveal (Tahap 3, scroll) both animate the same DOM nodes.
 */
export function useCoverRefs() {
  return {
    section: useRef<HTMLElement>(null),
    coverInner: useRef<HTMLDivElement>(null),
    background: useRef<HTMLDivElement>(null),
    glow: useRef<HTMLDivElement>(null),
    wcCurtainLeft: useRef<HTMLImageElement>(null),
    wcCurtainRight: useRef<HTMLImageElement>(null),
    leaves: useRef<HTMLImageElement>(null),
    topCenter: useRef<HTMLImageElement>(null),
    leftTop: useRef<HTMLImageElement>(null),
    rightTop: useRef<HTMLImageElement>(null),
    leftBottom: useRef<HTMLImageElement>(null),
    rightBottom: useRef<HTMLImageElement>(null),
    wreath: useRef<HTMLImageElement>(null),
    content: useRef<HTMLDivElement>(null),
    title: useRef<HTMLHeadingElement>(null),
    button: useRef<HTMLButtonElement>(null),
    scrollHint: useRef<HTMLDivElement>(null),
    music: useRef<MusicPlayerHandle>(null),
  };
}

export type CoverRefs = ReturnType<typeof useCoverRefs>;
