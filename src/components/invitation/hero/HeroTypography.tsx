/** @format */

import { invitation } from "@/lib/invitation";

import styles from "./HeroGarden.module.css";

export function HeroTypography() {
  return (
    <div className={styles.heroContent} data-hero-content>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow} data-hero-eyebrow>
          {invitation.opening.eyebrow}
        </p>

        <div className={styles.title} data-hero-title>
          <div className={styles.titleMask}>
            <span data-hero-title-word className={styles.name}>
              {invitation.bride.firstName}
            </span>
          </div>

          <div className={styles.ampersandRow}>
            <span data-hero-ornament className={styles.ornamentLine} />

            <span data-hero-ampersand className={styles.ampersand}>
              &
            </span>

            <span data-hero-ornament className={styles.ornamentLine} />
          </div>

          <div className={styles.titleMask}>
            <span data-hero-title-word className={styles.name}>
              {invitation.groom.firstName}
            </span>
          </div>
        </div>

        <div className={styles.dateWrapper} data-hero-date>
          <span>POSO</span>

          <span className={styles.dateDot} />

          <span>{invitation.weddingDate}</span>
        </div>
      </div>
    </div>
  );
}
