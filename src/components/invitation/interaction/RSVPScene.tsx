/** @format */

import { invitation } from "@/lib/invitation";

import { GuestIdentity } from "../experience/GuestIdentity";

import { RSVPForm } from "./RSVPForm";

import styles from "./InteractionJourney.module.css";

export function RSVPScene() {
  const config = invitation.interaction.rsvp;

  return (
    <section
      id="rsvp"
      className={`${styles.scene} ${styles.rsvpScene}`}
      data-interaction-scene="rsvp"
      aria-labelledby="rsvp-title"
    >
      <div className={styles.sceneInner}>
        <GuestIdentity />

        <header className={styles.sceneHeader}>
          <p className={styles.eyebrow} data-interaction-small>
            {config.eyebrow}
          </p>

          <div className={styles.titleMask}>
            <h2 className={styles.title} id="rsvp-title" data-interaction-title>
              {config.title}
            </h2>
          </div>

          <div className={styles.rule} data-interaction-rule>
            <span />

            <i>◇</i>

            <span />
          </div>

          <p className={styles.sceneMessage} data-interaction-small>
            {config.message}
          </p>
        </header>

        <div className={styles.stationery} data-interaction-panel>
          <RSVPForm />
        </div>
      </div>
    </section>
  );
}
