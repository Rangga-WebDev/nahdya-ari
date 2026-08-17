/** @format */

import Image from "next/image";

import { invitation } from "@/lib/invitation";

import styles from "./ClosingJourney.module.css";

export function ClosingPortrait() {
  const portrait = invitation.closing.portrait;

  const monogram = `${invitation.bride.firstName.charAt(0)}${invitation.groom.firstName.charAt(0)}`;

  return (
    <div className={styles.portrait} data-closing-portrait>
      <div className={styles.portraitFrame}>
        {portrait ? (
          <Image
            src={portrait}
            alt={`${invitation.bride.firstName} and ${invitation.groom.firstName}`}
            fill
            sizes="(max-width: 768px) 62vw, 22rem"
            className={styles.portraitImage}
          />
        ) : (
          <span className={styles.portraitFallback} aria-hidden="true">
            <span className={styles.portraitMonogram}>{monogram}</span>
          </span>
        )}

        <span className={styles.portraitVeil} aria-hidden="true" />
      </div>

      <span className={styles.portraitArch} aria-hidden="true" />
    </div>
  );
}
