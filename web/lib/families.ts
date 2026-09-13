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
  // TODO: ganti dengan nama orang tua sebenarnya, lalu bagikan satu link
  // per keluarga (mis. /daftar-tamu/keluarga-mempelai-pria).
  { slug: "keluarga-mempelai-pria", label: "Keluarga Mempelai Pria (Saiful Amri Tanjung)" },
  { slug: "keluarga-mempelai-wanita", label: "Keluarga Mempelai Wanita (Nufus Nurcholisoh)" },
  { slug: "saiful-nufus", label: "Saiful & Nufus (Teman & Kerabat Sendiri)" },
];

export function findFamily(slug: string): Family | undefined {
  return families.find((family) => family.slug === slug);
}
