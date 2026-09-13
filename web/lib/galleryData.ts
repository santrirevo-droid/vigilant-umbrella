export type GalleryPhoto = { src: string; width: number; height: number };
export type GallerySection = {
  slug: string;
  title: string;
  subtitle: string;
  photos: GalleryPhoto[];
};

/**
 * TODO: isi galeri foto Saiful & Nufus di sini. Taruh file-nya di
 * `public/gallery/<slug>/1.jpg`, dst., lalu tambahkan section seperti
 * contoh berikut (width/height = ukuran asli foto, untuk mencegah layout
 * shift):
 *
 * {
 *   slug: "prewedding",
 *   title: "Pre-Wedding",
 *   subtitle: "Sesi foto sebelum hari bahagia",
 *   photos: [{ src: "/gallery/prewedding/1.jpg", width: 1920, height: 1280 }],
 * }
 */
export const gallerySections: GallerySection[] = [];
