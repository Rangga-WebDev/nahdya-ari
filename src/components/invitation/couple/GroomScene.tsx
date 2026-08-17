/** @format */

import { invitation } from "@/lib/invitation";

import { EditorialPortrait } from "./EditorialPortrait";

import styles from "./CoupleJourney.module.css";

export function GroomScene() {
  const groom = invitation.groom;

  return (
    <article
      className={`${styles.scene} ${styles.groomScene}`}
      data-groom-scene
    >
      <div className={styles.groomLight} aria-hidden="true" />

      <div
        className={`${styles.giantLetter} ${styles.groomLetter}`}
        data-groom-letter
        aria-hidden="true"
      >
        R
      </div>

      <div className={`${styles.sceneGrid} ${styles.groomGrid}`}>
        <div className={styles.groomContent} data-groom-content>
          <p className={styles.role} data-groom-role>
            {groom.role}
          </p>

          <div className={styles.nameMask}>
            <h2 className={styles.personName} data-groom-name>
              {groom.firstName}
            </h2>
          </div>

          <p className={styles.fullName} data-groom-detail>
            {groom.fullName}
          </p>

          <div className={styles.parentInfo} data-groom-detail>
            <span>Putra dari</span>

            <p>
              {groom.father}
              <br />
              <em>&</em>
              <br />
              {groom.mother}
            </p>
          </div>

          <blockquote className={styles.quote} data-groom-quote>
            “{groom.quote}”
          </blockquote>

          {groom.instagram && (
            <span className={styles.instagram} data-groom-detail>
              {groom.instagram}
            </span>
          )}
        </div>

        <div className={styles.groomPortraitColumn} data-groom-portrait>
          <EditorialPortrait person={groom} variant="groom" />
        </div>
      </div>

      <GroomDecoration />

      <span className={styles.sceneIndex} data-groom-detail>
        Portrait · 02
      </span>
    </article>
  );
}

function GroomDecoration() {
  return (
    <svg
      className={styles.groomBotanical}
      viewBox="0 0 320 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M295 512C249 407 240 289 141 130C101 65 61 30 19 9"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M247 388C288 350 291 309 274 268C235 290 217 329 229 367"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <path
        d="M213 301C171 277 153 240 163 200C202 211 228 245 227 283"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <path
        d="M167 213C205 184 211 149 200 113C162 126 142 157 147 193"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
