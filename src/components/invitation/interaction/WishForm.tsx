/** @format */

"use client";

import { useState } from "react";

import { submitWish } from "@/lib/services/wishes";

import type { Wish } from "@/types/invitation";

import styles from "./InteractionJourney.module.css";

type WishFormProps = {
  onSubmitted: (wish: Wish) => void;
};

export function WishForm({ onSubmitted }: WishFormProps) {
  const [author, setAuthor] = useState("");

  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );

  const [error, setError] = useState<string | null>(null);

  const loading = status === "loading";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");

    setError(null);

    try {
      const wish = await submitWish({ author, message });

      onSubmitted(wish);

      setAuthor("");

      setMessage("");

      setStatus("sent");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Doa Anda belum tersimpan. Silakan coba lagi.",
      );

      setStatus("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="wish-name">
          Nama
        </label>

        <input
          id="wish-name"
          type="text"
          autoComplete="name"
          maxLength={60}
          required
          className={styles.input}
          value={author}
          disabled={loading}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="wish-message">
          Doa & Harapan
        </label>

        <textarea
          id="wish-message"
          rows={3}
          maxLength={500}
          required
          className={`${styles.input} ${styles.textarea}`}
          value={message}
          disabled={loading}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      {status === "error" && error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}

      {status === "sent" ? (
        <p className={styles.stateNote} role="status">
          Terima kasih — doa Anda telah kami simpan di buku tamu.
        </p>
      ) : null}

      <button type="submit" className={styles.submit} disabled={loading}>
        <span>{loading ? "Mengirim" : "Kirim Doa"}</span>

        <span className={styles.submitIcon} aria-hidden="true">
          {loading ? "◌" : "→"}
        </span>
      </button>
    </form>
  );
}
