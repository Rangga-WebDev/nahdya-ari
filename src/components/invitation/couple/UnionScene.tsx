/** @format */
import Image from "next/image";

import { invitation } from "@/lib/invitation";

import {
  GoldenDust,
  LightRays,
} from "@/components/invitation/effects/AmbientEffects";

import styles from "./CoupleJourney.module.css";

export function UnionScene() {
  const { bride, groom } = invitation;

  return (
    <article
      className={`${styles.scene} ${styles.unionScene}`}
      data-union-scene
    >
      <LightRays opacity={0.5} speed="88s" />

      <GoldenDust count={30} intensity={0.85} />

      <div className={styles.unionGlow} data-union-glow aria-hidden="true" />

      <div className={styles.unionPortraits}>
        <div
          className={`${styles.unionPortrait} ${styles.unionPortraitLeft}`}
          data-union-left
        >
          <PortraitMini
            person={bride}
            initial={bride.firstName.charAt(0)}
            variant="bride"
          />
        </div>

        <div
          className={`${styles.unionPortrait} ${styles.unionPortraitRight}`}
          data-union-right
        >
          <PortraitMini
            person={groom}
            initial={groom.firstName.charAt(0)}
            variant="groom"
          />
        </div>
      </div>

      <div className={styles.unionContent} data-union-content>
        <p className={styles.unionEyebrow} data-union-eyebrow>
          Dan dua kisah pun menjadi satu
        </p>

        <div className={styles.unionNames}>
          <div className={styles.unionNameMask}>
            <span data-union-name>{bride.firstName}</span>
          </div>

          <span className={styles.unionAmpersand} data-union-ampersand>
            &
          </span>

          <div className={styles.unionNameMask}>
            <span data-union-name>{groom.firstName}</span>
          </div>
        </div>

        <div className={styles.unionRule} data-union-rule aria-hidden="true">
          <span />
          <i />
          <span />
        </div>

        <p className={styles.unionCopy} data-union-copy>
          Dua perjalanan.
          <br />
          Satu rumah.
          <br />
          Satu selamanya.
        </p>
      </div>

      <div
        className={styles.unionMonogram}
        data-union-monogram
        aria-hidden="true"
      >
        {bride.firstName.charAt(0)}
        <i>&</i>
        {groom.firstName.charAt(0)}
      </div>

      <span className={styles.nextChapter} data-union-next>
        Continue our story
      </span>
    </article>
  );
}

type PortraitMiniProps = {
  person: { portrait?: string };
  initial: string;
  variant: "bride" | "groom";
};

function PortraitMini({ person, initial, variant }: PortraitMiniProps) {
  return (
    <div className={variant === "bride" ? styles.miniBride : styles.miniGroom}>
      {person.portrait ? (
        <Image
          src={person.portrait}
          alt=""
          fill
          sizes="35vw"
          className={styles.miniImage}
        />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
}
