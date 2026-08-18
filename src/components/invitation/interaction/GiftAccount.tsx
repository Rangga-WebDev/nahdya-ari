/** @format */

"use client";

import { useEffect, useRef, useState } from "react";

import type { GiftAccount as GiftAccountType } from "@/types/invitation";

import styles from "./InteractionSection.module.css";

type GiftAccountProps = {
  account: GiftAccountType;
};

export function GiftAccount({ account }: GiftAccountProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function flash(next: "copied" | "failed") {
    setState(next);

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => setState("idle"), 2400);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(account.accountNumber);

      flash("copied");
    } catch {
      flash("failed");
    }
  }

  return (
    <article className={styles.giftCard} data-interaction-gift>
      <p className={styles.giftBank}>{account.bank}</p>

      <p className={styles.giftNumber}>{account.accountNumber}</p>

      <p className={styles.giftName}>{account.accountName}</p>

      <button type="button" className={styles.giftAction} onClick={handleCopy}>
        <span>
          {state === "copied"
            ? "Tersalin"
            : state === "failed"
              ? "Salin Manual"
              : "Salin Nomor"}
        </span>

        <span className={styles.submitIcon} aria-hidden="true">
          {state === "copied" ? "✓" : "⧉"}
        </span>
      </button>

      <span className={styles.giftStatus} role="status">
        {state === "copied"
          ? "Nomor rekening telah disalin."
          : state === "failed"
            ? "Papan klip tidak tersedia — mohon salin nomornya secara manual."
            : ""}
      </span>
    </article>
  );
}
