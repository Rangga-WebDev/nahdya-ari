/** @format */

"use client";

import { useRef } from "react";

import { RSVPScene } from "./RSVPScene";

import { WishesScene } from "./WishesScene";

import { GiftScene } from "./GiftScene";

import { useInteractionJourneyMotion } from "./useInteractionJourneyMotion";

import styles from "./InteractionJourney.module.css";

export function InteractionJourney() {
  const scope = useRef<HTMLElement>(null);

  useInteractionJourneyMotion(scope);

  return (
    <section ref={scope} className={styles.journey} data-interaction-journey>
      <span className={styles.veil} data-interaction-veil aria-hidden="true" />

      <span className={styles.paperTexture} aria-hidden="true" />

      <RSVPScene />

      <WishesScene />

      <GiftScene />
    </section>
  );
}
