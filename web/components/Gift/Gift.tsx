"use client";

import { useRef, useState } from "react";
import FloralLayer from "@/components/FloralLayer";
import SectionHeading from "@/components/SectionHeading";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { bankAccounts, giftAddress } from "@/lib/weddingData";

export default function Gift() {
  const sectionRef = useRef<HTMLElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.15 });
  useFloralParallax(sectionRef, sprayRef);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function handleCopy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((cur) => (cur === key ? null : cur)), 1800);
  }

  return (
    <section
      id="tanda-kasih"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 w-20 select-none opacity-[0.14] sm:w-28"
      >
        <FloralLayer
          ref={sprayRef}
          src="/floral/floral-wc-spray-a.png"
          width={302}
          height={424}
          sizes="(min-width: 640px) 112px, 80px"
          className="h-auto w-full -scale-x-100"
        />
      </div>

      <div className="relative mx-auto max-w-md">
        <SectionHeading eyebrow="Gift" title="Tanda Kasih" />
        <p data-reveal className="mt-4 font-body text-[15px] leading-[1.6] text-on-maroon-soft">
          Kehadiran &amp; doa restu Anda sudah lebih dari cukup. Bila ingin
          memberi tanda kasih, kami sediakan pilihan berikut.
        </p>

        <div className="mt-8 flex flex-col gap-5">
          {bankAccounts.map((account) => (
            <div
              key={account.bank}
              data-reveal
              className="rounded-2xl border border-border bg-paper px-6 py-7 shadow-[0_14px_36px_-22px_rgba(74,30,43,0.25)]"
            >
              <div className="font-display text-xl font-medium text-ink">{account.bank}</div>
              <div className="mt-2 font-mono text-lg font-semibold tabular-nums tracking-[0.16em] text-gold">
                {account.number}
              </div>
              <div className="mt-1 font-body text-sm text-ink-soft">
                a.n. {account.holder}
              </div>
              <button
                type="button"
                onClick={() => handleCopy(account.number, account.bank)}
                className={[
                  "mt-4 min-h-11 cursor-pointer rounded-full border px-6 py-2.5 text-xs font-medium uppercase tracking-[0.18em] transition-colors",
                  copiedKey === account.bank
                    ? "border-sage-dark bg-sage-dark text-paper"
                    : "border-border bg-paper text-ink-soft hover:border-gold-dark",
                ].join(" ")}
              >
                {copiedKey === account.bank ? "Tersalin ✓" : "Salin Nomor"}
              </button>
            </div>
          ))}

          <div
            data-reveal
            className="rounded-2xl border border-border bg-paper px-6 py-7 shadow-[0_14px_36px_-22px_rgba(74,30,43,0.25)]"
          >
            <div className="font-display text-xl font-medium text-ink">Alamat Pengiriman Kado</div>
            <div className="mt-2 font-mono text-base leading-[1.6] tracking-wide text-gold">
              {giftAddress.address}
            </div>
            <div className="mt-1 font-body text-sm text-ink-soft">
              a.n. {giftAddress.recipient}
            </div>
            <button
              type="button"
              onClick={() => handleCopy(giftAddress.address, "address")}
              className={[
                "mt-4 min-h-11 cursor-pointer rounded-full border px-6 py-2.5 text-xs font-medium uppercase tracking-[0.18em] transition-colors",
                copiedKey === "address"
                  ? "border-sage-dark bg-sage-dark text-paper"
                  : "border-border bg-paper text-ink-soft hover:border-gold-dark",
              ].join(" ")}
            >
              {copiedKey === "address" ? "Tersalin ✓" : "Salin Alamat"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
