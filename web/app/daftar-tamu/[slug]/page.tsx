import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findFamily } from "@/lib/families";
import GuestListClient from "@/components/GuestList/GuestListClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const family = findFamily(slug);
  return { title: family ? `${family.label} — Daftar Tamu` : "Daftar Tamu" };
}

export default async function FamilyGuestListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const family = findFamily(slug);
  if (!family) notFound();

  return <GuestListClient family={family} />;
}
