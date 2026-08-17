/** @format */

"use client";

import { useRef } from "react";

import { invitation } from "@/lib/invitation";

import { EventScene } from "./EventScene";
import { WeddingCountdown } from "./WeddingCountdown";
import { useEventPavilionMotion } from "./useEventPavilionMotion";

import styles from "./EventPavilion.module.css";

export function EventPavilion() {
  const scope = useRef<HTMLElement>(null);

  useEventPavilionMotion(scope);

  const ceremony = invitation.events.find((event) => event.id === "ceremony");

  const reception = invitation.events.find((event) => event.id === "reception");

  if (!ceremony || !reception) {
    return null;
  }

  return (
    <section
      ref={scope}
      id="day"
      className={styles.eventChapter}
      data-event-chapter
    >
      <div className={styles.stage}>
        <div className={styles.ceremonyLayer} data-ceremony-layer>
          <EventScene event={ceremony} variant="ceremony" />
        </div>

        <div className={styles.receptionLayer} data-reception-layer>
          <EventScene event={reception} variant="reception" />
        </div>

        <div
          className={styles.transitionCurtain}
          data-event-curtain
          aria-hidden="true"
        />

        <div className={styles.countdownWrapper} data-countdown-wrapper>
          <span className={styles.countdownEyebrow}>
            Counting down to forever
          </span>

          <WeddingCountdown target={ceremony.dateTime} />
        </div>

        <div className={styles.eventProgress} aria-hidden="true">
          <span>IV</span>

          <div className={styles.eventProgressTrack}>
            <span data-event-progress />
          </div>

          <span>V</span>
        </div>
      </div>
    </section>
  );
}
