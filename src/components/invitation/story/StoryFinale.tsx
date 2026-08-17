/** @format */

import { invitation } from "@/lib/invitation";

import styles from "./StoryJourney.module.css";

export function StoryFinale() {
  const closing = invitation.story.closing;

  return (
    <article
      className={`${styles.storyLayer} ${styles.finaleScene}`}
      data-story-finale
    >
      <div className={styles.finaleSun} data-finale-sun aria-hidden="true" />

      <div className={styles.finaleRing} data-finale-ring aria-hidden="true" />

      <div
        className={styles.finaleMonogram}
        data-finale-monogram
        aria-hidden="true"
      >
        <span>{invitation.bride.firstName.charAt(0)}</span>

        <i>&</i>

        <span>{invitation.groom.firstName.charAt(0)}</span>
      </div>

      <div className={styles.finaleContent}>
        <p className={styles.finaleEyebrow} data-finale-small>
          {closing.eyebrow}
        </p>

        <div className={styles.finaleTitleMask}>
          <h2 className={styles.finaleTitle} data-finale-title>
            {closing.title}
          </h2>
        </div>

        <div className={styles.finaleRule} data-finale-rule>
          <span />

          <i />

          <span />
        </div>

        <p className={styles.finaleMessage} data-finale-small>
          {closing.message}
        </p>
      </div>

      <span className={styles.finaleYear} data-finale-small>
        2022 — 2026
      </span>
    </article>
  );
}
