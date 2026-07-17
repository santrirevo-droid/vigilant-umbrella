import FloralLayer from "@/components/FloralLayer";

type SectionHeadingProps = {
  eyebrow: string;
  title?: string;
  dark?: boolean;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  dark = false,
  className = "",
}: SectionHeadingProps) {
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
        <p
          className={[
            "font-accent text-xs font-medium uppercase tracking-[0.42em]",
            dark ? "text-gold-light" : "text-gold-dark",
          ].join(" ")}
        >
          {eyebrow}
        </p>
        <FloralLayer
          src="/floral/gold-ornament.svg"
          width={200}
          height={36}
          className="my-4 h-5 w-32 select-none sm:w-40"
        />
        {title && (
          <h2
            className={[
              "font-display text-[clamp(2.125rem,5vw,2.5rem)] font-medium leading-[1.15] tracking-tight",
              dark ? "text-paper" : "text-ink",
            ].join(" ")}
          >
            {title}
          </h2>
        )}
      </div>
    </div>
  );
}
