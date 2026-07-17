"use client";

import { useRef, useState, type FormEvent } from "react";
import FloralLayer from "@/components/FloralLayer";
import SectionHeading from "@/components/SectionHeading";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useIdleFloat } from "@/hooks/useIdleFloat";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useWishes } from "@/hooks/useWishes";

export default function RSVP() {
  const sectionRef = useRef<HTMLElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  const coupleRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.1 });
  useRevealOnScroll(sectionRef, { selector: "[data-reveal-faint]", opacity: 0.5 });
  useFloralParallax(sectionRef, sprayRef);
  useFloralParallax(sectionRef, coupleRef);
  useIdleFloat(coupleRef);

  const { wishes, addWish } = useWishes();
  const [attend, setAttend] = useState<"hadir" | "tidak">("hadir");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("2");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justSent, setJustSent] = useState(false);

  const hadirCount = wishes.filter((w) => w.attend === "hadir").length;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Mohon isi nama Anda terlebih dahulu.");
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await addWish({
        name: name.trim(),
        attend,
        guests: attend === "hadir" ? guests : "",
        message: message.trim(),
      });
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

  const fieldClass =
    "w-full rounded-xl border border-gold/45 bg-paper px-4 py-3 text-base text-ink outline-none transition-colors focus:border-gold";
  const labelClass =
    "mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-ink-mute";

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 text-center"
    >
      <div
        data-reveal-faint
        className="pointer-events-none absolute left-0 top-0 w-24 select-none opacity-50 sm:w-32"
      >
        <FloralLayer
          ref={sprayRef}
          src="/floral/floral-wc-spray-e.png"
          width={585}
          height={579}
          className="h-auto w-full"
        />
      </div>

      <div
        data-reveal
        className="pointer-events-none absolute bottom-0 left-0 z-20 w-28 select-none drop-shadow-[0_10px_20px_rgba(43,20,32,0.25)] sm:w-40"
      >
        <FloralLayer
          ref={coupleRef}
          src="/couple/couple-akad.png"
          width={899}
          height={1443}
          className="h-auto w-full"
        />
      </div>

      <div className="mx-auto max-w-md">
        <SectionHeading eyebrow="RSVP" title="Konfirmasi Kehadiran" />
        <p data-reveal className="mt-4 font-display text-lg italic leading-relaxed text-ink-soft">
          Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir dan memberikan doa restu.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 text-left">
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
            <div className="flex gap-2.5">
              {(["hadir", "tidak"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAttend(value)}
                  className={[
                    "flex-1 cursor-pointer rounded-xl border px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
                    attend === value
                      ? "border-gold bg-gold text-ink"
                      : "border-gold/45 bg-paper text-ink-mute",
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
            className="mt-1 cursor-pointer rounded-xl bg-gold py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-ink shadow-[0_10px_26px_-10px_rgba(169,131,74,0.55)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {justSent ? "Terkirim, terima kasih" : isSubmitting ? "Mengirim…" : "Kirim Konfirmasi"}
          </button>
        </form>

        <div data-reveal className="mt-10 flex justify-center gap-10">
          <div>
            <div className="font-display text-3xl font-medium text-gold-dark">{wishes.length}</div>
            <div className="mt-1.5 font-accent text-xs uppercase tracking-[0.18em] text-ink-mute">
              Ucapan
            </div>
          </div>
          <div className="w-px bg-gold/25" />
          <div>
            <div className="font-display text-3xl font-medium text-gold-dark">{hadirCount}</div>
            <div className="mt-1.5 font-accent text-xs uppercase tracking-[0.18em] text-ink-mute">
              Hadir
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
