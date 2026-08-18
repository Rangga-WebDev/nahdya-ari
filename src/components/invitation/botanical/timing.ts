/** @format */

/**
 * Shared clock for the opening. The botanical curtain and the cover content
 * mount at the same moment, so fixed offsets keep them in step without any
 * cross-component event plumbing.
 */
export const opening = {
  /** How long the flowers sit closed before they start to part. */
  hold: 0.45,

  /** Length of the parting itself. */
  part: 2.3,

  /** Cover content beats, measured from mount. */
  backdrop: 1.1,
  eyebrow: 1.5,
  names: 1.75,
  date: 2.05,
  cta: 2.25,
} as const;

/** A returning guest gets the same choreography at roughly double speed. */
export const REPLAY_SCALE = 0.45;

const KEY = "weddingOpeningPlayed";

export function hasPlayedOpening() {
  try {
    return window.sessionStorage.getItem(KEY) === "true";
  } catch {
    return false;
  }
}

export function markOpeningPlayed() {
  try {
    window.sessionStorage.setItem(KEY, "true");
  } catch {
    /* Private mode — replaying the full opening is an acceptable fallback. */
  }
}
