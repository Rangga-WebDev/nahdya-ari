/** @format */

import { invitation } from "@/lib/invitation";

import type { RSVPSubmission } from "@/types/invitation";

import styles from "./InteractionJourney.module.css";

type RSVPResultProps = {
  submission: RSVPSubmission;
  onReset: () => void;
};

export function RSVPResult({ submission, onReset }: RSVPResultProps) {
  const monogram = `${invitation.bride.firstName.charAt(0)} & ${invitation.groom.firstName.charAt(0)}`;

  return (
    <div className={styles.result} role="status">
      <span className={styles.resultLine} aria-hidden="true" />

      <p className={styles.resultEyebrow}>Terima Kasih</p>

      <p className={styles.resultTitle}>
        {submission.attendance
          ? "Kehadiran Anda sangat berarti bagi kami."
          : "Terima kasih telah mengabari kami."}
      </p>

      <p className={styles.resultMessage}>
        {submission.attendance
          ? `Kami telah menyiapkan tempat untuk ${submission.guestName}${
              submission.guestCount > 1
                ? ` dan ${submission.guestCount - 1} orang lainnya.`
                : "."
            }`
          : `Kami akan tetap mendoakan ${submission.guestName} dari kejauhan.`}
      </p>

      <p className={styles.resultSignature}>{monogram}</p>

      <button type="button" className={styles.quietAction} onClick={onReset}>
        Ubah jawaban saya
      </button>
    </div>
  );
}
