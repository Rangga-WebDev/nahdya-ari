/** @format */

import { invitation } from "@/lib/invitation";

import styles from "./StoryJourney.module.css";

export function StoryIntro() {
  return (
    <article
      className={`${styles.storyLayer} ${styles.introScene}`}
      data-story-intro
    >
      <div
        className={styles.introGlow}
        data-story-intro-glow
        aria-hidden="true"
      />

      <span className={styles.introChapter} data-story-intro-small>
        Chapter V
      </span>

      <div className={styles.introContent}>
        <p className={styles.introEyebrow} data-story-intro-small>
          {invitation.story.eyebrow}
        </p>

        <div className={styles.introTitleMask}>
          <h2 className={styles.introTitle} data-story-intro-title>
            Our
            <br />
            Story
          </h2>
        </div>

        <p className={styles.introSubtitle} data-story-intro-small>
          {invitation.story.title}
        </p>
      </div>

      <div
        className={styles.introYearField}
        data-story-intro-year
        aria-hidden="true"
      >
        2022
        <span>—</span>
        2026
      </div>
    </article>
  );
}
