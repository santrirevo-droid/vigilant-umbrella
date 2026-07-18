"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buildInviteLink, buildWhatsAppShareUrl } from "@/lib/inviteLink";

type GuestEntry = {
  id: string;
  name: string;
  familySlug: string;
  familyLabel: string;
  relation: string;
  guestCount: number;
  createdAt: number;
};

type DuplicateCluster = {
  entries: { id: string; name: string; familyLabel: string }[];
};

export default function RekapClient() {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [clusters, setClusters] = useState<DuplicateCluster[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleCopyLink(entry: GuestEntry) {
    const link = buildInviteLink(window.location.origin, entry.name);
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId((current) => (current === entry.id ? null : current)), 2000);
    } catch {
      // clipboard access failure — rare, not worth replacing the whole page for
    }
  }

  function handleShareWhatsApp(entry: GuestEntry) {
    const link = buildInviteLink(window.location.origin, entry.name);
    window.open(buildWhatsAppShareUrl(link, entry.name), "_blank", "noopener,noreferrer");
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/guest-list/rekap", { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setError(data.error ?? "Gagal memuat data.");
          return;
        }
        setEntries(data.entries ?? []);
        setClusters(data.duplicateClusters ?? []);
      } catch {
        if (!cancelled) setError("Gagal memuat data. Periksa koneksi Anda.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-lg px-6 py-16">
        <p className="text-xl text-ink-soft">Memuat…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-lg px-6 py-16">
        <h1 className="text-3xl font-bold text-ink">Rekap Daftar Tamu</h1>
        <p className="mt-4 text-lg font-medium text-red-600">{error}</p>
      </main>
    );
  }

  const totalPeople = entries.reduce((sum, entry) => sum + entry.guestCount, 0);
  const byFamily = new Map<string, GuestEntry[]>();
  for (const entry of entries) {
    const list = byFamily.get(entry.familyLabel) ?? [];
    list.push(entry);
    byFamily.set(entry.familyLabel, list);
  }

  return (
    <main className="mx-auto flex min-h-full max-w-2xl flex-col px-6 py-16">
      <h1 className="text-3xl font-bold text-ink">Rekap Daftar Tamu</h1>
      <p className="mt-2 text-xl text-ink-soft">
        {entries.length} nama · {totalPeople} orang dari {byFamily.size} keluarga
      </p>

      {clusters.length > 0 && (
        <section className="mt-8 rounded-2xl border-2 border-amber-400 bg-amber-50 p-6">
          <h2 className="text-2xl font-semibold text-amber-900">
            ⚠️ Kemungkinan Nama Duplikat ({clusters.length})
          </h2>
          <p className="mt-1 text-lg text-amber-800">
            Periksa apakah nama-nama ini merujuk ke orang yang sama.
          </p>
          <ul className="mt-4 flex flex-col gap-4">
            {clusters.map((cluster, i) => (
              <li key={i} className="rounded-xl bg-paper p-4">
                <ul className="flex flex-col gap-1">
                  {cluster.entries.map((entry) => (
                    <li key={entry.id} className="text-lg text-ink">
                      {entry.name}{" "}
                      <span className="text-base text-ink-soft">— {entry.familyLabel}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10 flex flex-col gap-8">
        {Array.from(byFamily.entries()).map(([familyLabel, familyEntries]) => (
          <section key={familyLabel}>
            <h2 className="text-2xl font-bold text-ink">{familyLabel}</h2>
            <p className="mt-1 text-lg text-ink-soft">
              {familyEntries.length} nama ·{" "}
              {familyEntries.reduce((sum, entry) => sum + entry.guestCount, 0)} orang
            </p>
            <ul className="mt-3 flex flex-col gap-3">
              {familyEntries.map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-xl border border-border bg-paper px-5 py-4"
                >
                  <p className="truncate text-xl font-medium text-ink">
                    {entry.name}
                    {entry.guestCount > 1 && (
                      <span className="ml-2 text-base font-normal text-ink-soft">
                        · {entry.guestCount} orang
                      </span>
                    )}
                  </p>
                  {entry.relation && (
                    <p className="mt-0.5 truncate text-base text-ink-soft">{entry.relation}</p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleShareWhatsApp(entry)}
                      className="min-h-11 rounded-lg bg-sage px-4 text-base font-semibold text-white"
                    >
                      Kirim WhatsApp
                    </button>
                    <button
                      onClick={() => handleCopyLink(entry)}
                      className="min-h-11 rounded-lg border border-border px-4 text-base font-semibold text-ink"
                    >
                      {copiedId === entry.id ? "Tersalin!" : "Salin Link"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-12 text-base text-ink-soft">
        Untuk menghapus atau mengubah nama, buka halaman keluarga masing-masing di{" "}
        <Link href="/daftar-tamu" className="underline decoration-border underline-offset-4">
          /daftar-tamu
        </Link>
        .
      </p>
    </main>
  );
}
