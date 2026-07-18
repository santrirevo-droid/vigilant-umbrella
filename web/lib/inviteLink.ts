import { couple } from "@/lib/weddingData";

/** Matches the `?to=` format read by useGuestName on the invitation cover/RSVP. */
export function buildInviteLink(origin: string, guestName: string): string {
  return `${origin}/?to=${encodeURIComponent(guestName)}`;
}

export function buildWhatsAppShareUrl(inviteLink: string, guestName: string): string {
  const message =
    `Assalamu'alaikum, kepada Bapak/Ibu/Saudara/i ${guestName}, dengan hormat kami mengundang ` +
    `untuk hadir di acara pernikahan ${couple.groom.shortName} & ${couple.bride.shortName}. ` +
    `Undangan lengkap dapat dibuka di: ${inviteLink}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
