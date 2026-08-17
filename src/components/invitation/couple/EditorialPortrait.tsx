/** @format */

import Image from "next/image";

import type { Person } from "@/types/invitation";

import styles from "./CoupleJourney.module.css";

type EditorialPortraitProps = {
  person: Person;

  variant: "bride" | "groom";
};

export function EditorialPortrait({ person, variant }: EditorialPortraitProps) {
  return (
    <div className={styles.portraitFrame} data-editorial-portrait>
      <div className={styles.portraitInner}>
        {person.portrait ? (
          <Image
            src={person.portrait}
            alt={person.fullName}
            fill
            priority={false}
            sizes="
              (max-width: 768px) 80vw,
              42vw
            "
            className={styles.portraitImage}
          />
        ) : (
          <div
            className={
              variant === "bride"
                ? styles.portraitFallbackBride
                : styles.portraitFallbackGroom
            }
          >
            <div className={styles.fallbackGlow} aria-hidden="true" />

            <span className={styles.fallbackInitial}>
              {person.firstName.charAt(0)}
            </span>

            <span className={styles.fallbackLabel}>Portrait</span>
          </div>
        )}

        <div className={styles.portraitWash} aria-hidden="true" />
      </div>

      <div className={styles.portraitLine} aria-hidden="true" />

      <span className={styles.portraitNumber} aria-hidden="true">
        {variant === "bride" ? "01" : "02"}
      </span>
    </div>
  );
}
