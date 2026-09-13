import { events } from "@/lib/weddingData";

/** Matches the `?to=` format read by useGuestName on the invitation cover/RSVP. */
export function buildInviteLink(origin: string, guestName: string): string {
  return `${origin}/?to=${encodeURIComponent(guestName)}`;
}

export function buildWhatsAppShareUrl(inviteLink: string, guestName: string): string {
  const message =
    `Assalamu'alaikum warahmatullahi wabarakatuh.\n\n` +
    `Yth. Bapak/Ibu/Saudara/i\n${guestName}\n\n` +
    `Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk menjadi bagian dari momen bahagia pernikahan ` +
    `Falah Fauzan & Risyqaa Syafitri yang insyaAllah akan diselenggarakan pada ${events[0].date}.\n\n` +
    `Informasi lengkap mengenai acara, serta kolom doa dan ucapan, dapat diakses melalui tautan berikut:\n\n` +
    `🔗 ${inviteLink}\n\n` +
    `Terima kasih atas perhatian, doa, dan restunya.\n\n` +
    `Wassalamu'alaikum warahmatullahi wabarakatuh.`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
