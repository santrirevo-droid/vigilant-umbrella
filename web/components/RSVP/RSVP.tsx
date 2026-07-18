"use client";

import { Suspense, useRef, useState, type FormEvent } from "react";
import FloralLayer from "@/components/FloralLayer";
import { GuestNameAutofill } from "@/components/GuestGreeting";
import SectionHeading from "@/components/SectionHeading";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useWishes } from "@/hooks/useWishes";

type SentWish = {
  name: string;
  attend: "hadir" | "tidak";
  guests: string;
  message: string;
};

export default function RSVP() {
  const sectionRef = useRef<HTMLElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.1 });
  useFloralParallax(sectionRef, sprayRef);

  const { wishes, addWish } = useWishes();
  const [attend, setAttend] = useState<"hadir" | "tidak">("hadir");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("2");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentWish, setSentWish] = useState<SentWish | null>(null);

  const hadirCount = wishes.filter((w) => w.attend === "hadir").length;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Mohon isi nama Anda terlebih dahulu.");
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);
    const payload: SentWish = {
      name: name.trim(),
      attend,
      guests: attend === "hadir" ? guests : "",
      message: message.trim(),
    };
    try {
      await addWish(payload);
      setSentWish(payload);
      setName("");
      setMessage("");
    } catch {
      setErrorMessage("Gagal mengirim ucapan. Periksa koneksi Anda dan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass =
    "min-h-11 w-full rounded-xl border border-border bg-paper px-4 py-3 text-base text-ink outline-none transition-colors focus:border-gold";
  const labelClass =
    "mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-ink-soft";

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 w-24 select-none opacity-[0.14] sm:w-32"
      >
        <FloralLayer
          ref={sprayRef}
          src="/floral/floral-wc-spray-e.png"
          width={585}
          height={579}
          sizes="(min-width: 640px) 128px, 96px"
          className="h-auto w-full"
        />
      </div>

      <div className="mx-auto max-w-md">
        <SectionHeading eyebrow="RSVP" title="Konfirmasi Kehadiran" />
        <p data-reveal className="mt-4 font-display text-lg italic leading-[1.7] text-ink-soft">
          Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir dan memberikan doa restu.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5 text-left">
          <Suspense fallback={null}>
            <GuestNameAutofill setName={setName} />
          </Suspense>

          <div data-reveal>
            <label className={labelClass} htmlFor="rsvp-name">
              Nama
            </label>
            <input
              id="rsvp-name"
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
            <span className={labelClass}>Kehadiran</span>
            <div className="flex gap-3">
              {(["hadir", "tidak"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAttend(value)}
                  className={[
                    "min-h-11 flex-1 cursor-pointer rounded-xl border px-3 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] transition-colors",
                    attend === value
                      ? "border-gold-dark bg-gold-dark text-paper"
                      : "border-border bg-paper text-ink-soft",
                  ].join(" ")}
                >
                  {value === "hadir" ? "Hadir" : "Berhalangan"}
                </button>
              ))}
            </div>
          </div>

          {attend === "hadir" && (
            <div data-reveal>
              <label className={labelClass} htmlFor="rsvp-guests">
                Jumlah Tamu
              </label>
              <input
                id="rsvp-guests"
                type="number"
                min={1}
                max={10}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className={fieldClass}
              />
            </div>
          )}

          <div data-reveal>
            <label className={labelClass} htmlFor="rsvp-message">
              Ucapan &amp; Doa
            </label>
            <textarea
              id="rsvp-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan & doa untuk kedua mempelai…"
              className={`${fieldClass} resize-none`}
            />
          </div>

          {errorMessage && (
            <p data-reveal className="text-xs text-red-500">
              {errorMessage}
            </p>
          )}

          <button
            data-reveal
            type="submit"
            disabled={isSubmitting}
            className="mt-1 min-h-11 cursor-pointer rounded-full bg-gold-dark py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-paper shadow-[0_10px_26px_-10px_rgba(122,59,71,0.55)] transition-[filter] hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Mengirim…" : "Kirim Konfirmasi"}
          </button>
        </form>

        {sentWish && (
          <div data-reveal className="mt-6 rounded-2xl border border-border bg-paper px-5 py-4 text-left">
            <p className="font-accent text-sm font-medium tracking-[0.12em] text-ink-soft [font-variant-caps:small-caps]">
              Ucapan Terkirim
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-display text-base font-semibold text-paper">
                {sentWish.name.trim().charAt(0).toUpperCase() || "?"}
              </span>
              <div className="min-w-0">
                <div className="truncate font-body text-sm font-medium text-ink">
                  {sentWish.name}
                </div>
                <div
                  className={[
                    "text-xs tracking-wide",
                    sentWish.attend === "hadir" ? "text-sage-dark" : "text-red-400",
                  ].join(" ")}
                >
                  {sentWish.attend === "hadir"
                    ? sentWish.guests
                      ? `Hadir · ${sentWish.guests} orang`
                      : "Hadir"
                    : "Berhalangan hadir"}
                </div>
              </div>
            </div>
            {sentWish.message && (
              <p className="mt-3 font-body text-[15px] leading-[1.6] text-ink-soft">
                {sentWish.message}
              </p>
            )}
          </div>
        )}

        <div data-reveal className="mt-10 flex justify-center gap-10">
          <div>
            <div className="font-display text-3xl font-medium text-gold">{wishes.length}</div>
            <div className="mt-1.5 font-accent text-xs uppercase tracking-[0.18em] text-ink-soft">
              Ucapan
            </div>
          </div>
          <div className="w-px bg-border" />
          <div>
            <div className="font-display text-3xl font-medium text-gold">{hadirCount}</div>
            <div className="mt-1.5 font-accent text-xs uppercase tracking-[0.18em] text-ink-soft">
              Hadir
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
