/** @format */

import styles from "./HeroGarden.module.css";

export function HeroAtmosphere() {
  return (
    <>
      <div className={styles.sky} data-hero-sky aria-hidden="true" />

      <div className={styles.sunGlow} data-hero-sun aria-hidden="true" />

      <div className={styles.haze} data-hero-haze aria-hidden="true" />

      <div className={styles.lightWash} aria-hidden="true" />

      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.petals} aria-hidden="true">
        <span data-petal className={`${styles.petal} ${styles.petalOne}`} />

        <span data-petal className={`${styles.petal} ${styles.petalTwo}`} />

        <span data-petal className={`${styles.petal} ${styles.petalThree}`} />

        <span data-petal className={`${styles.petal} ${styles.petalFour}`} />

        <span data-petal className={`${styles.petal} ${styles.petalFive}`} />
      </div>
    </>
  );
}
