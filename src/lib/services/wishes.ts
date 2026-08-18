/** @format */

import type { Wish } from "@/types/invitation";

/**
 * Demo persistence only. Replace this module with a real backend call
 * (route handler / database) without touching the presentation layer.
 */

const STORAGE_KEY = "wedding-wishes";

const seedWishes: Wish[] = [
  {
    id: "wish-seed-01",
    author: "Sarah",
    message:
      "Semoga rumah kalian selalu dipenuhi tawa, kesabaran, dan pagi yang hangat.",
    createdAt: "2026-01-04T09:00:00.000Z",
  },

  {
    id: "wish-seed-02",
    author: "Daniel",
    message:
      "Selamat menempuh hidup baru. Semoga selalu berjalan beriringan sampai akhir.",
    createdAt: "2026-01-06T09:00:00.000Z",
  },

  {
    id: "wish-seed-03",
    author: "Ratna",
    message:
      "Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Selamat menempuh hidup baru.",
    createdAt: "2026-01-09T09:00:00.000Z",
  },
];

export async function fetchWishes(): Promise<Wish[]> {
  await delay(500);

  return [...readStored(), ...seedWishes];
}

export async function submitWish(input: {
  author: string;
  message: string;
}): Promise<Wish> {
  const author = input.author.trim();

  const message = input.message.trim();

  if (!author) {
    throw new Error("Mohon tuliskan nama Anda.");
  }

  if (message.length < 4) {
    throw new Error("Mohon tuliskan doa yang sedikit lebih panjang.");
  }

  await delay(600);

  const wish: Wish = {
    id: createId(),

    author: author.slice(0, 60),

    message: message.slice(0, 500),

    createdAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([wish, ...readStored()]),
    );
  } catch {
    // Storage may be unavailable; the wish still appears for this session.
  }

  return wish;
}

function readStored(): Wish[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    const parsed = raw ? (JSON.parse(raw) as Wish[]) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `wish-${Date.now()}`;
}
