/** @format */

"use client";

import { ChapterNavigation } from "./ChapterNavigation";

import { MusicControl } from "./MusicControl";

import styles from "./ExperienceControls.module.css";

export function InvitationExperience() {
  return (
    <div className={styles.experience}>
      <ChapterNavigation />

      <MusicControl />
    </div>
  );
}
