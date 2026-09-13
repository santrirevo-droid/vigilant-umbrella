import type { Metadata } from "next";
import Itinerary from "@/components/Persiapan/Itinerary";

export const metadata: Metadata = {
  title: "Itinerary Keluarga — Saiful & Nufus",
  description: "Kedatangan, penginapan, dan rute perjalanan keluarga selama di Pandeglang.",
};

export default function ItineraryPage() {
  return <Itinerary />;
}
