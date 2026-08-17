/** @format */

import { invitation } from "@/lib/invitation";

import styles from "./ClosingJourney.module.css";

export function ClosingMessage() {
  const closing = invitation.closing;

  return (
    <div className={styles.message}>
      <p className={styles.eyebrow} data-closing-small>
        {closing.eyebrow}
      </p>

      <div className={styles.titleMask}>
        <h2 className={styles.title} data-closing-title>
          {closing.title}
        </h2>
      </div>

      <div className={styles.rule} data-closing-rule>
        <span />

        <i>◇</i>

        <span />
      </div>

      <p className={styles.body} data-closing-small>
        {closing.message}
      </p>

      <p className={styles.signature} data-closing-small>
        {closing.signature}
      </p>

      <p className={styles.date} data-closing-small>
        {invitation.weddingDate}
      </p>
    </div>
  );
}
