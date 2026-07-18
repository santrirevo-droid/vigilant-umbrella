This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Daftar Tamu (guest list collection)

`/daftar-tamu` lets each family add the names of guests they want invited,
with a live "similar name" check (`/api/guest-list/search`) so two families
don't independently add the same person without noticing.

- Edit `lib/families.ts` to set the family names/links before sharing —
  each family gets its own URL (`/daftar-tamu/<slug>`) and only sees its
  own entries; nothing else identifies who is submitting.
- `/daftar-tamu/rekap` is the combined view for the couple: every family's
  list, total counts, and clusters of likely-duplicate names. It's gated
  by the `GUEST_LIST_ADMIN_PASSWORD` environment variable — set it in
  Vercel's Project Settings → Environment Variables (any value works, it's
  just a shared password, not a per-user login).
- Storage reuses the same Redis/KV store as the wishes feature below — no
  extra provisioning needed, just the one new env var above.

## Environment variables

Set these in Vercel → Project Settings → Environment Variables (a `.env.local` file works for local dev too, `.env*` is already gitignored):

| Variable | Required for | Notes |
| --- | --- | --- |
| `KV_REST_API_URL` / `UPSTASH_REDIS_REST_URL` | Wishes, Daftar Tamu | Auto-filled when you attach a Redis/KV store from Vercel's Storage tab — support both names since Vercel injects one or the other depending on how the store was attached. |
| `KV_REST_API_TOKEN` / `UPSTASH_REDIS_REST_TOKEN` | Wishes, Daftar Tamu | Same as above. |
| `GUEST_LIST_ADMIN_PASSWORD` | Daftar Tamu rekap page | Pick any password; share it only with the couple. |

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
