/** @format */

"use client";

import { useRef } from "react";

import { BrideScene } from "./BrideScene";
import { GroomScene } from "./GroomScene";
import { UnionScene } from "./UnionScene";

import { useCoupleJourneyMotion } from "./useCoupleJourneyMotion";

import styles from "./CoupleJourney.module.css";

export function CoupleJourney() {
  const scope = useRef<HTMLElement>(null);

  useCoupleJourneyMotion(scope);

  return (
    <section
      ref={scope}
      id="couple"
      className={styles.journey}
      data-couple-journey
    >
      <div className={styles.stage}>
        <BrideScene />

        <GroomScene />

        <UnionScene />

        <div className={styles.progress} aria-hidden="true">
          <span>III</span>

          <div className={styles.progressTrack}>
            <div className={styles.progressBar} data-couple-progress />
          </div>

          <span>IV</span>
        </div>
      </div>
    </section>
  );
}
