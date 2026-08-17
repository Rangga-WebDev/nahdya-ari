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

      <p className={styles.resultEyebrow}>Thank You</p>

      <p className={styles.resultTitle}>
        {submission.attendance
          ? "Your presence means the world to us."
          : "Thank you for letting us know."}
      </p>

      <p className={styles.resultMessage}>
        {submission.attendance
          ? `We have reserved a place for ${submission.guestName}${
              submission.guestCount > 1
                ? ` and ${submission.guestCount - 1} more.`
                : "."
            }`
          : `We will keep ${submission.guestName} in our thoughts on the day.`}
      </p>

      <p className={styles.resultSignature}>{monogram}</p>

      <button type="button" className={styles.quietAction} onClick={onReset}>
        Change my response
      </button>
    </div>
  );
}
