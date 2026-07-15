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
    instagram: "@falahfauzan",
  },
  bride: {
    name: "Risyqaa Syafitri",
    shortName: "Risyqaa",
    role: "putri",
    father: "Bapak Safawi",
    mother: "Ibu Tuty Oktavia",
    instagram: "@risyqaasyafitri",
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
  mapsUrl: "https://share.google/PXh2WLLQuSQCdtW2h",
};

export const bankAccounts = [
  { bank: "Bank BCA", number: "0000 0000 0000", holder: couple.groom.name },
  { bank: "Bank Mandiri", number: "0000 0000 0000", holder: couple.bride.name },
];
