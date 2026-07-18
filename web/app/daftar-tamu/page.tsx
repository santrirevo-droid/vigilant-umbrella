import type { Metadata } from "next";
import Link from "next/link";
import { families } from "@/lib/families";

export const metadata: Metadata = {
  title: "Daftar Tamu — Falah & Risyqaa",
  description: "Halaman untuk keluarga menambahkan nama tamu yang ingin diundang.",
};

export default function DaftarTamuPage() {
  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">Daftar Tamu Undangan</h1>
      <p className="mt-4 text-xl leading-relaxed text-ink-soft">
        Falah &amp; Risyqaa — Selasa, 18 Agustus 2026
      </p>
      <p className="mt-6 text-xl leading-relaxed text-ink">
        Silakan pilih nama keluarga Anda di bawah ini, lalu tuliskan nama-nama
        tamu yang ingin Anda undang.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        {families.map((family) => (
          <Link
            key={family.slug}
            href={`/daftar-tamu/${family.slug}`}
            className="min-h-16 rounded-2xl border border-border bg-paper px-6 py-5 text-xl font-semibold text-ink shadow-sm transition-colors hover:border-gold-dark hover:bg-cream"
          >
            {family.label}
          </Link>
        ))}
      </div>

      <p className="mt-12 text-center text-base text-ink-soft">
        <Link href="/daftar-tamu/rekap" className="underline decoration-border underline-offset-4">
          Lihat rekap semua tamu
        </Link>
      </p>
    </main>
  );
}
