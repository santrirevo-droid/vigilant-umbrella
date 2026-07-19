type DividerProps = {
  className?: string;
};

/**
 * The site's one recurring ornament: gradient line — gold diamond — gradient
 * line. Replaces the old stacked-PNG floral dividers; used as a plain
 * separator between sections rather than decoration piled inside them.
 */
export default function Divider({ className = "" }: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto flex w-full max-w-[200px] items-center justify-center gap-3 ${className}`}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/55" />
      <span className="h-[7px] w-[7px] shrink-0 rotate-45 bg-accent" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/55" />
    </div>
  );
}
