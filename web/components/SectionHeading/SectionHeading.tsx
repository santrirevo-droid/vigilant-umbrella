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
    <div
      data-reveal
      className={`flex flex-col items-center text-center ${className}`}
    >
      <p
        className={[
          "font-body text-[11px] font-medium uppercase tracking-[0.42em]",
          dark ? "text-gold-light" : "text-gold-dark",
        ].join(" ")}
      >
        {eyebrow}
      </p>
      <FloralLayer
        src="/floral/gold-ornament.svg"
        width={200}
        height={36}
        className="my-5 h-5 w-36 select-none sm:w-44"
      />
      {title && (
        <h2
          className={[
            "font-script text-4xl leading-tight sm:text-5xl",
            dark ? "text-warm-white" : "text-ink",
          ].join(" ")}
        >
          {title}
        </h2>
      )}
    </div>
  );
}
