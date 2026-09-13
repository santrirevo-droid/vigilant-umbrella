import type { Metadata } from "next";
import Persiapan from "@/components/Persiapan/Persiapan";

export const metadata: Metadata = {
  title: "Persiapan Pernikahan — Saiful & Nufus",
  description:
    "Checklist, rundown, kedatangan keluarga, dan anggaran persiapan pernikahan Saiful & Nufus.",
};

export default function PersiapanPage() {
  return <Persiapan />;
}
