"use client";

import { useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { bankAccounts } from "@/lib/weddingData";

export default function Gift() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.15 });

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  async function handleCopy(number: string, index: number) {
    try {
      await navigator.clipboard.writeText(number.replace(/\s/g, ""));
    } catch {
      return;
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex((cur) => (cur === index ? null : cur)), 1800);
  }

  return (
    <section
      id="gift"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-cream via-warm-white to-cream px-6 py-24 text-center"
    >
      {/* soft color blobs for the glass cards to blur against */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-sage/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-gold/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-md">
        <SectionHeading eyebrow="Tanda Kasih" />
        <p data-reveal className="mt-4 text-sm font-light leading-relaxed text-ink-soft">
          Doa restu Bapak/Ibu/Saudara/i adalah karunia terindah bagi kami.
          Namun jika ingin memberi tanda kasih, kami sediakan pilihan
          berikut.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {bankAccounts.map((account, i) => (
            <div
              key={account.bank}
              data-reveal
              className="rounded-2xl border border-white/50 bg-white/35 px-6 py-7 shadow-[0_18px_44px_-24px_rgba(58,54,46,0.35)] backdrop-blur-md"
            >
              <div className="font-display text-xl text-ink">{account.bank}</div>
              <div className="mt-2 font-body text-lg tracking-[0.12em] text-gold-dark">
                {account.number}
              </div>
              <div className="mt-1 text-xs font-light text-ink-soft">
                a.n. {account.holder}
              </div>
              <button
                type="button"
                onClick={() => handleCopy(account.number, i)}
                className={[
                  "mt-4 cursor-pointer rounded-full border px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors",
                  copiedIndex === i
                    ? "border-sage-dark bg-sage-dark text-warm-white"
                    : "border-gold/40 bg-warm-white/70 text-ink-soft hover:border-gold",
                ].join(" ")}
              >
                {copiedIndex === i ? "Tersalin!" : "Salin Nomor"}
              </button>
            </div>
          ))}
        </div>

        <div
          data-reveal
          className="mx-auto mt-6 flex aspect-square w-40 flex-col items-center justify-center gap-2 rounded-2xl border border-white/50 bg-white/35 shadow-[0_18px_44px_-24px_rgba(58,54,46,0.35)] backdrop-blur-md"
        >
          <svg width="56" height="56" viewBox="0 0 56 56" className="opacity-70">
            <rect x="4" y="4" width="18" height="18" rx="2" fill="none" stroke="#A8834A" strokeWidth="2" />
            <rect x="34" y="4" width="18" height="18" rx="2" fill="none" stroke="#A8834A" strokeWidth="2" />
            <rect x="4" y="34" width="18" height="18" rx="2" fill="none" stroke="#A8834A" strokeWidth="2" />
            <rect x="10" y="10" width="6" height="6" fill="#A8834A" />
            <rect x="40" y="10" width="6" height="6" fill="#A8834A" />
            <rect x="10" y="40" width="6" height="6" fill="#A8834A" />
            <rect x="34" y="34" width="6" height="6" fill="#A8834A" />
            <rect x="44" y="34" width="6" height="6" fill="#A8834A" />
            <rect x="34" y="44" width="6" height="6" fill="#A8834A" />
            <rect x="44" y="44" width="6" height="6" fill="#A8834A" />
          </svg>
          <span className="text-[10px] uppercase tracking-[0.2em] text-ink-mute">
            QRIS
          </span>
        </div>
      </div>
    </section>
  );
}
