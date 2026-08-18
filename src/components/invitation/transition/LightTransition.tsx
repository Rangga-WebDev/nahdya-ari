/** @format */

"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { EASE } from "@/lib/reveal";

import { Sprig } from "@/components/invitation/botanical/BotanicalArt";

import styles from "./LightTransition.module.css";

/**
 * The dark-to-light passage. It is a section in its own right rather than a
 * boundary between two, which is why the change of environment never snaps.
 */
export function LightTransition() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-wash-marker]",
          { opacity: 0, filter: "blur(10px)", letterSpacing: "0.16em" },
          {
            opacity: 1,
            filter: "blur(0px)",
            letterSpacing: "0em",
            duration: 1.6,
            ease: EASE,
            scrollTrigger: { trigger: scope.current, start: "top 40%" },
          },
        );

        gsap.utils
          .toArray<HTMLElement>("[data-wash-silhouette]")
          .forEach((el, i) => {
            gsap.fromTo(
              el,
              { yPercent: i === 0 ? -12 : 10 },
              {
                yPercent: i === 0 ? 10 : -12,
                ease: "none",
                scrollTrigger: {
                  trigger: scope.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.3,
                },
              },
            );
          });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      className={styles.transition}
      aria-hidden="true"
      data-light-transition
    >
      <span className={styles.glow} />

      <span
        className={`${styles.silhouette} ${styles.silhouetteLeft}`}
        data-wash-silhouette
      >
        <Sprig className={styles.art} seed={11} />
      </span>

      <span
        className={`${styles.silhouette} ${styles.silhouetteRight}`}
        data-wash-silhouette
      >
        <Sprig className={styles.art} seed={37} />
      </span>

      <span className={styles.marker} data-wash-marker>
        the day
      </span>
    </div>
  );
}
