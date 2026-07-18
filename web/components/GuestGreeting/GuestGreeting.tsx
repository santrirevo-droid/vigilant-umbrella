"use client";

import { useGuestName } from "@/hooks/useGuestName";

function GreetingCardShell({ guestName }: { guestName: string }) {
  return (
    <div className="w-full max-w-xs rounded-2xl border border-border bg-paper px-6 py-5 text-center shadow-[0_10px_28px_-18px_rgba(74,30,43,0.35)]">
      <p className="font-body text-[13px] text-ink-soft">Kepada Yth.</p>
      <p className="mt-1 font-body text-base leading-snug text-ink-soft">
        Bapak/Ibu/Saudara/i
        {guestName && <span className="font-semibold text-ink"> {guestName}</span>}
      </p>
      <p className="mt-1 font-body text-[13px] text-ink-soft">di tempat</p>
    </div>
  );
}

/** Personalized greeting card — reads the guest's name from the URL. */
export default function GuestGreeting() {
  const guestName = useGuestName();
  return <GreetingCardShell guestName={guestName} />;
}

/** Suspense fallback: identical shell with the generic sapaan, so there's
 * no layout shift once the real (possibly personalized) card hydrates in. */
export function GuestGreetingFallback() {
  return <GreetingCardShell guestName="" />;
}
