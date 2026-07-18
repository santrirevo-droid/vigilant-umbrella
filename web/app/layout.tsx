import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Amiri, Great_Vibes } from "next/font/google";
import BackgroundPattern from "@/components/BackgroundPattern";
import "./globals.css";

// the one serif that now carries everything except the couple's name —
// --font-body and --font-accent both alias to this in globals.css
const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

// used only for the couple's name — a flowing script instead of the stiffer
// serif, everywhere else keeps Cormorant Garamond for legibility
const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Falah & Risyqaa — The Wedding Of",
  description:
    "Undangan pernikahan digital Falah Fauzan & Risyqaa Syafitri — Selasa, 18 Agustus 2026, Mempawah Convention Center.",
};

// Without this, browsers with an auto-dark-theme feature (e.g. Android
// Chrome's "Auto Dark Theme for Web Contents") guess at whether this light
// pink design is dark-mode-eligible and can repaint it with mismatched,
// near-invisible low-contrast colors. Declaring it explicitly stops that.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${amiri.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-white font-body text-ink">
        <BackgroundPattern />
        {children}
      </body>
    </html>
  );
}
