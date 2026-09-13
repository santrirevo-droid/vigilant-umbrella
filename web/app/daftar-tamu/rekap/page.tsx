import type { Metadata } from "next";
import RekapClient from "@/components/GuestList/RekapClient";

export const metadata: Metadata = {
  title: "Rekap Daftar Tamu — Falah & Risyqaa",
};

export default function RekapPage() {
  return <RekapClient />;
}
