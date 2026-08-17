/** @format */

import { invitation } from "@/lib/invitation";

import styles from "./GalleryJourney.module.css";

export function GalleryFinale() {
  const closing = invitation.gallery.closing;

  return (
    <div
      className={`${styles.layer} ${styles.finaleScene}`}
      data-gallery-finale
    >
      <span
        className={styles.finaleLight}
        data-gallery-finale-light
        aria-hidden="true"
      />

      <span
        className={styles.finaleArch}
        data-gallery-finale-arch
        aria-hidden="true"
      />

      <div className={styles.finaleContent}>
        <p className={styles.finaleEyebrow} data-gallery-finale-small>
          {closing.eyebrow}
        </p>

        <div className={styles.finaleTitleMask}>
          <p className={styles.finaleTitle} data-gallery-finale-title>
            {closing.title}
          </p>
        </div>

        <div className={styles.finaleRule} data-gallery-finale-rule>
          <span />

          <i>◇</i>

          <span />
        </div>

        <p className={styles.finaleMessage} data-gallery-finale-small>
          {closing.message}
        </p>

        <p className={styles.finaleSignature} data-gallery-finale-small>
          {invitation.bride.firstName} &amp; {invitation.groom.firstName}
        </p>
      </div>
    </div>
  );
}
