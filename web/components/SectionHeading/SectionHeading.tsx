type SectionHeadingProps = {
  eyebrow: string;
  title?: string;
  className?: string;
  /** force a small kicker treatment even without a title — for spots where
   * the real "title" of the moment is a different element below (Footer's
   * closing names) rather than this label itself */
  kickerOnly?: boolean;
  /** overrides the title's font family — for one-off headings that break
   * from the shared font-display treatment (e.g. RSVP's Day Dream) */
  titleClassName?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  className = "",
  kickerOnly = false,
  titleClassName = "font-display font-medium",
}: SectionHeadingProps) {
  const headline = title ?? eyebrow;
  const showKicker = Boolean(title) || kickerOnly;

  return (
    <div
      data-reveal
      className={`flex flex-col items-center gap-2 text-center ${className}`}
    >
      {showKicker && (
        <p className="font-accent text-sm font-medium tracking-[0.12em] text-on-maroon-soft [font-variant-caps:small-caps]">
          {eyebrow}
        </p>
      )}
      {!kickerOnly && (
        <h2 className={`${titleClassName} text-[34px] leading-[1.2] text-on-maroon`}>
          {headline}
        </h2>
      )}
    </div>
  );
}
