import FloralLayer from "@/components/FloralLayer";

type SectionHeadingProps = {
  eyebrow: string;
  title?: string;
  dark?: boolean;
  className?: string;
  /** force a small kicker treatment even without a title — for spots where
   * the real "title" of the moment is a different element below (Hero's
   * couple name, Footer's closing names) rather than this label itself */
  kickerOnly?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  dark = false,
  className = "",
  kickerOnly = false,
}: SectionHeadingProps) {
  const headline = title ?? eyebrow;
  const showKicker = Boolean(title) || kickerOnly;

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.12] sm:h-64 sm:w-64"
      >
        <FloralLayer
          src="/floral/floral-wc-wreath.png"
          width={744}
          height={711}
          className="h-full w-full"
        />
      </div>

      <div
        data-reveal
        className={`relative flex flex-col items-center text-center ${className}`}
      >
        {showKicker && (
          <p
            className={[
              "font-accent text-xs font-semibold uppercase tracking-[0.32em]",
              dark ? "text-gold-light" : "text-gold-dark",
            ].join(" ")}
          >
            {eyebrow}
          </p>
        )}
        <FloralLayer
          src="/floral/gold-ornament.svg"
          width={200}
          height={36}
          className="my-4 h-5 w-32 select-none sm:w-40"
        />
        {kickerOnly ? null : (
          <h2
            className={[
              "font-display text-[clamp(1.5rem,4vw,2.25rem)] font-semibold leading-[1.2] tracking-wide",
              dark ? "text-paper" : "text-ink",
            ].join(" ")}
          >
            {headline}
          </h2>
        )}
      </div>
    </div>
  );
}
