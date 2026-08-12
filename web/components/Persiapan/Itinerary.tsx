"use client";

import Link from "next/link";
import {
  BedDouble, ChevronLeft, ChevronRight, Link as LinkIcon, Loader2, Plane, Route, Trash2,
} from "lucide-react";
import { CREAM, EDGE, GOLD, INK, LINE, MUTED, NAVY, NAVY_DARK, PERSIAPAN_GLOBAL_STYLES } from "./theme";
import { AddBtn, Card, Field } from "./ui";
import { useProgressData } from "./useProgressData";

/** One leg of the journey — an icon marker on the shared timeline rail,
 * connected to the next leg by a vertical line, plus its own heading. */
function Leg({
  icon: Icon, color, title, subtitle, last, children,
}: {
  icon: typeof Plane;
  color: string;
  title: string;
  subtitle: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ background: color }}
        >
          <Icon size={16} color="#FFF" />
        </div>
        {!last && <div className="mt-1 w-px flex-1" style={{ background: EDGE }} />}
      </div>
      <div className={`min-w-0 flex-1 ${last ? "" : "pb-10"}`}>
        <h2 className="pf-display text-lg" style={{ color: NAVY }}>{title}</h2>
        <p className="mt-0.5 text-xs" style={{ color: MUTED }}>{subtitle}</p>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

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
            Kedatangan, penginapan, dan rute perjalanan rombongan keluarga selama di Mempawah.
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

        <div className="mt-8">
          {/* ---------- KEDATANGAN ---------- */}
          <Leg icon={Plane} color={NAVY} title="Kedatangan Keluarga Besar" subtitle="Siapa datang, dari mana, dan kapan tiba">
            <Card>
              <div className="divide-y" style={{ borderColor: LINE }}>
                {data.arrivals.map(a => (
                  <div key={a.id} className="p-4">
                    <div className="flex items-start gap-2">
                      <Field value={a.group} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                        onChange={(v) => editRow("arrivals", a.id, "group", v)} placeholder="Nama rombongan"
                        className="text-sm font-medium flex-1" style={{ color: INK }} />
                      {isEditor && (
                        <button onClick={() => delRow("arrivals", a.id)} className="p-1" aria-label="Hapus rombongan">
                          <Trash2 size={13} style={{ color: MUTED }} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-2.5">
                      {([
                        ["Dari", "from", "text", "Kota asal"],
                        ["Jumlah orang", "count", "text", "cth. 12 orang"],
                      ] as const).map(([label, key, type, ph]) => (
                        <div key={key}>
                          <div className="text-[10px] uppercase tracking-wide pf-mono" style={{ color: MUTED }}>{label}</div>
                          <Field value={a[key]} editable={isEditor} onLocked={lockedPrompt} onBlur={commit} type={type}
                            onChange={(v) => editRow("arrivals", a.id, key, v)} placeholder={ph}
                            className="text-sm w-full border-b py-0.5" style={{ color: INK, borderColor: LINE }} />
                        </div>
                      ))}
                      <div>
                        <div className="text-[10px] uppercase tracking-wide pf-mono" style={{ color: MUTED }}>Tanggal tiba</div>
                        <Field value={a.date} editable={isEditor} onLocked={lockedPrompt} onBlur={commit} type="date"
                          onChange={(v) => editRow("arrivals", a.id, "date", v)}
                          className="text-sm w-full border-b py-0.5 pf-mono" style={{ color: "#C1666B", borderColor: LINE }} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wide pf-mono" style={{ color: MUTED }}>Jam tiba</div>
                        <Field value={a.time} editable={isEditor} onLocked={lockedPrompt} onBlur={commit} type="time"
                          onChange={(v) => editRow("arrivals", a.id, "time", v)}
                          className="text-sm w-full border-b py-0.5 pf-mono" style={{ color: "#C1666B", borderColor: LINE }} />
                      </div>
                      <div className="col-span-2">
                        <div className="text-[10px] uppercase tracking-wide pf-mono" style={{ color: MUTED }}>Transportasi</div>
                        <Field value={a.transport} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                          onChange={(v) => editRow("arrivals", a.id, "transport", v)} placeholder="cth. Pesawat via Bandara Supadio"
                          className="text-sm w-full border-b py-0.5" style={{ color: INK, borderColor: LINE }} />
                      </div>
                      <div className="col-span-2">
                        <Field value={a.note} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                          onChange={(v) => editRow("arrivals", a.id, "note", v)} placeholder="Catatan (penjemputan, dll)…"
                          className="text-xs w-full" style={{ color: MUTED }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {isEditor && (
                <AddBtn onClick={() => addRow("arrivals", { group: "", from: "", date: "", time: "", transport: "", count: "", note: "" })} label="Tambah rombongan" />
              )}
            </Card>
          </Leg>

          {/* ---------- PENGINAPAN ---------- */}
          <Leg icon={BedDouble} color={GOLD} title="Tempat Menginap" subtitle="Di mana rombongan menginap selama acara">
            <Card>
              <div className="divide-y" style={{ borderColor: LINE }}>
                {data.lodging.map(l => (
                  <div key={l.id} className="p-4">
                    <div className="flex items-start gap-2">
                      <Field value={l.name} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                        onChange={(v) => editRow("lodging", l.id, "name", v)} placeholder="Nama hotel / rumah"
                        className="text-sm font-medium flex-1" style={{ color: INK }} />
                      {isEditor && (
                        <button onClick={() => delRow("lodging", l.id)} className="p-1" aria-label="Hapus penginapan">
                          <Trash2 size={13} style={{ color: MUTED }} />
                        </button>
                      )}
                    </div>
                    <Field value={l.address} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                      onChange={(v) => editRow("lodging", l.id, "address", v)} placeholder="Alamat"
                      className="text-xs w-full mt-1" style={{ color: MUTED }} />
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-2.5">
                      <div>
                        <div className="text-[10px] uppercase tracking-wide pf-mono" style={{ color: MUTED }}>Untuk rombongan</div>
                        <Field value={l.forGroup} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                          onChange={(v) => editRow("lodging", l.id, "forGroup", v)} placeholder="cth. Keluarga pria"
                          className="text-sm w-full border-b py-0.5" style={{ color: INK, borderColor: LINE }} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wide pf-mono" style={{ color: MUTED }}>Jumlah kamar</div>
                        <Field value={l.rooms} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                          onChange={(v) => editRow("lodging", l.id, "rooms", v)} placeholder="cth. 5 kamar"
                          className="text-sm w-full border-b py-0.5" style={{ color: INK, borderColor: LINE }} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wide pf-mono" style={{ color: MUTED }}>Telepon</div>
                        <Field value={l.phone} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                          onChange={(v) => editRow("lodging", l.id, "phone", v)} placeholder="No. telepon"
                          className="text-sm w-full border-b py-0.5 pf-mono" style={{ color: GOLD, borderColor: LINE }} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wide pf-mono" style={{ color: MUTED }}>Link peta</div>
                        {isEditor ? (
                          <Field value={l.mapUrl} editable onBlur={commit}
                            onChange={(v) => editRow("lodging", l.id, "mapUrl", v)} placeholder="Tempel link peta"
                            className="text-sm w-full border-b py-0.5" style={{ color: NAVY, borderColor: LINE }} />
                        ) : l.mapUrl ? (
                          <a href={l.mapUrl} target="_blank" rel="noopener noreferrer"
                            className="text-sm flex items-center gap-1 border-b py-0.5" style={{ color: NAVY, borderColor: LINE }}>
                            <LinkIcon size={11} /> Buka peta
                          </a>
                        ) : (
                          <div className="text-sm border-b py-0.5" style={{ color: MUTED, borderColor: LINE }}>–</div>
                        )}
                      </div>
                    </div>
                    <Field value={l.note} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                      onChange={(v) => editRow("lodging", l.id, "note", v)} placeholder="Catatan (harga, check-in, dll)…"
                      className="text-xs w-full mt-2" style={{ color: MUTED }} />
                  </div>
                ))}
              </div>
              {isEditor && (
                <AddBtn onClick={() => addRow("lodging", { name: "", address: "", phone: "", rooms: "", forGroup: "", mapUrl: "", note: "" })} label="Tambah penginapan" />
              )}
            </Card>
          </Leg>

          {/* ---------- RUTE ---------- */}
          <Leg icon={Route} color="#C1666B" title="Rute & Transportasi" subtitle="Bagaimana rombongan berpindah tempat" last>
            <Card>
              <div className="divide-y" style={{ borderColor: LINE }}>
                {data.routes.map(r => (
                  <div key={r.id} className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0">
                        <Field value={r.from} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                          onChange={(v) => editRow("routes", r.id, "from", v)} placeholder="Dari"
                          className="text-sm w-full font-medium" style={{ color: INK }} />
                        <div className="flex items-center gap-1.5 my-1">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
                          <span className="flex-1 h-px" style={{ background: EDGE }} />
                          <ChevronRight size={12} style={{ color: GOLD }} />
                        </div>
                        <Field value={r.to} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                          onChange={(v) => editRow("routes", r.id, "to", v)} placeholder="Ke"
                          className="text-sm w-full font-medium" style={{ color: INK }} />
                      </div>
                      {isEditor && (
                        <button onClick={() => delRow("routes", r.id)} className="p-1" aria-label="Hapus rute">
                          <Trash2 size={13} style={{ color: MUTED }} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-wide pf-mono" style={{ color: MUTED }}>Moda</div>
                        <Field value={r.mode} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                          onChange={(v) => editRow("routes", r.id, "mode", v)} placeholder="cth. Mobil"
                          className="text-sm w-full border-b py-0.5" style={{ color: INK, borderColor: LINE }} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wide pf-mono" style={{ color: MUTED }}>Estimasi waktu</div>
                        <Field value={r.duration} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                          onChange={(v) => editRow("routes", r.id, "duration", v)} placeholder="cth. 2 jam"
                          className="text-sm w-full border-b py-0.5 pf-mono" style={{ color: GOLD, borderColor: LINE }} />
                      </div>
                      <div className="col-span-2">
                        <div className="text-[10px] uppercase tracking-wide pf-mono" style={{ color: MUTED }}>Link peta</div>
                        {isEditor ? (
                          <Field value={r.mapUrl} editable onBlur={commit}
                            onChange={(v) => editRow("routes", r.id, "mapUrl", v)} placeholder="Tempel link peta"
                            className="text-sm w-full border-b py-0.5" style={{ color: NAVY, borderColor: LINE }} />
                        ) : r.mapUrl ? (
                          <a href={r.mapUrl} target="_blank" rel="noopener noreferrer"
                            className="text-sm flex items-center gap-1 border-b py-0.5" style={{ color: NAVY, borderColor: LINE }}>
                            <LinkIcon size={11} /> Buka rute di peta
                          </a>
                        ) : (
                          <div className="text-sm border-b py-0.5" style={{ color: MUTED, borderColor: LINE }}>–</div>
                        )}
                      </div>
                    </div>
                    <Field value={r.note} editable={isEditor} onLocked={lockedPrompt} onBlur={commit}
                      onChange={(v) => editRow("routes", r.id, "note", v)} placeholder="Catatan…"
                      className="text-xs w-full mt-2" style={{ color: MUTED }} />
                  </div>
                ))}
              </div>
              {isEditor && (
                <AddBtn onClick={() => addRow("routes", { from: "", to: "", mode: "", duration: "", mapUrl: "", note: "" })} label="Tambah rute" />
              )}
            </Card>
          </Leg>
        </div>
      </div>
    </div>
  );
}
