/** @format */

"use client";

import { invitation } from "@/lib/invitation";

import { useGuestName } from "./useExperienceControls";

import styles from "./ExperienceControls.module.css";

export function GuestIdentity() {
  const guest = useGuestName();

  const name = guest ?? invitation.experience.guestFallback;

  return (
    <div className={styles.identity} data-interaction-panel>
      <p className={styles.identityLabel}>Kepada Yth.</p>

      <p className={styles.identityName}>{name}</p>

      <p className={styles.identityMessage}>
        {invitation.introduction.closing}
      </p>
    </div>
  );
}
