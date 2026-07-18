type SectionHeadingProps = {
  eyebrow: string;
  title?: string;
  className?: string;
  /** force a small kicker treatment even without a title — for spots where
   * the real "title" of the moment is a different element below (Footer's
   * closing names) rather than this label itself */
  kickerOnly?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  className = "",
  kickerOnly = false,
}: SectionHeadingProps) {
  const headline = title ?? eyebrow;
  const showKicker = Boolean(title) || kickerOnly;

  return (
    <div
      data-reveal
      className={`flex flex-col items-center gap-2 text-center ${className}`}
    >
      {showKicker && (
        <p className="font-accent text-[11px] font-medium uppercase tracking-[0.34em] text-gold">
          {eyebrow}
        </p>
      )}
      {!kickerOnly && (
        <h2 className="font-display text-[34px] font-medium leading-[1.2] text-ink">
          {headline}
        </h2>
      )}
    </div>
  );
}
