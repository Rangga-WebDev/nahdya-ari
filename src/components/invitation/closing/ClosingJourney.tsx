/** @format */

"use client";

import { useRef } from "react";

import { ClosingAtmosphere } from "./ClosingAtmosphere";

import { ClosingPortrait } from "./ClosingPortrait";

import { ClosingMessage } from "./ClosingMessage";

import { useClosingJourneyMotion } from "./useClosingJourneyMotion";

import styles from "./ClosingJourney.module.css";

export function ClosingJourney() {
  const scope = useRef<HTMLElement>(null);

  useClosingJourneyMotion(scope);

  return (
    <section
      ref={scope}
      id="closing"
      className={styles.journey}
      aria-label="With love"
      data-closing-journey
    >
      <span className={styles.dawn} data-closing-dawn aria-hidden="true" />

      <ClosingAtmosphere />

      <div className={styles.content} data-closing-content>
        <ClosingPortrait />

        <ClosingMessage />
      </div>
    </section>
  );
}
