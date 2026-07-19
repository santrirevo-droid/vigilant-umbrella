import type { Metadata } from "next";
import Persiapan from "@/components/Persiapan/Persiapan";

export const metadata: Metadata = {
  title: "Persiapan Pernikahan — Falah & Risyqaa",
  description:
    "Checklist, rundown, kedatangan keluarga, dan anggaran persiapan pernikahan Falah & Risyqaa.",
};

export default function PersiapanPage() {
  return <Persiapan />;
}
