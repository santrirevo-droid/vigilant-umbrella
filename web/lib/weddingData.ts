export const WEDDING_DATE_ISO = "2026-11-01T08:00:00+07:00";

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
    name: "Saiful Amri Tanjung",
    shortName: "Saiful",
    role: "putra",
    father: "Bapak (TODO: nama ayah)",
    mother: "Ibu (TODO: nama ibu)",
    instagram: "@ (TODO)",
  },
  bride: {
    name: "Nufus Nurcholisoh",
    shortName: "Nufus",
    role: "putri",
    father: "Bapak (TODO: nama ayah)",
    mother: "Ibu (TODO: nama ibu)",
    instagram: "@ (TODO)",
  },
};

export const events = [
  {
    title: "Akad Nikah",
    time: "08.00 WIB — Selesai (TODO: konfirmasi jam)",
    date: "Minggu, 01 November 2026",
  },
  {
    title: "Resepsi",
    time: "12.00 WIB — 17.00 WIB (TODO: konfirmasi jam)",
    date: "Minggu, 01 November 2026",
  },
];

export const venue = {
  name: "Rumah Mempelai Wanita",
  location: "Pandeglang, Banten",
  mapsUrl: "", // TODO: isi link Google Maps lokasi
};

export const bankAccounts = [
  { bank: "BCA", number: "7003007539", holder: "Saiful Amri Tanjung" },
];

export const giftAddress = {
  recipient: "Saiful Amri Tanjung",
  address: "(TODO: alamat lengkap untuk kirim kado, Pandeglang, Banten)",
};
