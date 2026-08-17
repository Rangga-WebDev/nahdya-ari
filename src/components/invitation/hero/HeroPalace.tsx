/** @format */

import styles from "./HeroGarden.module.css";

export function HeroPalace() {
  return (
    <div className={styles.palace} data-hero-palace aria-hidden="true">
      <svg
        viewBox="0 0 1200 420"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.palaceSvg}
      >
        <g fill="currentColor">
          <path d="M382 338h436v29H382z" />

          <path d="M422 220h356v120H422z" />

          <path d="M470 164h260v61H470z" />

          <path d="M535 104h130v64H535z" />

          <path d="M559 104c8-52 74-52 82 0z" />

          <rect x="592" y="55" width="16" height="52" />

          <path d="M600 20l24 38h-48z" />

          <path d="M326 246h100v94H326z" />

          <path d="M774 246h100v94H774z" />

          <path d="M340 191h72v58h-72z" />

          <path d="M788 191h72v58h-72z" />

          <path d="M347 191c4-37 54-37 58 0z" />

          <path d="M795 191c4-37 54-37 58 0z" />

          {[458, 508, 558, 608, 658, 708].map((x) => (
            <rect key={x} x={x} y="252" width="21" height="88" rx="10" />
          ))}

          <path d="M495 340v-56c0-45 42-67 75-67s75 22 75 67v56z" />

          <path d="M171 340h858v18H171z" />

          <path d="M247 321h110v19H247z" />

          <path d="M843 321h110v19H843z" />
        </g>

        <g fill="none" stroke="currentColor" strokeWidth="3" opacity=".35">
          <path d="M173 370h854" />

          <path d="M274 319c0-69 28-122 75-160" />

          <path d="M926 319c0-69-28-122-75-160" />

          <path d="M208 338c18-45 48-77 91-97" />

          <path d="M992 338c-18-45-48-77-91-97" />
        </g>
      </svg>
    </div>
  );
}
