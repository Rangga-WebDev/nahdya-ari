/** @format */

"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import {
  type GuestEntry,
  buildCsv,
  buildInvitationUrl,
  buildWhatsappUrl,
  createGuestId,
  defaultMessageTemplate,
  normalisePhone,
  previewGuestName,
  renderMessage,
} from "@/lib/guestLinks";

import styles from "./GuestLinkBuilder.module.css";

const STORAGE_KEY = "wedding-guest-links";

const emptyState: StoredState = {
  guests: [],
  template: defaultMessageTemplate,
};

/* Returns false on the server and during hydration, true on every render
   after — so the stored list can never cause a hydration mismatch. */
const subscribeToNothing = () => () => {};

type StoredState = {
  guests: GuestEntry[];
  template: string;
};

function readStored(): StoredState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredState>;

    if (!Array.isArray(parsed.guests)) return null;

    return {
      guests: parsed.guests.filter(
        (guest): guest is GuestEntry =>
          typeof guest?.id === "string" && typeof guest?.name === "string",
      ),

      template:
        typeof parsed.template === "string"
          ? parsed.template
          : defaultMessageTemplate,
    };
  } catch {
    return null;
  }
}

type Props = {
  coupleName: string;
  guestParameter: string;
};

export function GuestLinkBuilder({ coupleName, guestParameter }: Props) {
  const ready = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const [origin] = useState(() =>
    typeof window === "undefined" ? "" : window.location.origin,
  );

  const [stored, setStored] = useState<StoredState>(
    () => readStored() ?? emptyState,
  );

  const { guests, template } = stored;

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [bulk, setBulk] = useState("");

  const [showBulk, setShowBulk] = useState(false);

  const [showTemplate, setShowTemplate] = useState(false);

  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!ready) return;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }, [stored, ready]);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(""), 2400);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const rows = useMemo(() => {
    if (!ready) return [];

    return guests.map((guest) => {
      const link = buildInvitationUrl(origin, guest.name);

      const message = renderMessage(template, {
        name: previewGuestName(guest.name),
        link,
      });

      return {
        ...guest,
        link,
        whatsapp: buildWhatsappUrl(normalisePhone(guest.phone), message),
      };
    });
  }, [guests, origin, template, ready]);

  function updateGuests(update: (current: GuestEntry[]) => GuestEntry[]) {
    setStored((current) => ({ ...current, guests: update(current.guests) }));
  }

  function setTemplate(value: string) {
    setStored((current) => ({ ...current, template: value }));
  }

  function addGuest(event: React.FormEvent) {
    event.preventDefault();

    const trimmed = name.trim();

    if (!trimmed) return;

    updateGuests((current) => [
      ...current,
      { id: createGuestId(), name: trimmed, phone: phone.trim() },
    ]);

    setName("");

    setPhone("");
  }

  function addBulk() {
    const names = bulk
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (names.length === 0) return;

    updateGuests((current) => [
      ...current,
      ...names.map((entry) => ({
        id: createGuestId(),
        name: entry,
        phone: "",
      })),
    ]);

    setBulk("");

    setShowBulk(false);

    setNotice(`${names.length} nama ditambahkan.`);
  }

  function removeGuest(id: string) {
    updateGuests((current) => current.filter((guest) => guest.id !== id));
  }

  function clearAll() {
    if (!window.confirm("Hapus seluruh daftar tamu?")) return;

    updateGuests(() => []);
  }

  async function copy(value: string, message: string) {
    try {
      await navigator.clipboard.writeText(value);

      setNotice(message);
    } catch {
      setNotice(
        "Browser menolak akses clipboard. Salin manual dari kolom link.",
      );
    }
  }

  function downloadCsv() {
    const csv = buildCsv(
      rows.map((row) => ({
        name: row.name,
        phone: row.phone,
        link: row.link,
      })),
    );

    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );

    const anchor = document.createElement("a");

    anchor.href = url;

    anchor.download = "daftar-tamu.csv";

    anchor.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Halaman Pengelola</p>

          <h1 className={styles.title}>Daftar Tamu {coupleName}</h1>

          <p className={styles.lead}>
            Tulis nama tamu, lalu kirim linknya. Setiap tamu mendapat link yang
            sama, hanya bagian <code>?{guestParameter}=</code> yang berbeda —
            namanya akan muncul di sampul undangan.
          </p>

          <p className={styles.warn}>
            Halaman ini tidak terhubung dari undangan dan tidak terindeks mesin
            pencari, tapi siapa pun yang tahu alamatnya bisa membukanya. Jangan
            sebarkan alamat halaman ini.
          </p>
        </header>

        <section className={styles.card}>
          <form className={styles.form} onSubmit={addGuest}>
            <label className={styles.field}>
              <span>Nama tamu</span>

              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Bapak Andi & Keluarga"
                maxLength={60}
                autoComplete="off"
              />
            </label>

            <label className={styles.field}>
              <span>No. WhatsApp (opsional)</span>

              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="0812xxxxxxx"
                inputMode="tel"
                autoComplete="off"
              />
            </label>

            <button type="submit" className={styles.primary}>
              Tambah
            </button>
          </form>

          <div className={styles.tools}>
            <button
              type="button"
              className={styles.ghost}
              onClick={() => setShowBulk((value) => !value)}
            >
              {showBulk ? "Tutup tempel massal" : "Tempel banyak nama"}
            </button>

            <button
              type="button"
              className={styles.ghost}
              onClick={() => setShowTemplate((value) => !value)}
            >
              {showTemplate ? "Tutup pesan" : "Ubah pesan WhatsApp"}
            </button>
          </div>

          {showBulk ? (
            <div className={styles.panel}>
              <label className={styles.field}>
                <span>Satu nama per baris</span>

                <textarea
                  value={bulk}
                  onChange={(event) => setBulk(event.target.value)}
                  rows={6}
                  placeholder={"Bapak Andi\nIbu Sari\nKeluarga Besar Antu"}
                  data-lenis-prevent
                />
              </label>

              <button
                type="button"
                className={styles.primary}
                onClick={addBulk}
              >
                Tambahkan semua
              </button>
            </div>
          ) : null}

          {showTemplate ? (
            <div className={styles.panel}>
              <label className={styles.field}>
                <span>
                  Gunakan <code>{"{nama}"}</code> dan <code>{"{link}"}</code>{" "}
                  sebagai penanda
                </span>

                <textarea
                  value={template}
                  onChange={(event) => setTemplate(event.target.value)}
                  rows={12}
                  data-lenis-prevent
                />
              </label>

              <button
                type="button"
                className={styles.ghost}
                onClick={() => setTemplate(defaultMessageTemplate)}
              >
                Kembalikan pesan bawaan
              </button>
            </div>
          ) : null}
        </section>

        <section className={styles.card}>
          <div className={styles.listHead}>
            <h2 className={styles.listTitle}>
              {ready ? `${guests.length} tamu` : "Memuat…"}
            </h2>

            {ready && guests.length > 0 ? (
              <div className={styles.tools}>
                <button
                  type="button"
                  className={styles.ghost}
                  onClick={() =>
                    copy(
                      rows
                        .map((row) => `${row.name}\n${row.link}`)
                        .join("\n\n"),
                      "Semua link disalin.",
                    )
                  }
                >
                  Salin semua
                </button>

                <button
                  type="button"
                  className={styles.ghost}
                  onClick={downloadCsv}
                >
                  Unduh CSV
                </button>

                <button
                  type="button"
                  className={styles.danger}
                  onClick={clearAll}
                >
                  Hapus semua
                </button>
              </div>
            ) : null}
          </div>

          {ready && guests.length === 0 ? (
            <p className={styles.empty}>
              Belum ada tamu. Tambahkan nama di atas, daftarnya tersimpan
              otomatis di perangkat ini.
            </p>
          ) : null}

          <ul className={styles.list}>
            {rows.map((row, index) => (
              <li key={row.id} className={styles.row}>
                <div className={styles.rowMain}>
                  <span className={styles.rowIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className={styles.rowText}>
                    <p className={styles.rowName}>{row.name}</p>

                    <p className={styles.rowLink}>{row.link}</p>
                  </div>
                </div>

                <div className={styles.rowActions}>
                  <button
                    type="button"
                    className={styles.ghost}
                    onClick={() => copy(row.link, `Link ${row.name} disalin.`)}
                  >
                    Salin
                  </button>

                  <a
                    className={styles.primary}
                    href={row.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>

                  <a
                    className={styles.ghost}
                    href={row.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Pratinjau
                  </a>

                  <button
                    type="button"
                    className={styles.danger}
                    onClick={() => removeGuest(row.id)}
                    aria-label={`Hapus ${row.name}`}
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className={styles.notice} role="status" aria-live="polite">
        {notice}
      </p>
    </main>
  );
}
