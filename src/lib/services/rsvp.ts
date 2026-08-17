/** @format */

import type { RSVPSubmission } from "@/types/invitation";

/**
 * Demo persistence only. Replace this module with a real backend call
 * (route handler / database) without touching the presentation layer.
 */

const STORAGE_KEY = "wedding-rsvp";

export type RSVPRecord = RSVPSubmission & {
  id: string;
  createdAt: string;
};

export function readLocalRSVP(): RSVPRecord | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    return raw ? (JSON.parse(raw) as RSVPRecord) : null;
  } catch {
    return null;
  }
}

export async function submitRSVP(payload: RSVPSubmission): Promise<RSVPRecord> {
  const guestName = payload.guestName.trim();

  if (!guestName) {
    throw new Error("Please write your name so we know who is coming.");
  }

  if (!Number.isFinite(payload.guestCount) || payload.guestCount < 1) {
    throw new Error("The number of guests must be at least one.");
  }

  await delay(700);

  const record: RSVPRecord = {
    ...payload,

    guestName,

    message: payload.message?.trim() || undefined,

    id: createId(),

    createdAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage may be unavailable (private mode). The confirmation still stands.
  }

  return record;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `rsvp-${Date.now()}`;
}
