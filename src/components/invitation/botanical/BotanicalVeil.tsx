/** @format */

"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ArchingBranch, GardenCluster, Sprig } from "./BotanicalArt";
import {
  REPLAY_SCALE,
  hasPlayedOpening,
  markOpeningPlayed,
  opening,
} from "./timing";

import styles from "./BotanicalVeil.module.css";

/**
 * The botanical curtain: it fills the viewport on first paint, parts outward
 * like a garden opening, and frames the cover while the guest is still on it.
 *
 * It belongs to the opening only. Once the invitation itself is entered the
 * whole layer fades and unmounts, so the reading experience is uncluttered and
 * nothing heavy stays attached to the scroll.
 */
const PARKED = {
  left: { xPercent: -72, rotate: -7 },
  right: { xPercent: 72, rotate: 7 },
  top: { yPercent: -58 },
  bottom: { yPercent: 58 },
  foreTopLeft: { xPercent: -38, yPercent: -34 },
  foreBottomRight: { xPercent: 40, yPercent: 32 },
};

export function BotanicalVeil() {
  const scope = useRef<HTMLDivElement>(null);

  const [dismissed, setDismissed] = useState(false);

  /* The cover announces itself when the guest opens the invitation. */
  useEffect(() => {
    const handle = () => {
      const root = scope.current;

      if (!root) {
        setDismissed(true);

        return;
      }

      gsap.to(root, {
        opacity: 0,
        duration: 0.85,
        ease: "power2.inOut",
        onComplete: () => setDismissed(true),
      });
    };

    window.addEventListener("invitation:opened", handle);

    return () => window.removeEventListener("invitation:opened", handle);
  }, []);

  useGSAP(
    () => {
      const root = scope.current;

      if (!root) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const replay = hasPlayedOpening();

      const q = gsap.utils.selector(root);

      const park = () => {
        gsap.set(q("[data-veil-left]"), PARKED.left);
        gsap.set(q("[data-veil-right]"), PARKED.right);
        gsap.set(q("[data-veil-top]"), PARKED.top);
        gsap.set(q("[data-veil-bottom]"), PARKED.bottom);
        gsap.set(q("[data-veil-fore-tl]"), PARKED.foreTopLeft);
        gsap.set(q("[data-veil-fore-br]"), PARKED.foreBottomRight);
      };

      /* Reduced motion still gets the framing, just without the performance. */
      if (reduced) {
        park();

        markOpeningPlayed();

        return;
      }

      const scale = replay ? REPLAY_SCALE : 1;

      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: opening.part * scale },
        delay: opening.hold * scale,
        onComplete: markOpeningPlayed,
      });

      tl.to(q("[data-veil-left]"), PARKED.left, 0)
        .to(q("[data-veil-right]"), PARKED.right, 0)
        .to(
          q("[data-veil-top]"),
          { ...PARKED.top, duration: opening.part * 0.86 * scale },
          0.08,
        )
        .to(
          q("[data-veil-bottom]"),
          { ...PARKED.bottom, duration: opening.part * 0.86 * scale },
          0.08,
        )
        .to(
          q("[data-veil-fore-tl]"),
          { ...PARKED.foreTopLeft, duration: opening.part * 1.05 * scale },
          0.12,
        )
        .to(
          q("[data-veil-fore-br]"),
          { ...PARKED.foreBottomRight, duration: opening.part * 1.05 * scale },
          0.12,
        );

      return () => {
        tl.kill();
      };
    },
    { scope },
  );

  if (dismissed) return null;

  return (
    <div ref={scope} className={styles.veil} aria-hidden="true">
      <div
        className={`${styles.panel} ${styles.edge} ${styles.top}`}
        data-veil-top
      >
        <div className={`${styles.sway} ${styles.swayC}`}>
          <ArchingBranch className={styles.art} flip />
        </div>
      </div>

      <div
        className={`${styles.panel} ${styles.side} ${styles.left}`}
        data-veil-left
      >
        <div className={`${styles.sway} ${styles.swayA}`}>
          <GardenCluster className={styles.art} variant={0} />
        </div>
      </div>

      <div
        className={`${styles.panel} ${styles.side} ${styles.right}`}
        data-veil-right
      >
        <div className={`${styles.sway} ${styles.swayB}`}>
          <GardenCluster className={styles.art} variant={1} />
        </div>
      </div>

      <div
        className={`${styles.panel} ${styles.edge} ${styles.bottom}`}
        data-veil-bottom
      >
        <div className={`${styles.sway} ${styles.swayC}`}>
          <ArchingBranch className={styles.art} />
        </div>
      </div>

      <div className={`${styles.fore} ${styles.foreTopLeft}`} data-veil-fore-tl>
        <div className={`${styles.sway} ${styles.swayB}`}>
          <Sprig className={styles.art} seed={29} />
        </div>
      </div>

      <div
        className={`${styles.fore} ${styles.foreBottomRight}`}
        data-veil-fore-br
      >
        <div className={`${styles.sway} ${styles.swayA}`}>
          <Sprig className={styles.art} seed={53} />
        </div>
      </div>
    </div>
  );
}
