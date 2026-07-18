"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import type { Family } from "@/lib/families";

type GuestEntry = {
  id: string;
  name: string;
  familySlug: string;
  familyLabel: string;
  relation: string;
  guestCount: number;
  createdAt: number;
};

type SimilarMatch = { name: string; familyLabel: string; score: number };

const fieldClass =
  "min-h-14 w-full rounded-xl border-2 border-border bg-paper px-4 py-3 text-xl text-ink outline-none transition-colors focus:border-gold-dark";
const labelClass = "mb-2 block text-lg font-semibold text-ink";
const buttonClass =
  "min-h-14 rounded-xl px-6 py-3 text-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export default function GuestListClient({ family }: { family: Family }) {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);

  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [similar, setSimilar] = useState<SimilarMatch[]>([]);
  // Tracks which exact name text the "tetap tambahkan" checkbox was ticked
  // for, so editing the name after confirming automatically un-confirms it
  // without needing an effect to reset a separate boolean.
  const [confirmedName, setConfirmedName] = useState<string | null>(null);
  const confirmedDespiteSimilar = confirmedName !== null && confirmedName === name.trim();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchRequestId = useRef(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/guest-list?family=${family.slug}`, { cache: "no-store" });
        const data = await res.json();
        if (!cancelled && res.ok) setEntries(data.entries ?? []);
      } finally {
        if (!cancelled) setIsLoadingList(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [family.slug]);

  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);

    async function runSearch(query: string) {
      if (query.length < 2) {
        setSimilar([]);
        return;
      }
      const requestId = ++searchRequestId.current;
      try {
        const res = await fetch(`/api/guest-list/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (requestId === searchRequestId.current && res.ok) {
          setSimilar(data.matches ?? []);
        }
      } catch {
        // ignore — duplicate check is a helper, not a hard requirement
      }
    }

    searchTimer.current = setTimeout(() => runSearch(name.trim()), 400);

    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, [name]);

  const totalPeople = entries.reduce((sum, entry) => sum + entry.guestCount, 0);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Mohon isi nama tamu terlebih dahulu.");
      return;
    }
    if (similar.length > 0 && !confirmedDespiteSimilar) {
      setFormError("Mohon periksa nama mirip di atas sebelum menambahkan.");
      return;
    }

    setFormError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/guest-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          familySlug: family.slug,
          name: name.trim(),
          relation: relation.trim(),
          guestCount,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal menambahkan tamu.");

      setEntries((current) => [data.entry, ...current]);
      setSuccessMessage(`"${data.entry.name}" berhasil ditambahkan.`);
      setName("");
      setRelation("");
      setGuestCount(1);
      setSimilar([]);
      setConfirmedName(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Gagal menambahkan tamu.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/guest-list/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ familySlug: family.slug }),
      });
      if (!res.ok) throw new Error();
      setEntries((current) => current.filter((entry) => entry.id !== id));
    } catch {
      setFormError("Gagal menghapus nama. Coba lagi.");
    } finally {
      setPendingDeleteId(null);
    }
  }

  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col px-6 py-16">
      <Link href="/daftar-tamu" className="text-base text-ink-soft underline decoration-border underline-offset-4">
        ← Ganti keluarga
      </Link>

      <h1 className="mt-4 font-display text-3xl font-semibold text-ink">{family.label}</h1>
      <p className="mt-2 text-xl text-ink-soft">
        Tuliskan nama tamu yang ingin Anda undang, satu per satu.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6 rounded-2xl border border-border bg-paper p-6">
        <div>
          <label className={labelClass} htmlFor="guest-name">
            Nama Tamu
          </label>
          <input
            id="guest-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (formError) setFormError(null);
            }}
            placeholder="Contoh: Budi Santoso"
            autoComplete="off"
            className={fieldClass}
          />

          {similar.length > 0 && (
            <div className="mt-3 rounded-xl border-2 border-amber-400 bg-amber-50 px-4 py-3">
              <p className="text-lg font-semibold text-amber-900">
                ⚠️ Sudah ada nama mirip:
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {similar.map((match, i) => (
                  <li key={i} className="text-lg text-amber-900">
                    {match.name} <span className="text-base text-amber-700">— {match.familyLabel}</span>
                  </li>
                ))}
              </ul>
              <label className="mt-3 flex items-center gap-3 text-lg text-amber-900">
                <input
                  type="checkbox"
                  className="h-6 w-6"
                  checked={confirmedDespiteSimilar}
                  onChange={(e) => setConfirmedName(e.target.checked ? name.trim() : null)}
                />
                Ini orang yang berbeda, tetap tambahkan
              </label>
            </div>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="guest-count">
            Jumlah Orang
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setGuestCount((n) => Math.max(1, n - 1))}
              aria-label="Kurangi jumlah orang"
              className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-border text-2xl font-bold text-ink"
            >
              −
            </button>
            <span id="guest-count" className="min-w-10 text-center text-2xl font-semibold text-ink">
              {guestCount}
            </span>
            <button
              type="button"
              onClick={() => setGuestCount((n) => Math.min(20, n + 1))}
              aria-label="Tambah jumlah orang"
              className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-border text-2xl font-bold text-ink"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="guest-relation">
            Keterangan (opsional)
          </label>
          <input
            id="guest-relation"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            placeholder="Contoh: Teman kerja Ayah"
            className={fieldClass}
          />
        </div>

        {formError && <p className="text-lg font-medium text-red-600">{formError}</p>}
        {successMessage && !formError && (
          <p className="text-lg font-medium text-sage-dark">✅ {successMessage}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${buttonClass} bg-gold-dark text-paper hover:brightness-90`}
        >
          {isSubmitting ? "Menyimpan…" : "+ Tambah Tamu"}
        </button>
      </form>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Tamu yang Sudah Anda Tambahkan
        </h2>
        <p className="mt-1 text-lg text-ink-soft">
          {entries.length} nama · {totalPeople} orang
        </p>

        {isLoadingList ? (
          <p className="mt-4 text-lg text-ink-soft">Memuat…</p>
        ) : entries.length === 0 ? (
          <p className="mt-4 text-lg text-ink-soft">Belum ada nama yang ditambahkan.</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-border bg-paper px-5 py-4"
              >
                <div className="min-w-0">
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
                </div>

                {pendingDeleteId === entry.id ? (
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="min-h-11 rounded-lg bg-red-600 px-4 text-base font-semibold text-white"
                    >
                      Ya, Hapus
                    </button>
                    <button
                      onClick={() => setPendingDeleteId(null)}
                      className="min-h-11 rounded-lg border border-border px-4 text-base font-semibold text-ink"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setPendingDeleteId(entry.id)}
                    className="min-h-11 shrink-0 rounded-lg border border-border px-4 text-base font-semibold text-ink-soft"
                  >
                    Hapus
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
