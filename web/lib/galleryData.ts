export type GalleryPhoto = { src: string; width: number; height: number };
export type GallerySection = {
  slug: string;
  title: string;
  subtitle: string;
  photos: GalleryPhoto[];
};

/** Chronological gallery, sequenced from the photographers' own camera
 * frame numbers (not just folder names) so the story actually runs in
 * the order it happened: siraman (sehari sebelumnya) → decor → persiapan
 * → arak-arakan → akad → sungkeman → foto sesi/bersama akad → resepsi. */
export const gallerySections: GallerySection[] = [
  {
    slug: "siraman",
    title: "Siraman",
    subtitle: "Tradisi sehari sebelum akad",
    photos: [
      { src: "/gallery/siraman/1.jpg", width: 1920, height: 1280 },
      { src: "/gallery/siraman/2.jpg", width: 1920, height: 2880 },
      { src: "/gallery/siraman/3.jpg", width: 1920, height: 2880 },
      { src: "/gallery/siraman/4.jpg", width: 1920, height: 2880 },
      { src: "/gallery/siraman/5.jpg", width: 1920, height: 2880 },
      { src: "/gallery/siraman/6.jpg", width: 1920, height: 1280 },
      { src: "/gallery/siraman/7.jpg", width: 1920, height: 1280 },
      { src: "/gallery/siraman/8.jpg", width: 1920, height: 1280 },
      { src: "/gallery/siraman/9.jpg", width: 1920, height: 2880 },
      { src: "/gallery/siraman/10.jpg", width: 1920, height: 1280 },
      { src: "/gallery/siraman/11.jpg", width: 1920, height: 1280 },
    ],
  },
  {
    slug: "dekor",
    title: "Dekorasi",
    subtitle: "Sebelum tamu datang",
    photos: [
      { src: "/gallery/dekor/1.jpg", width: 1920, height: 2880 },
      { src: "/gallery/dekor/2.jpg", width: 1920, height: 2880 },
      { src: "/gallery/dekor/3.jpg", width: 1920, height: 1280 },
      { src: "/gallery/dekor/4.jpg", width: 1920, height: 2880 },
    ],
  },
  {
    slug: "persiapan",
    title: "Persiapan",
    subtitle: "Pagi yang penuh doa restu",
    photos: [
      { src: "/gallery/persiapan/1.jpg", width: 1920, height: 1280 },
      { src: "/gallery/persiapan/2.jpg", width: 1920, height: 1280 },
      { src: "/gallery/persiapan/3.jpg", width: 1920, height: 1280 },
      { src: "/gallery/persiapan/4.jpg", width: 1920, height: 1280 },
    ],
  },
  {
    slug: "bearak",
    title: "Arak-Arakan",
    subtitle: "Mengantar mempelai pria",
    photos: [
      { src: "/gallery/bearak/1.jpg", width: 1920, height: 1280 },
      { src: "/gallery/bearak/2.jpg", width: 1920, height: 1280 },
      { src: "/gallery/bearak/3.jpg", width: 1920, height: 1280 },
      { src: "/gallery/bearak/4.jpg", width: 1920, height: 2880 },
      { src: "/gallery/bearak/5.jpg", width: 1920, height: 1280 },
    ],
  },
  {
    slug: "serah-terima",
    title: "Serah Terima",
    subtitle: "Seserahan untuk mempelai wanita",
    photos: [
      { src: "/gallery/serah-terima/1.jpg", width: 1920, height: 2880 },
      { src: "/gallery/serah-terima/2.jpg", width: 1920, height: 2880 },
      { src: "/gallery/serah-terima/3.jpg", width: 1920, height: 2880 },
      { src: "/gallery/serah-terima/4.jpg", width: 1920, height: 2880 },
    ],
  },
  {
    slug: "ijab-kabul",
    title: "Ijab Kabul",
    subtitle: "Sah, di hadapan Allah dan saksi",
    photos: [
      { src: "/gallery/ijab-kabul/1.jpg", width: 1920, height: 2880 },
      { src: "/gallery/ijab-kabul/2.jpg", width: 1920, height: 2880 },
      { src: "/gallery/ijab-kabul/3.jpg", width: 1920, height: 2880 },
      { src: "/gallery/ijab-kabul/4.jpg", width: 1920, height: 2880 },
      { src: "/gallery/ijab-kabul/5.jpg", width: 1920, height: 2880 },
    ],
  },
  {
    slug: "sungkeman",
    title: "Sungkeman",
    subtitle: "Restu orang tua",
    photos: [
      { src: "/gallery/sungkeman/1.jpg", width: 1920, height: 2880 },
      { src: "/gallery/sungkeman/2.jpg", width: 1920, height: 2880 },
      { src: "/gallery/sungkeman/3.jpg", width: 1920, height: 2880 },
      { src: "/gallery/sungkeman/4.jpg", width: 1920, height: 2880 },
      { src: "/gallery/sungkeman/5.jpg", width: 1920, height: 2880 },
    ],
  },
  {
    slug: "sesi-akad",
    title: "Sesi Foto Akad",
    subtitle: "Resmi menjadi suami istri",
    photos: [
      { src: "/gallery/sesi-akad/1.jpg", width: 1920, height: 2880 },
      { src: "/gallery/sesi-akad/2.jpg", width: 1920, height: 2880 },
      { src: "/gallery/sesi-akad/3.jpg", width: 1920, height: 2880 },
      { src: "/gallery/sesi-akad/4.jpg", width: 1920, height: 2880 },
    ],
  },
  {
    slug: "foto-bersama-akad",
    title: "Foto Bersama",
    subtitle: "Bersama keluarga besar",
    photos: [
      { src: "/gallery/foto-bersama-akad/1.jpg", width: 1920, height: 1280 },
      { src: "/gallery/foto-bersama-akad/2.jpg", width: 1920, height: 1280 },
      { src: "/gallery/foto-bersama-akad/3.jpg", width: 1920, height: 1280 },
      { src: "/gallery/foto-bersama-akad/4.jpg", width: 1920, height: 1280 },
    ],
  },
  {
    slug: "candid-resepsi",
    title: "Menyambut Tamu",
    subtitle: "Keramaian resepsi dimulai",
    photos: [
      { src: "/gallery/candid-resepsi/1.jpg", width: 1920, height: 1280 },
      { src: "/gallery/candid-resepsi/2.jpg", width: 1920, height: 1280 },
      { src: "/gallery/candid-resepsi/3.jpg", width: 1920, height: 2880 },
      { src: "/gallery/candid-resepsi/4.jpg", width: 1920, height: 1280 },
      { src: "/gallery/candid-resepsi/5.jpg", width: 1920, height: 1280 },
    ],
  },
  {
    slug: "band",
    title: "Hiburan",
    subtitle: "Musik mengiringi suka cita",
    photos: [
      { src: "/gallery/band/1.jpg", width: 1920, height: 2880 },
      { src: "/gallery/band/2.jpg", width: 1920, height: 2880 },
      { src: "/gallery/band/3.jpg", width: 1920, height: 2880 },
    ],
  },
  {
    slug: "sesi-resepsi",
    title: "Sesi Foto Resepsi",
    subtitle: "Balutan busana adat Melayu",
    photos: [
      { src: "/gallery/sesi-resepsi/1.jpg", width: 1920, height: 1280 },
      { src: "/gallery/sesi-resepsi/2.jpg", width: 1920, height: 2880 },
      { src: "/gallery/sesi-resepsi/3.jpg", width: 1920, height: 2880 },
      { src: "/gallery/sesi-resepsi/4.jpg", width: 1920, height: 2880 },
    ],
  },
  {
    slug: "foto-bersama-resepsi",
    title: "Foto Bersama Resepsi",
    subtitle: "Terima kasih telah hadir",
    photos: [
      { src: "/gallery/foto-bersama-resepsi/1.jpg", width: 1920, height: 1280 },
      { src: "/gallery/foto-bersama-resepsi/2.jpg", width: 1920, height: 1280 },
      { src: "/gallery/foto-bersama-resepsi/3.jpg", width: 1920, height: 1280 },
      { src: "/gallery/foto-bersama-resepsi/4.jpg", width: 1920, height: 1280 },
    ],
  },
];
