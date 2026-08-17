/** @format */

import type { WeddingEvent } from "@/types/invitation";

import { EventActions } from "./EventActions";

import styles from "./EventPavilion.module.css";

type EventSceneProps = {
  event: WeddingEvent;

  variant: "ceremony" | "reception";
};

export function EventScene({ event, variant }: EventSceneProps) {
  const isCeremony = variant === "ceremony";

  return (
    <article
      className={`${styles.eventScene} ${
        isCeremony ? styles.ceremonyScene : styles.receptionScene
      }`}
      data-event-scene={variant}
    >
      <div
        className={styles.sceneAtmosphere}
        data-event-atmosphere
        aria-hidden="true"
      />

      <div
        className={styles.giantDate}
        data-event-giant-date
        aria-hidden="true"
      >
        13
      </div>

      <div className={styles.eventDateHeader} data-event-date-header>
        <span>13</span>

        <i />

        <span>September · 2026</span>
      </div>

      <div className={styles.pavilion} data-event-pavilion>
        <div className={styles.pavilionOuter} aria-hidden="true" />

        <div className={styles.pavilionInner} aria-hidden="true" />

        <PavilionOrnament />

        <div className={styles.eventContent}>
          <p className={styles.eventEyebrow} data-event-eyebrow>
            {event.eyebrow}
          </p>

          <div className={styles.eventTitleMask}>
            <h2 className={styles.eventTitle} data-event-title>
              {event.title}
            </h2>
          </div>

          <div className={styles.eventTime} data-event-time>
            <span>{event.startTime}</span>

            {event.endTime && (
              <>
                <i />

                <span>{event.endTime}</span>
              </>
            )}
          </div>

          <div className={styles.eventVenue} data-event-venue>
            <span>{event.venue}</span>

            <p>{event.address}</p>
          </div>

          <EventActions event={event} />
        </div>
      </div>

      <BotanicalLeft />

      <BotanicalRight />

      <div className={styles.eventSceneIndex} aria-hidden="true">
        <span>{isCeremony ? "01" : "02"}</span>

        <i />

        <span>{isCeremony ? "Ceremony" : "Reception"}</span>
      </div>
    </article>
  );
}

function PavilionOrnament() {
  return (
    <svg
      className={styles.pavilionOrnament}
      viewBox="0 0 180 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 30H67" stroke="currentColor" />

      <path d="M113 30H168" stroke="currentColor" />

      <path d="M90 18L102 30L90 42L78 30L90 18Z" stroke="currentColor" />

      <circle cx="90" cy="30" r="3" fill="currentColor" />
    </svg>
  );
}

function BotanicalLeft() {
  return (
    <svg
      data-event-botanical-left
      className={styles.botanicalLeft}
      viewBox="0 0 240 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M31 515C91 380 79 254 179 92C201 57 220 30 231 7"
        stroke="currentColor"
        strokeWidth="2"
      />

      <g stroke="currentColor" strokeWidth="1.4">
        <path d="M67 408C27 381 14 346 23 309C62 322 86 352 81 390" />
        <path d="M88 329C126 305 143 271 136 236C100 244 77 275 78 310" />
        <path d="M125 242C91 215 84 183 95 152C128 165 147 194 142 226" />
        <path d="M164 160C196 142 211 115 207 86C176 92 157 116 156 145" />
        <path d="M194 91C170 70 166 45 175 22C199 32 212 53 209 76" />
      </g>
    </svg>
  );
}

function BotanicalRight() {
  return (
    <svg
      data-event-botanical-right
      className={styles.botanicalRight}
      viewBox="0 0 240 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M31 515C91 380 79 254 179 92C201 57 220 30 231 7"
        stroke="currentColor"
        strokeWidth="2"
      />

      <g stroke="currentColor" strokeWidth="1.4">
        <path d="M67 408C27 381 14 346 23 309C62 322 86 352 81 390" />
        <path d="M88 329C126 305 143 271 136 236C100 244 77 275 78 310" />
        <path d="M125 242C91 215 84 183 95 152C128 165 147 194 142 226" />
        <path d="M164 160C196 142 211 115 207 86C176 92 157 116 156 145" />
        <path d="M194 91C170 70 166 45 175 22C199 32 212 53 209 76" />
      </g>
    </svg>
  );
}
