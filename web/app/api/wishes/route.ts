import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const WISHES_KEY = "wishes:v1";
const MAX_WISHES = 500;

export type Wish = {
  id: number;
  name: string;
  attend: "hadir" | "tidak";
  guests: string;
  message: string;
};

// Vercel's Storage tab can inject either the legacy "Vercel KV" names or the
// native Upstash marketplace names depending on how the store was attached —
// support both rather than assuming one.
function getRedis() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const NOT_CONFIGURED = NextResponse.json(
  { error: "Storage belum terhubung ke situs ini." },
  { status: 503 }
);

/** Every visitor reads the same shared list — no auth, this is a public guestbook by design. */
export async function GET() {
  const redis = getRedis();
  if (!redis) return NOT_CONFIGURED;

  const raw = await redis.lrange<string>(WISHES_KEY, 0, MAX_WISHES - 1);
  const wishes = raw
    .map((entry) => {
      try {
        return JSON.parse(entry) as Wish;
      } catch {
        return null;
      }
    })
    .filter((wish): wish is Wish => wish !== null);

  return NextResponse.json({ wishes });
}

/**
 * Reachable directly, not just through the RSVP form — validate every
 * field server-side rather than trusting the client's shape.
 */
export async function POST(request: Request) {
  const redis = getRedis();
  if (!redis) return NOT_CONFIGURED;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON tidak valid." }, { status: 400 });
  }

  const { name, attend, guests, message } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Nama wajib diisi." }, { status: 400 });
  }
  if (attend !== "hadir" && attend !== "tidak") {
    return NextResponse.json({ error: "Kehadiran tidak valid." }, { status: 400 });
  }

  const wish: Wish = {
    id: Date.now(),
    name: name.trim().slice(0, 80),
    attend,
    guests: typeof guests === "string" ? guests.slice(0, 10) : "",
    message: typeof message === "string" ? message.trim().slice(0, 500) : "",
  };

  await redis.lpush(WISHES_KEY, JSON.stringify(wish));
  await redis.ltrim(WISHES_KEY, 0, MAX_WISHES - 1);

  return NextResponse.json({ wish }, { status: 201 });
}
