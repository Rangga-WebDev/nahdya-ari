/** @format */

import styles from "./ClosingJourney.module.css";

export function ClosingAtmosphere() {
  return (
    <div className={styles.atmosphere} aria-hidden="true">
      <span className={styles.sky} data-closing-sky />

      <span className={styles.stars} data-closing-stars />

      <span className={styles.moon} data-closing-moon />

      <span className={styles.moonGlow} data-closing-moon />

      <svg
        className={styles.mountains}
        data-closing-mountains
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          d="M0 260 L180 150 L320 220 L470 110 L620 210 L780 130 L940 225 L1100 145 L1260 235 L1440 165 L1440 320 L0 320 Z"
          fill="currentColor"
        />
      </svg>

      <svg
        className={styles.palace}
        data-closing-palace
        viewBox="0 0 900 320"
        preserveAspectRatio="xMidYMax meet"
        focusable="false"
      >
        <g fill="currentColor">
          <path d="M430 20 L450 0 L470 20 L470 60 L430 60 Z" />

          <path d="M360 120 Q450 40 540 120 L540 320 L360 320 Z" />

          <path d="M240 175 Q310 110 380 175 L380 320 L240 320 Z" />

          <path d="M520 175 Q590 110 660 175 L660 320 L520 320 Z" />

          <path d="M120 225 Q180 175 240 225 L240 320 L120 320 Z" />

          <path d="M660 225 Q720 175 780 225 L780 320 L660 320 Z" />

          <rect x="60" y="268" width="780" height="52" />
        </g>

        <g fill="rgba(255, 250, 226, 0.85)">
          <rect x="440" y="200" width="20" height="46" rx="10" />

          <rect x="296" y="238" width="16" height="38" rx="8" />

          <rect x="588" y="238" width="16" height="38" rx="8" />
        </g>
      </svg>

      <svg
        className={styles.botanical}
        data-closing-botanical
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          d="M0 240 C120 170 190 210 260 140 C330 205 400 155 470 215 C540 150 610 200 690 140 C760 205 830 160 900 215 C980 150 1040 200 1120 145 C1200 205 1290 165 1370 215 C1400 200 1420 205 1440 190 L1440 240 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
