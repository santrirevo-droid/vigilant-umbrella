"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

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

const STORAGE_KEY = "guestListAdminPassword";

export default function RekapClient() {
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isCheckingStored, setIsCheckingStored] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [clusters, setClusters] = useState<DuplicateCluster[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRekap = useCallback(async (pwd: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await fetch("/api/guest-list/rekap", {
        headers: { "x-admin-password": pwd },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        sessionStorage.removeItem(STORAGE_KEY);
        setIsAuthed(false);
        setAuthError(data.error ?? "Kata sandi salah.");
        return;
      }
      setEntries(data.entries ?? []);
      setClusters(data.duplicateClusters ?? []);
      setIsAuthed(true);
      sessionStorage.setItem(STORAGE_KEY, pwd);
    } catch {
      setAuthError("Gagal memuat data. Periksa koneksi Anda.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    async function checkStoredPassword() {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setIsCheckingStored(false);
        return;
      }
      await fetchRekap(stored);
      setPassword(stored);
      setIsCheckingStored(false);
    }
    checkStoredPassword();
  }, [fetchRekap]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (!password) return;
    await fetchRekap(password);
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/guest-list/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      if (!res.ok) throw new Error();
      setEntries((current) => current.filter((entry) => entry.id !== id));
    } catch {
      setAuthError("Gagal menghapus nama. Coba lagi.");
    }
  }

  if (isCheckingStored) {
    return (
      <main className="mx-auto max-w-lg px-6 py-16">
        <p className="text-xl text-ink-soft">Memuat…</p>
      </main>
    );
  }

  if (!isAuthed) {
    return (
      <main className="mx-auto flex min-h-full max-w-md flex-col px-6 py-16">
        <h1 className="font-display text-3xl font-semibold text-ink">Rekap Daftar Tamu</h1>
        <p className="mt-3 text-xl text-ink-soft">Halaman ini khusus untuk mempelai.</p>

        <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-4">
          <label className="text-lg font-semibold text-ink" htmlFor="admin-password">
            Kata Sandi
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="min-h-14 w-full rounded-xl border-2 border-border bg-paper px-4 py-3 text-xl text-ink outline-none focus:border-gold-dark"
          />
          {authError && <p className="text-lg font-medium text-red-600">{authError}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="min-h-14 rounded-xl bg-gold-dark px-6 py-3 text-lg font-semibold text-paper hover:brightness-90 disabled:opacity-60"
          >
            {isLoading ? "Memeriksa…" : "Masuk"}
          </button>
        </form>
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
      <h1 className="font-display text-3xl font-semibold text-ink">Rekap Daftar Tamu</h1>
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
            <h2 className="font-display text-2xl font-semibold text-ink">{familyLabel}</h2>
            <p className="mt-1 text-lg text-ink-soft">
              {familyEntries.length} nama ·{" "}
              {familyEntries.reduce((sum, entry) => sum + entry.guestCount, 0)} orang
            </p>
            <ul className="mt-3 flex flex-col gap-3">
              {familyEntries.map((entry) => (
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
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="min-h-11 shrink-0 rounded-lg border border-border px-4 text-base font-semibold text-ink-soft"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
