/** @format */

const MAX_LENGTH = 60;

/**
 * Guest names arrive from an untrusted query string. They are only ever
 * rendered as plain text, but we still normalise and clamp the value.
 */
export function getSafeGuestName(value: string | null | undefined) {
  if (!value) return null;

  const cleaned = value
    .replace(/[<>\\/{}[\]$`|]/g, " ")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_LENGTH)
    .trim();

  return cleaned.length > 0 ? cleaned : null;
}

export function readGuestNameFromLocation(parameter: string) {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);

  return getSafeGuestName(params.get(parameter));
}
