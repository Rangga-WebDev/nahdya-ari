/** @format */

"use client";

import { useRef } from "react";

import { HeroGarden } from "@/components/invitation/hero/HeroGarden";
import { SacredIntroduction } from "@/components/invitation/sacred/SacredIntroduction";

import { useOpeningSequenceMotion } from "./useOpeningSequenceMotion";

import styles from "./OpeningSequence.module.css";

export function OpeningSequence() {
  const scope = useRef<HTMLElement>(null);

  useOpeningSequenceMotion(scope);

  return (
    <section
      ref={scope}
      id="beginning"
      className={styles.sequence}
      data-opening-sequence
    >
      <div className={styles.stage}>
        <div className={styles.heroLayer} data-opening-hero>
          <HeroGarden />
        </div>

        <div
          className={styles.transitionLight}
          data-transition-light
          aria-hidden="true"
        />

        <div
          className={styles.transitionMist}
          data-transition-mist
          aria-hidden="true"
        />

        <div className={styles.sacredLayer} data-opening-sacred>
          <SacredIntroduction />
        </div>
      </div>
    </section>
  );
}
