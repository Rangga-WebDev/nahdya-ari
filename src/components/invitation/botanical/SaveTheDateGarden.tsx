/** @format */

"use client";

import { GardenCluster, Sprig } from "./BotanicalArt";

import styles from "./SaveTheDateGarden.module.css";

/**
 * The botanical composition for Save The Date — the one place on the page
 * where the planting is allowed to be large.
 *
 * Four asymmetric masses, each on its own depth layer with its own sway
 * duration and amplitude, so nothing beats in unison. The centre is left
 * deliberately empty for the content.
 */
export function SaveTheDateGarden() {
  return (
    <div className={styles.garden} aria-hidden="true">
      {/* Rear foliage — barely there, sets the depth floor. */}
      <span
        className={`${styles.piece} ${styles.rear} ${styles.swayRear}`}
        data-garden-layer="rear"
      >
        <GardenCluster className={styles.art} variant={1} />
      </span>

      {/* Branch leaning in from the top left. */}
      <span
        className={`${styles.piece} ${styles.branch} ${styles.swayBranch}`}
        data-garden-layer="mid"
      >
        <Sprig className={styles.art} seed={5} />
      </span>

      {/* The main cluster, right side, running off the edge. */}
      <span
        className={`${styles.piece} ${styles.main} ${styles.swayMain}`}
        data-garden-layer="mid"
      >
        <GardenCluster className={styles.art} variant={0} />
      </span>

      {/* Foreground spray, bottom left, closest to the camera. */}
      <span
        className={`${styles.piece} ${styles.fore} ${styles.swayFore}`}
        data-garden-layer="fore"
      >
        <GardenCluster className={styles.art} variant={2} />
      </span>
    </div>
  );
}
