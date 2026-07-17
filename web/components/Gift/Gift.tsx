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
  const coupleRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.15 });
  useRevealOnScroll(sectionRef, { selector: "[data-reveal-faint]", opacity: 0.5 });
  useFloralParallax(sectionRef, sprayRef);
  useFloralParallax(sectionRef, coupleRef);

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
      id="gift"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 text-center"
    >
      <div
        data-reveal-faint
        className="pointer-events-none absolute right-0 top-0 w-20 select-none opacity-50 sm:w-28"
      >
        <FloralLayer
          ref={sprayRef}
          src="/floral/floral-wc-spray-a.png"
          width={302}
          height={424}
          className="h-auto w-full -scale-x-100"
        />
      </div>

      <div
        data-reveal
        className="pointer-events-none absolute bottom-0 right-0 z-20 w-28 select-none drop-shadow-[0_10px_20px_rgba(43,20,32,0.25)] sm:w-40"
      >
        <FloralLayer
          ref={coupleRef}
          src="/couple/couple-veil.png"
          width={904}
          height={1420}
          className="h-auto w-full"
        />
      </div>

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
          {bankAccounts.map((account) => (
            <div
              key={account.bank}
              data-reveal
              className="rounded-2xl border border-gold/35 bg-paper/90 px-6 py-7 shadow-[0_18px_44px_-24px_rgba(58,54,46,0.35)] backdrop-blur-md"
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
                onClick={() => handleCopy(account.number, account.bank)}
                className={[
                  "mt-4 cursor-pointer rounded-full border px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors",
                  copiedKey === account.bank
                    ? "border-sage-dark bg-sage-dark text-paper"
                    : "border-gold/40 bg-paper/90 text-ink-soft hover:border-gold",
                ].join(" ")}
              >
                {copiedKey === account.bank ? "Tersalin!" : "Salin Nomor"}
              </button>
            </div>
          ))}

          <div
            data-reveal
            className="rounded-2xl border border-gold/35 bg-paper/90 px-6 py-7 shadow-[0_18px_44px_-24px_rgba(58,54,46,0.35)] backdrop-blur-md"
          >
            <div className="font-display text-xl text-ink">Alamat Pengiriman Kado</div>
            <div className="mt-2 font-body text-sm leading-relaxed text-gold-dark">
              {giftAddress.address}
            </div>
            <div className="mt-1 text-xs font-light text-ink-soft">
              a.n. {giftAddress.recipient}
            </div>
            <button
              type="button"
              onClick={() => handleCopy(giftAddress.address, "address")}
              className={[
                "mt-4 cursor-pointer rounded-full border px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors",
                copiedKey === "address"
                  ? "border-sage-dark bg-sage-dark text-paper"
                  : "border-gold/40 bg-paper/90 text-ink-soft hover:border-gold",
              ].join(" ")}
            >
              {copiedKey === "address" ? "Tersalin!" : "Salin Alamat"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
