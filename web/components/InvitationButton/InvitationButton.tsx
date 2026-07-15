"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

type InvitationButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

const InvitationButton = forwardRef<HTMLButtonElement, InvitationButtonProps>(
  ({ label = "Buka Undangan", className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={[
          "group relative inline-flex items-center gap-3 rounded-full",
          "border border-gold/70 bg-warm-white/70 px-9 py-4",
          "font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ink-soft",
          "shadow-[0_10px_30px_-10px_rgba(169,131,74,0.45)] backdrop-blur-sm",
          "transition-colors duration-300 hover:border-gold hover:bg-gold/10",
          "cursor-pointer",
          className,
        ].join(" ")}
        {...props}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rotate-45 bg-gold" />
        </span>
        {label}
      </button>
    );
  }
);

InvitationButton.displayName = "InvitationButton";

export default InvitationButton;
