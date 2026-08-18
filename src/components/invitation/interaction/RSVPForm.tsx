/** @format */

"use client";

import { useState } from "react";

import { invitation } from "@/lib/invitation";

import { submitRSVP } from "@/lib/services/rsvp";

import type { RSVPSubmission } from "@/types/invitation";

import { RSVPResult } from "./RSVPResult";

import styles from "./InteractionJourney.module.css";

type Status = "idle" | "loading" | "success" | "error";

export function RSVPForm() {
  const config = invitation.interaction.rsvp;

  const [status, setStatus] = useState<Status>("idle");

  const [error, setError] = useState<string | null>(null);

  const [guestName, setGuestName] = useState("");

  const [attending, setAttending] = useState(true);

  const [guestCount, setGuestCount] = useState(1);

  const [message, setMessage] = useState("");

  const [confirmed, setConfirmed] = useState<RSVPSubmission | null>(null);

  const disabled = status === "loading";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");

    setError(null);

    const payload: RSVPSubmission = {
      guestName,

      attendance: attending,

      guestCount: attending ? guestCount : 0,

      message,
    };

    try {
      const record = await submitRSVP({
        ...payload,

        guestCount: attending ? guestCount : 1,
      });

      setConfirmed({ ...payload, guestName: record.guestName });

      setStatus("success");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Terjadi kesalahan. Silakan coba lagi.",
      );

      setStatus("error");
    }
  }

  if (status === "success" && confirmed) {
    return (
      <RSVPResult
        submission={confirmed}
        onReset={() => {
          setStatus("idle");
          setConfirmed(null);
        }}
      />
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="rsvp-name">
          Nama
        </label>

        <input
          id="rsvp-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={80}
          className={styles.input}
          value={guestName}
          disabled={disabled}
          onChange={(event) => setGuestName(event.target.value)}
        />
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.label}>Kehadiran</legend>

        <div className={styles.choices}>
          <label className={styles.choice}>
            <input
              type="radio"
              name="attendance"
              value="yes"
              checked={attending}
              disabled={disabled}
              onChange={() => setAttending(true)}
            />

            <span className={styles.choiceMark} aria-hidden="true" />

            <span>Dengan senang hati hadir</span>
          </label>

          <label className={styles.choice}>
            <input
              type="radio"
              name="attendance"
              value="no"
              checked={!attending}
              disabled={disabled}
              onChange={() => setAttending(false)}
            />

            <span className={styles.choiceMark} aria-hidden="true" />

            <span>Mohon maaf, berhalangan</span>
          </label>
        </div>
      </fieldset>

      {attending ? (
        <div className={styles.field}>
          <span className={styles.label} id="rsvp-guests-label">
            Jumlah Tamu
          </span>

          <div
            className={styles.counter}
            role="group"
            aria-labelledby="rsvp-guests-label"
          >
            <button
              type="button"
              className={styles.counterButton}
              onClick={() => setGuestCount((value) => Math.max(1, value - 1))}
              disabled={disabled || guestCount <= 1}
              aria-label="Kurangi jumlah tamu"
            >
              −
            </button>

            <output className={styles.counterValue}>{guestCount}</output>

            <button
              type="button"
              className={styles.counterButton}
              onClick={() =>
                setGuestCount((value) => Math.min(config.maxGuests, value + 1))
              }
              disabled={disabled || guestCount >= config.maxGuests}
              aria-label="Tambah jumlah tamu"
            >
              +
            </button>
          </div>

          <p className={styles.hint}>Maksimal {config.maxGuests} tamu.</p>
        </div>
      ) : null}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="rsvp-message">
          Pesan untuk Kami
        </label>

        <textarea
          id="rsvp-message"
          name="message"
          rows={3}
          maxLength={400}
          className={`${styles.input} ${styles.textarea}`}
          value={message}
          disabled={disabled}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      {status === "error" && error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className={styles.submit} disabled={disabled}>
        <span>{disabled ? "Mengirim" : "Kirim Konfirmasi"}</span>

        <span className={styles.submitIcon} aria-hidden="true">
          {disabled ? "◌" : "→"}
        </span>
      </button>
    </form>
  );
}
