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
          "bg-gold px-10 py-[1.125rem]",
          "font-body text-xs font-medium uppercase tracking-[0.28em] text-paper",
          "shadow-[0_14px_34px_-10px_rgba(169,131,74,0.55)]",
          "transition-opacity duration-300 hover:opacity-90",
          "cursor-pointer",
          className,
        ].join(" ")}
        {...props}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rotate-45 bg-paper" />
        </span>
        {label}
      </button>
    );
  }
);

InvitationButton.displayName = "InvitationButton";

export default InvitationButton;
