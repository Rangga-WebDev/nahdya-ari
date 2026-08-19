/** @format */

import { invitation } from "@/lib/invitation";
import { getSafeGuestName } from "@/lib/guest";

export type GuestEntry = {
  id: string;
  name: string;
  phone: string;
};

export const MESSAGE_TOKENS = ["{nama}", "{link}"] as const;

export const defaultMessageTemplate = `Assalamu'alaikum Warahmatullahi Wabarakatuh

Kepada Yth. {nama}

Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.

Berikut link undangan kami:
{link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila berkenan hadir.

Terima kasih.
${invitation.bride.firstName} & ${invitation.groom.firstName}`;

/**
 * Mirrors the sanitising the invitation itself applies, so the link previewed
 * here is exactly the name the guest will see.
 */
export function previewGuestName(name: string) {
  return getSafeGuestName(name) ?? invitation.experience.guestFallback;
}

export function buildInvitationUrl(origin: string, name: string) {
  const parameter = invitation.experience.guestParameter;

  const safe = getSafeGuestName(name);

  if (!safe) return origin;

  return `${origin}/?${parameter}=${encodeURIComponent(safe)}`;
}

/** Accepts `08…`, `8…`, `62…` or `+62…` and returns the wa.me digits. */
export function normalisePhone(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) return null;

  if (digits.startsWith("62")) return digits;

  if (digits.startsWith("0")) return `62${digits.slice(1)}`;

  if (digits.startsWith("8")) return `62${digits}`;

  return digits;
}

export function renderMessage(
  template: string,
  values: { name: string; link: string },
) {
  return template
    .replaceAll("{nama}", values.name)
    .replaceAll("{link}", values.link);
}

/** Without a number wa.me still opens WhatsApp on its contact picker. */
export function buildWhatsappUrl(phone: string | null, message: string) {
  const text = encodeURIComponent(message);

  return phone
    ? `https://wa.me/${phone}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

/** Leading `= + - @` would be executed as a formula by Excel and Sheets. */
function escapeCsvCell(value: string) {
  const guarded = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;

  return `"${guarded.replaceAll('"', '""')}"`;
}

export function buildCsv(
  rows: { name: string; phone: string; link: string }[],
) {
  const header = ["Nama", "WhatsApp", "Link Undangan"];

  const body = rows.map((row) =>
    [row.name, row.phone, row.link].map(escapeCsvCell).join(","),
  );

  /* BOM keeps Excel from mangling accented characters. */
  return `\uFEFF${[header.map(escapeCsvCell).join(","), ...body].join("\r\n")}`;
}

export function createGuestId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `guest-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
