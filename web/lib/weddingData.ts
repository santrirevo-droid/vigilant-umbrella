export const WEDDING_DATE_ISO = "2026-08-18T08:00:00+07:00";

export type CoupleRole = "putra" | "putri";

export const couple: Record<
  "groom" | "bride",
  {
    name: string;
    shortName: string;
    role: CoupleRole;
    father: string;
    mother: string;
    instagram: string;
  }
> = {
  groom: {
    name: "Falah Fauzan",
    shortName: "Falah",
    role: "putra",
    father: "Bapak Nonot Suhartono",
    mother: "Ibu Heriana Martawati",
    instagram: "@falfavzan",
  },
  bride: {
    name: "Risyqaa Syafitri",
    shortName: "Risyqaa",
    role: "putri",
    father: "Bapak Safawi",
    mother: "Ibu Tuty Oktavia",
    instagram: "@rsyqaaa",
  },
};

export const events = [
  {
    title: "Akad Nikah",
    time: "08.00 WIB — Selesai",
    date: "Selasa, 18 Agustus 2026",
  },
  {
    title: "Resepsi",
    time: "10.30 WIB — Selesai",
    date: "Selasa, 18 Agustus 2026",
  },
];

export const venue = {
  name: "Mempawah Convention Center",
  location: "Mempawah, Kalimantan Barat",
  mapsUrl: "https://maps.app.goo.gl/izf4Vvh5txNW6AZo7",
};

export const bankAccounts = [
  { bank: "Bank Mandiri", number: "1460021830521", holder: couple.bride.name },
];

export const giftAddress = {
  recipient: couple.groom.name,
  address:
    "Jl. Alam Indah 2 No.7, Cibatu, Cikarang Sel., Kabupaten Bekasi, Jawa Barat 17530, Indonesia",
};
