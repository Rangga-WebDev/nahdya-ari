/** @format */

import { invitation } from "@/lib/invitation";

import { EditorialPortrait } from "./EditorialPortrait";

import styles from "./CoupleJourney.module.css";

export function BrideScene() {
  const bride = invitation.bride;

  return (
    <article
      className={`${styles.scene} ${styles.brideScene}`}
      data-bride-scene
    >
      <div className={styles.sceneGlow} aria-hidden="true" />

      <div className={styles.giantLetter} data-bride-letter aria-hidden="true">
        A
      </div>

      <div className={styles.sceneGrid}>
        <div className={styles.bridePortraitColumn} data-bride-portrait>
          <EditorialPortrait person={bride} variant="bride" />
        </div>

        <div className={styles.brideContent} data-bride-content>
          <p className={styles.role} data-bride-role>
            {bride.role}
          </p>

          <div className={styles.nameMask}>
            <h2 className={styles.personName} data-bride-name>
              {bride.firstName}
            </h2>
          </div>

          <p className={styles.fullName} data-bride-detail>
            {bride.fullName}
          </p>

          <div className={styles.parentInfo} data-bride-detail>
            <span>Putri dari</span>

            <p>
              {bride.father}
              <br />
              <em>&</em>
              <br />
              {bride.mother}
            </p>
          </div>

          <blockquote className={styles.quote} data-bride-quote>
            “{bride.quote}”
          </blockquote>

          {bride.instagram && (
            <span className={styles.instagram} data-bride-detail>
              {bride.instagram}
            </span>
          )}
        </div>
      </div>

      <BotanicalCorner className={styles.brideBotanical} />

      <span className={styles.sceneIndex} data-bride-detail>
        Mempelai · 01
      </span>
    </article>
  );
}

function BotanicalCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M35 490C80 382 83 260 185 102C217 52 250 25 279 10"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M81 370C38 338 31 297 45 257C87 275 108 311 99 350"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M111 287C154 266 175 230 169 190C129 198 100 229 98 269"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M158 196C122 165 118 130 132 96C168 112 185 144 177 179"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M205 113C239 95 255 68 251 39C219 45 198 69 195 98"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
