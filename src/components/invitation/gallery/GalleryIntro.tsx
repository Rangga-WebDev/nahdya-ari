/** @format */

import { invitation } from "@/lib/invitation";

import styles from "./GalleryJourney.module.css";

export function GalleryIntro() {
  const gallery = invitation.gallery;

  const total = gallery.items.length.toString().padStart(2, "0");

  return (
    <div className={`${styles.layer} ${styles.introScene}`} data-gallery-intro>
      <span
        className={styles.introGlow}
        data-gallery-intro-glow
        aria-hidden="true"
      />

      <p className={styles.introChapter} data-gallery-intro-small>
        Chapter VI
      </p>

      <div className={styles.introContent}>
        <p className={styles.introEyebrow} data-gallery-intro-small>
          {gallery.eyebrow}
        </p>

        <div className={styles.introTitleMask}>
          <h2 className={styles.introTitle} data-gallery-intro-title>
            {gallery.title}
          </h2>
        </div>

        <p className={styles.introSubtitle} data-gallery-intro-small>
          {gallery.subtitle}
        </p>
      </div>

      <p className={styles.introCount} data-gallery-intro-small>
        01 — {total}
      </p>
    </div>
  );
}
