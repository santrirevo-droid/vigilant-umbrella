"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "undangan-falah-risyqaa-wishes-v1";

export type Wish = {
  id: number;
  name: string;
  attend: "hadir" | "tidak";
  guests: string;
  message: string;
};

const EMPTY_WISHES: Wish[] = [];

function readWishes(): Wish[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : EMPTY_WISHES;
  } catch {
    return EMPTY_WISHES;
  }
}

// module-level cache so getSnapshot returns a stable reference between
// renders (useSyncExternalStore re-renders whenever the snapshot changes
// by reference, so re-parsing localStorage on every call would loop).
// Primed eagerly here: on the server `window` is undefined so this stays
// EMPTY_WISHES (matching getServerSnapshot); on the client this module
// only executes in the browser, so it's safe to read localStorage now.
let cache: Wish[] = typeof window !== "undefined" ? readWishes() : EMPTY_WISHES;
const listeners = new Set<() => void>();

function refreshCache() {
  cache = readWishes();
  listeners.forEach((listener) => listener());
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot() {
  return cache;
}

function getServerSnapshot() {
  return EMPTY_WISHES;
}

/**
 * Shared RSVP/wishes data, backed by localStorage (no backend). Multiple
 * components (RSVP form, Wishes list) can mount this hook independently
 * and stay in sync — writes call refreshCache() directly, and the native
 * `storage` event covers changes made from another tab.
 */
export function useWishes() {
  const wishes = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addWish = useCallback((entry: Omit<Wish, "id">) => {
    const next = [{ ...entry, id: Date.now() }, ...readWishes()];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage unavailable (private mode, quota) — still reflect it for this session
    }
    refreshCache();
  }, []);

  return { wishes, addWish };
}
