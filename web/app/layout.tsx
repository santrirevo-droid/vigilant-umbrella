import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Amiri, Great_Vibes } from "next/font/google";
import BackgroundPattern from "@/components/BackgroundPattern";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${jost.variable} ${amiri.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-white font-body text-ink">
        <BackgroundPattern />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
