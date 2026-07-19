import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Amiri, Montserrat } from "next/font/google";
import localFont from "next/font/local";
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
const eyesomeScript = localFont({
  src: "../assets/fonts/eyesome-script/EyesomeScript.otf",
  variable: "--font-script",
  weight: "400",
});

// used only for the Mempelai section's descriptive body copy
const montserrat = Montserrat({
  variable: "--font-mempelai",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// used only for the couple's full names (Mempelai section headings)
const cmuSerif = localFont({
  src: [
    { path: "../assets/fonts/cmu-serif/CMUSerif-Roman.woff", weight: "400", style: "normal" },
    { path: "../assets/fonts/cmu-serif/CMUSerif-Bold.woff", weight: "700", style: "normal" },
    { path: "../assets/fonts/cmu-serif/CMUSerif-Italic.woff", weight: "400", style: "italic" },
    { path: "../assets/fonts/cmu-serif/CMUSerif-BoldItalic.woff", weight: "700", style: "italic" },
  ],
  variable: "--font-fullname",
});

// used only for the couple's Instagram handles — a TypeType trial font, kept
// per explicit user decision despite the trial license's no-public-site
// clause (see conversation for context); swap for a licensed build once
// TT Fors is purchased.
const ttFors = localFont({
  src: "../assets/fonts/tt-fors/TTForsTrialVariable.ttf",
  variable: "--font-handle",
  weight: "100 900",
});

// used only for the RSVP section's "Konfirmasi Kehadiran" heading
const dayDream = localFont({
  src: "../assets/fonts/day-dream/DayDream.ttf",
  variable: "--font-rsvp",
  weight: "400",
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
      className={`${cormorant.variable} ${amiri.variable} ${eyesomeScript.variable} ${montserrat.variable} ${cmuSerif.variable} ${ttFors.variable} ${dayDream.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-white font-body text-ink">
        <BackgroundPattern />
        {children}
      </body>
    </html>
  );
}
