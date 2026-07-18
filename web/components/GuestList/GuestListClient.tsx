"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import type { Family } from "@/lib/families";
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

type SimilarMatch = { name: string; familyLabel: string; score: number };

const fieldClass =
  "w-full rounded-xl border-2 border-border bg-paper px-4 py-3 text-xl text-ink outline-none transition-colors focus:border-gold-dark";
const labelClass = "mb-2 block text-lg font-semibold text-ink";
const buttonClass =
  "min-h-14 rounded-xl px-6 py-3 text-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

function parseNameLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function GuestListClient({ family }: { family: Family }) {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);

  const [namesText, setNamesText] = useState("");
  const [similar, setSimilar] = useState<Record<string, SimilarMatch[]>>({});
  // Tracks which exact textarea text the "tetap tambahkan" checkbox was
  // ticked for, so editing the names after confirming automatically
  // un-confirms it without needing an effect to reset a separate boolean.
  const [confirmedText, setConfirmedText] = useState<string | null>(null);
  const hasSimilar = Object.keys(similar).length > 0;
  const confirmedDespiteSimilar = confirmedText !== null && confirmedText === namesText;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

    async function runSearch(lines: string[]) {
      if (lines.length === 0) {
        setSimilar({});
        return;
      }
      const requestId = ++searchRequestId.current;
      try {
        const results = await Promise.all(
          lines.map(async (line) => {
            const res = await fetch(`/api/guest-list/search?q=${encodeURIComponent(line)}`);
            const data = await res.json();
            return [line, res.ok ? (data.matches as SimilarMatch[] ?? []) : []] as const;
          })
        );
        if (requestId !== searchRequestId.current) return;
        const next: Record<string, SimilarMatch[]> = {};
        for (const [line, matches] of results) {
          if (matches.length > 0) next[line] = matches;
        }
        setSimilar(next);
      } catch {
        // ignore — duplicate check is a helper, not a hard requirement
      }
    }

    searchTimer.current = setTimeout(() => runSearch(parseNameLines(namesText)), 400);

    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, [namesText]);

  const totalPeople = entries.reduce((sum, entry) => sum + entry.guestCount, 0);
  const nameLines = parseNameLines(namesText);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (nameLines.length === 0) {
      setFormError("Mohon isi minimal satu nama tamu.");
      return;
    }
    if (hasSimilar && !confirmedDespiteSimilar) {
      setFormError("Mohon periksa nama mirip di atas sebelum menambahkan.");
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    const added: GuestEntry[] = [];
    const failed: string[] = [];
    for (const line of nameLines) {
      try {
        const res = await fetch("/api/guest-list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ familySlug: family.slug, name: line }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error();
        added.push(data.entry);
      } catch {
        failed.push(line);
      }
    }

    if (added.length > 0) {
      setEntries((current) => [...added.reverse(), ...current]);
    }
    if (failed.length === 0) {
      setSuccessMessage(
        added.length === 1 ? `"${added[0].name}" berhasil ditambahkan.` : `${added.length} nama berhasil ditambahkan.`
      );
      setNamesText("");
      setSimilar({});
      setConfirmedText(null);
    } else {
      setFormError(`Gagal menambahkan: ${failed.join(", ")}. Nama lainnya sudah tersimpan.`);
      setNamesText(failed.join("\n"));
    }

    setIsSubmitting(false);
  }

  async function handleCopyLink(entry: GuestEntry) {
    const link = buildInviteLink(window.location.origin, entry.name);
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId((current) => (current === entry.id ? null : current)), 2000);
    } catch {
      setFormError("Gagal menyalin link. Coba lagi.");
    }
  }

  function handleShareWhatsApp(entry: GuestEntry) {
    const link = buildInviteLink(window.location.origin, entry.name);
    window.open(buildWhatsAppShareUrl(link, entry.name), "_blank", "noopener,noreferrer");
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

      <h1 className="mt-4 text-3xl font-bold text-ink">{family.label}</h1>
      <p className="mt-2 text-xl text-ink-soft">
        Tuliskan nama tamu yang ingin Anda undang, satu nama per baris.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6 rounded-2xl border border-border bg-paper p-6">
        <div>
          <label className={labelClass} htmlFor="guest-names">
            Nama Tamu
          </label>
          <textarea
            id="guest-names"
            value={namesText}
            onChange={(e) => {
              setNamesText(e.target.value);
              if (formError) setFormError(null);
            }}
            placeholder={"Contoh:\nBudi Santoso\nSiti Aminah\nAhmad Fauzi"}
            rows={5}
            className={`${fieldClass} resize-y`}
          />
          {nameLines.length > 0 && (
            <p className="mt-2 text-base text-ink-soft">{nameLines.length} nama akan ditambahkan.</p>
          )}

          {hasSimilar && (
            <div className="mt-3 rounded-xl border-2 border-amber-400 bg-amber-50 px-4 py-3">
              <p className="text-lg font-semibold text-amber-900">
                ⚠️ Sudah ada nama mirip:
              </p>
              <ul className="mt-2 flex flex-col gap-2">
                {Object.entries(similar).map(([line, matches]) => (
                  <li key={line} className="text-lg text-amber-900">
                    {line}
                    <span className="block text-base text-amber-700">
                      mirip dengan {matches.map((m) => `${m.name} (${m.familyLabel})`).join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
              <label className="mt-3 flex items-center gap-3 text-lg text-amber-900">
                <input
                  type="checkbox"
                  className="h-6 w-6"
                  checked={confirmedDespiteSimilar}
                  onChange={(e) => setConfirmedText(e.target.checked ? namesText : null)}
                />
                Ini semua orang yang berbeda, tetap tambahkan
              </label>
            </div>
          )}
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
        <h2 className="text-2xl font-bold text-ink">
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
                className="rounded-xl border border-border bg-paper px-5 py-4"
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

                  {pendingDeleteId === entry.id ? (
                    <>
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
                    </>
                  ) : (
                    <button
                      onClick={() => setPendingDeleteId(entry.id)}
                      className="min-h-11 rounded-lg border border-border px-4 text-base font-semibold text-ink-soft"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
