import type { Metadata } from "next";
import Itinerary from "@/components/Persiapan/Itinerary";

export const metadata: Metadata = {
  title: "Itinerary Keluarga — Falah & Risyqaa",
  description: "Kedatangan, penginapan, dan rute perjalanan keluarga Falah selama di Mempawah.",
};

export default function ItineraryPage() {
  return <Itinerary />;
}
