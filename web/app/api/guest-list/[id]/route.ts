import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { GUEST_LIST_KEY, parseGuestEntry } from "@/lib/guestList";

function notConfigured() {
  return NextResponse.json(
    { error: "Storage belum terhubung ke situs ini." },
    { status: 503 }
  );
}

/**
 * A family may delete its own entries (familySlug in the JSON body must
 * match). The admin recap page may delete any entry by sending the
 * x-admin-password header instead.
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const redis = getRedis();
  if (!redis) return notConfigured();

  const { id } = await params;

  const adminPassword = request.headers.get("x-admin-password");
  const isAdmin =
    !!adminPassword &&
    !!process.env.GUEST_LIST_ADMIN_PASSWORD &&
    adminPassword === process.env.GUEST_LIST_ADMIN_PASSWORD;

  let familySlug: unknown;
  if (!isAdmin) {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "JSON tidak valid." }, { status: 400 });
    }
    familySlug = (body as Record<string, unknown> | null)?.familySlug;
  }

  const raw = await redis.hget<Record<string, unknown>>(GUEST_LIST_KEY, id);
  const entry = parseGuestEntry(raw);
  if (!entry) {
    return NextResponse.json({ error: "Data tamu tidak ditemukan." }, { status: 404 });
  }

  if (!isAdmin && entry.familySlug !== familySlug) {
    return NextResponse.json({ error: "Anda tidak bisa menghapus nama dari keluarga lain." }, { status: 403 });
  }

  await redis.hdel(GUEST_LIST_KEY, id);

  return NextResponse.json({ ok: true });
}
