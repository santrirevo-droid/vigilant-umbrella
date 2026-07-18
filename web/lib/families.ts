export type Family = {
  /** URL-safe id, e.g. /daftar-tamu/keluarga-mempelai-pria */
  slug: string;
  /** Shown on buttons and in duplicate-name warnings */
  label: string;
};

/**
 * Edit this list before sharing links with each family — one link per
 * entry (e.g. /daftar-tamu/keluarga-bapak-nonot) goes to that family only.
 * The slug in the URL is the only thing that identifies who's adding
 * names, so keep slugs unique and don't rename one after sharing its link.
 */
export const families: Family[] = [
  { slug: "keluarga-bapak-nonot", label: "Keluarga Bapak Drh. Nonot Suhartono" },
  { slug: "keluarga-ibu-heriana", label: "Keluarga Ibu Drh. Heriana Martawati" },
  { slug: "keluarga-bapak-safawi", label: "Keluarga Bapak Ir. Safawi" },
  { slug: "keluarga-ibu-tuty", label: "Keluarga Ibu Tuty Oktavia" },
  { slug: "falah-risyqaa", label: "Falah & Risyqaa (Teman & Kerabat Sendiri)" },
];

export function findFamily(slug: string): Family | undefined {
  return families.find((family) => family.slug === slug);
}
