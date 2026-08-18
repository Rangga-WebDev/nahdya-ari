/** @format */

import { HeroAtmosphere } from "./HeroAtmosphere";
import { HeroBotanical } from "./HeroBotanical";
import { HeroPalace } from "./HeroPalace";
import { HeroTypography } from "./HeroTypography";

import {
  GoldenDust,
  LightRays,
  BokehOrbs,
} from "@/components/invitation/effects/AmbientEffects";

import styles from "./HeroGarden.module.css";

export function HeroGarden() {
  return (
    <div className={styles.hero} data-hero-root>
      <div className={styles.viewport}>
        <HeroAtmosphere />

        <LightRays opacity={0.55} top="-38%" speed="80s" />

        <BokehOrbs count={6} />

        <div
          className={styles.distantLandscape}
          data-hero-background
          aria-hidden="true"
        >
          <div className={styles.mountainBack} />

          <div className={styles.mountainFront} />
        </div>

        <HeroPalace />

        <div className={styles.midGarden} data-hero-mid aria-hidden="true">
          <div className={styles.gardenHillOne} />

          <div className={styles.gardenHillTwo} />
        </div>

        <HeroTypography />

        <HeroBotanical />

        <GoldenDust count={34} intensity={0.85} />

        <div className={styles.scrollCue} data-scroll-cue aria-hidden="true">
          <span>Gulir untuk membuka</span>

          <div className={styles.scrollLine}>
            <div className={styles.scrollLineInner} />
          </div>
        </div>
      </div>
    </div>
  );
}
