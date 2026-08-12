"use client";

import Link from "next/link";
import { ChevronLeft, Clock, Loader2, Trash2 } from "lucide-react";
import { CREAM, EDGE, GOLD, INK, MUTED, NAVY, NAVY_DARK, PERSIAPAN_GLOBAL_STYLES } from "./theme";
import { AddBtn, Card, Field } from "./ui";
import { useProgressData } from "./useProgressData";

export default function Itinerary() {
  const { data, loading, saving, loadError, commit, addRow, delRow, editRow } = useProgressData();
  const isEditor = true; // akses terbuka — sama seperti halaman /persiapan utama
  const lockedPrompt = () => {};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: CREAM }}>
        <Loader2 className="animate-spin" size={28} style={{ color: NAVY }} />
      </div>
    );
  }

  const steps = data.familyItinerary.slice().sort((a, b) => (a.time || "").localeCompare(b.time || ""));

  return (
    <div
      className="min-h-screen pb-16"
      style={{ background: CREAM, fontFamily: "var(--font-persiapan-body), sans-serif", color: INK }}
    >
      <style>{PERSIAPAN_GLOBAL_STYLES}</style>

      {/* ---------- HERO ---------- */}
      <div style={{ background: `linear-gradient(150deg, ${NAVY} 0%, ${NAVY_DARK} 100%)` }}>
        <div className="max-w-2xl mx-auto px-6 pt-10 pb-9">
          <Link
            href="/persiapan"
            className="pf-mono inline-flex items-center gap-1 text-xs uppercase tracking-widest"
            style={{ color: GOLD }}
          >
            <ChevronLeft size={13} /> Rencana Persiapan
          </Link>
          <h1 className="pf-display text-3xl sm:text-4xl leading-tight text-white mt-3">
            Itinerary Keluarga Falah
          </h1>
          <p className="text-sm mt-2" style={{ color: "#D9DFE8" }}>
            Jadwal keberangkatan dan perjalanan rombongan, dari berangkat hingga tiba di Mempawah.
          </p>
        </div>
      </div>

      {loadError && (
        <div className="max-w-2xl mx-auto px-6 mt-4">
          <div className="text-sm rounded-lg px-4 py-3" style={{ background: "#FBEAEA", color: "#C1666B" }}>
            Gagal memuat data tersimpan. Muat ulang halaman untuk mencoba lagi.
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-6">
        <p className="mt-4 text-xs" style={{ color: MUTED }}>
          Data yang sama dengan halaman Rencana Persiapan — perubahan di sini ikut tersimpan di sana.
          {saving && <span className="ml-2" style={{ color: GOLD }}>Menyimpan…</span>}
        </p>

        <div className="mt-6 flex items-center gap-2">
          <Clock size={16} style={{ color: NAVY }} />
          <h2 className="pf-display text-lg" style={{ color: NAVY }}>Jadwal Kegiatan</h2>
        </div>

        <Card className="mt-3">
          <div className="px-4 pt-4 pb-1">
            {steps.length === 0 ? (
              <div className="px-2 py-6 text-center text-sm" style={{ color: MUTED }}>Belum ada jadwal.</div>
            ) : (
              steps.map((step, i, arr) => (
                <div key={step.id} className="flex gap-3 pb-5">
                  {/* timeline rail */}
                  <div className="flex flex-col items-center shrink-0 w-28">
                    {isEditor ? (
                      <input
                        type="time"
                        value={step.time || ""}
                        onChange={(e) => editRow("familyItinerary", step.id, "time", e.target.value)}
                        onBlur={commit}
                        className="pf-mono text-sm w-full px-1.5 py-1 rounded-md border text-center"
                        style={{ color: NAVY, borderColor: EDGE, background: "#FFF" }}
                      />
                    ) : (
                      <span
                        className="pf-mono text-sm font-semibold px-2 py-1 rounded-md w-full text-center"
                        style={{ color: NAVY, background: "#F4F1EA", letterSpacing: "0.02em" }}
                      >
                        {step.time || "–"}
                      </span>
                    )}
                    <span className="w-2.5 h-2.5 rounded-full mt-2 shrink-0" style={{ background: GOLD, border: `2px solid ${NAVY}` }} />
                    {i < arr.length - 1 && <span className="w-px flex-1 mt-1" style={{ background: EDGE }} />}
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <Field value={step.activity} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                      onChange={(v) => editRow("familyItinerary", step.id, "activity", v)} placeholder="cth. Berangkat dari Surabaya"
                      className="text-sm w-full font-medium" style={{ color: INK }} />
                    <Field value={step.note} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                      onChange={(v) => editRow("familyItinerary", step.id, "note", v)} placeholder="Catatan…"
                      className="text-xs w-full mt-0.5" style={{ color: MUTED }} />
                  </div>

                  {isEditor && (
                    <button onClick={() => delRow("familyItinerary", step.id)} className="p-1 h-fit" aria-label="Hapus jadwal">
                      <Trash2 size={13} style={{ color: MUTED }} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
          {isEditor && (
            <AddBtn onClick={() => addRow("familyItinerary", { time: "12:00", activity: "", note: "" })} label="Tambah kegiatan" />
          )}
        </Card>
      </div>
    </div>
  );
}
