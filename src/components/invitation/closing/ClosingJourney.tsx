/** @format */

"use client";

import { useRef } from "react";

import { ClosingAtmosphere } from "./ClosingAtmosphere";

import { ClosingPortrait } from "./ClosingPortrait";

import { ClosingMessage } from "./ClosingMessage";

import { useClosingJourneyMotion } from "./useClosingJourneyMotion";

import {
  GoldenDust,
  LightRays,
  BokehOrbs,
} from "@/components/invitation/effects/AmbientEffects";

import styles from "./ClosingJourney.module.css";

export function ClosingJourney() {
  const scope = useRef<HTMLElement>(null);

  useClosingJourneyMotion(scope);

  return (
    <section
      ref={scope}
      id="closing"
      className={styles.journey}
      aria-label="Penutup"
      data-closing-journey
    >
      <span className={styles.dawn} data-closing-dawn aria-hidden="true" />

      <LightRays opacity={0.6} top="-26%" speed="75s" />

      <BokehOrbs count={8} />

      <ClosingAtmosphere />

      <GoldenDust count={40} intensity={0.9} />

      <div className={styles.content} data-closing-content>
        <ClosingPortrait />

        <ClosingMessage />
      </div>
    </section>
  );
}
