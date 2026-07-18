import { couple, events, venue, WEDDING_DATE_ISO } from "./weddingData";

function toIcsUtc(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/** Escapes text per RFC 5545 (comma, semicolon, backslash, newline). */
function escapeIcsText(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\n/g, "\\n");
}

function buildIcs() {
  const start = new Date(WEDDING_DATE_ISO);
  const end = new Date(start.getTime() + 5 * 60 * 60 * 1000); // ~5-hour block covering akad + resepsi

  const summary = `Pernikahan ${couple.groom.shortName} & ${couple.bride.shortName}`;
  const location = `${venue.name}, ${venue.location}`;
  const description = [
    ...events.map((event) => `${event.title}: ${event.time}`),
    venue.mapsUrl,
  ].join("\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Falah & Risyqaa Wedding//ID",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:falah-risyqaa-wedding-2026@undangan",
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:${escapeIcsText(summary)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `URL:${venue.mapsUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

/** Ready-made `data:` URL for the "Simpan ke Kalender" download link. */
export const CALENDAR_ICS_URL = `data:text/calendar;charset=utf-8,${encodeURIComponent(buildIcs())}`;
