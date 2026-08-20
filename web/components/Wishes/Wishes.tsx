"use client";

import { Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloralLayer from "@/components/FloralLayer";
import GuestNameAutofill from "@/components/GuestNameAutofill";
import SectionHeading from "@/components/SectionHeading";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useWishes } from "@/hooks/useWishes";

gsap.registerPlugin(ScrollTrigger);

export default function Wishes() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.1 });
  useFloralParallax(sectionRef, sprayRef);
  const { wishes, addWish } = useWishes();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justSent, setJustSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Mohon isi nama Anda terlebih dahulu.");
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      // attend/guests are vestigial now that the event is over — the API
      // still expects a valid value, so this just satisfies that shape
      // without exposing an RSVP concept that no longer applies.
      await addWish({ name: name.trim(), attend: "hadir", guests: "", message: message.trim() });
      setName("");
      setMessage("");
      setJustSent(true);
      setTimeout(() => setJustSent(false), 2500);
    } catch {
      setErrorMessage("Gagal mengirim ucapan. Periksa koneksi Anda dan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // re-run whenever the wish count changes, so newly-submitted or
  // newly-rendered cards still get their entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-wish-card]");
      if (!cards.length) return;
      gsap.set(cards, { opacity: 0, y: 28 });
      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [wishes.length]);

  const fieldClass =
    "min-h-11 w-full rounded-xl border border-border bg-paper px-4 py-3 text-base text-ink outline-none transition-colors focus:border-gold";
  const labelClass =
    "mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-on-maroon-soft";

  return (
    <section
      id="ucapan"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 w-24 select-none sm:w-32"
      >
        <FloralLayer
          ref={sprayRef}
          src="/floral/floral-wc-spray-b.png"
          width={571}
          height={509}
          sizes="(min-width: 640px) 128px, 96px"
          className="h-auto w-full"
        />
      </div>

      <div className="relative mx-auto max-w-md">
        <SectionHeading eyebrow="Guestbook" title="Ucapan & Doa" titleClassName="font-wishes font-normal" />
        <p data-reveal className="mt-4 font-display text-lg leading-[1.7] text-on-maroon-soft">
          Bagikan ucapan dan doa terbaik Anda untuk kami berdua.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5 text-left">
          <Suspense fallback={null}>
            <GuestNameAutofill setName={setName} />
          </Suspense>

          <div data-reveal>
            <label className={labelClass} htmlFor="wish-name">
              Nama
            </label>
            <input
              id="wish-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Nama Anda"
              autoComplete="name"
              className={fieldClass}
            />
          </div>

          <div data-reveal>
            <label className={labelClass} htmlFor="wish-message">
              Ucapan &amp; Doa
            </label>
            <textarea
              id="wish-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan & doa untuk kedua mempelai…"
              className={`${fieldClass} resize-none`}
            />
          </div>

          {errorMessage && (
            <p data-reveal className="text-xs text-red-400">
              {errorMessage}
            </p>
          )}

          <button
            data-reveal
            type="submit"
            disabled={isSubmitting}
            className="mt-1 min-h-11 cursor-pointer rounded-full bg-accent py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-maroon-deep shadow-[0_10px_26px_-10px_rgba(0,0,0,0.45)] transition-[filter] hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Mengirim…" : "Kirim Ucapan"}
          </button>

          {justSent && (
            <p data-reveal className="-mt-2 text-center font-body text-xs text-sage-dark">
              Terima kasih atas ucapan &amp; doanya ✓
            </p>
          )}
        </form>

        <div ref={listRef} className="mt-10">
          {wishes.length === 0 ? (
            <p data-reveal className="font-body text-base text-on-maroon-soft">
              Jadilah yang pertama mengirimkan ucapan &amp; doa.
            </p>
          ) : (
            <div className="flex max-h-[26rem] flex-col gap-3 overflow-y-auto pr-1 text-left">
              {wishes.map((wish) => (
                <div
                  key={wish.id}
                  data-wish-card
                  className="rounded-2xl border border-border bg-paper px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-display text-base font-semibold text-paper">
                      {wish.name.trim().charAt(0).toUpperCase() || "?"}
                    </span>
                    <div className="min-w-0 truncate font-body text-sm font-medium text-ink">
                      {wish.name}
                    </div>
                  </div>
                  {wish.message && (
                    <p className="mt-3 font-body text-[15px] leading-[1.6] text-ink-soft">
                      {wish.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <p data-reveal className="mt-8 font-accent text-xs uppercase tracking-[0.18em] text-on-maroon-soft">
          {wishes.length} Ucapan Terkirim
        </p>
      </div>
    </section>
  );
}
