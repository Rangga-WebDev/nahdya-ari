/** @format */

"use client";

import { invitation } from "@/lib/invitation";

import { useWeddingMusic } from "./useExperienceControls";

import styles from "./ExperienceControls.module.css";

export function MusicControl() {
  const { state, toggle } = useWeddingMusic();

  if (state === "unavailable") return null;

  const playing = state === "playing";

  return (
    <button
      type="button"
      className={`${styles.music} ${playing ? styles.musicPlaying : ""}`}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={
        playing
          ? `Pause ${invitation.experience.music.title}`
          : `Play ${invitation.experience.music.title}`
      }
      title={invitation.experience.music.title}
    >
      <span className={styles.musicRing} aria-hidden="true" />

      <span className={styles.musicCore} aria-hidden="true">
        {invitation.bride.firstName.charAt(0)}
        {invitation.groom.firstName.charAt(0)}
      </span>
    </button>
  );
}
