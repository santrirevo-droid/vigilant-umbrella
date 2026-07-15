import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
      className={`${cormorant.variable} ${greatVibes.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-white font-body text-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
