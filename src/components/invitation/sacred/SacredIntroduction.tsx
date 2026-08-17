/** @format */

import { invitation } from "@/lib/invitation";

import styles from "./SacredIntroduction.module.css";

export function SacredIntroduction() {
  const brideInitial = invitation.bride.firstName.charAt(0);

  const groomInitial = invitation.groom.firstName.charAt(0);

  return (
    <section className={styles.sacred} data-sacred-root>
      <div className={styles.glow} data-sacred-glow aria-hidden="true" />

      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.arch} data-sacred-arch aria-hidden="true">
        <div className={styles.archInner} />
      </div>

      <div
        className={styles.leftDecoration}
        data-sacred-decoration-left
        aria-hidden="true"
      >
        <Decoration />
      </div>

      <div
        className={styles.rightDecoration}
        data-sacred-decoration-right
        aria-hidden="true"
      >
        <Decoration />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow} data-sacred-eyebrow>
          {invitation.introduction.eyebrow}
        </p>

        <div
          className={styles.monogram}
          data-sacred-monogram
          aria-hidden="true"
        >
          <span>{brideInitial}</span>

          <span className={styles.monogramAmpersand}>&</span>

          <span>{groomInitial}</span>
        </div>

        <div className={styles.titleMask}>
          <h2 className={styles.title} data-sacred-title>
            {invitation.introduction.title}
          </h2>
        </div>

        <div className={styles.divider} data-sacred-divider>
          <span />

          <i />

          <span />
        </div>

        <p className={styles.message} data-sacred-message>
          {invitation.introduction.message}
        </p>

        <p className={styles.closing} data-sacred-closing>
          {invitation.introduction.closing}
        </p>

        <div className={styles.signature} data-sacred-signature>
          <span>{invitation.bride.firstName}</span>

          <span>&</span>

          <span>{invitation.groom.firstName}</span>
        </div>
      </div>

      <p className={styles.chapter} data-sacred-chapter>
        Chapter I · The Beginning
      </p>
    </section>
  );
}

function Decoration() {
  return (
    <svg viewBox="0 0 150 380" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M70 380C73 291 61 231 49 177C37 124 34 72 58 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M56 301C29 287 17 267 19 239C46 241 64 259 64 286" />

        <path d="M57 247C82 231 91 211 85 187C61 193 48 211 49 234" />

        <path d="M47 198C23 184 13 165 15 140C39 143 55 159 56 184" />

        <path d="M46 150C68 136 78 118 74 96C52 101 40 117 40 138" />

        <path d="M48 104C27 90 21 74 25 53C45 58 57 72 58 91" />

        <path d="M55 67C73 54 81 39 77 21C59 26 50 39 50 56" />
      </g>
    </svg>
  );
}
