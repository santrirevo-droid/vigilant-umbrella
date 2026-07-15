import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      {/* Placeholder so the scroll reveal has something to reveal.
          Real sections (Opening Quote, Bride, Groom, Countdown, ...)
          are separate future work. */}
      <section className="relative flex min-h-svh w-full items-center justify-center bg-warm-white px-6 text-center">
        <div className="max-w-md">
          <p className="font-body text-[11px] font-medium uppercase tracking-[0.42em] text-gold-dark">
            Opening Quote
          </p>
          <p className="mt-6 font-display text-2xl italic leading-relaxed text-ink-soft">
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia
            menciptakan untukmu pasangan hidup dari jenismu sendiri, agar
            kamu cenderung dan merasa tenteram kepadanya.&rdquo;
          </p>
          <p className="mt-4 font-body text-xs uppercase tracking-[0.3em] text-ink-mute">
            Q.S. Ar-Rum : 21
          </p>
        </div>
      </section>
    </main>
  );
}
