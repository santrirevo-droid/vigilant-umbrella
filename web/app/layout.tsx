import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import BackgroundPattern from "@/components/BackgroundPattern";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
      className={`${playfair.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-white font-body text-ink">
        <BackgroundPattern />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
