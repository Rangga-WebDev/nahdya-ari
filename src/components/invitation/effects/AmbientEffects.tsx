/** @format */

import type { CSSProperties } from "react";

import styles from "./AmbientEffects.module.css";

/**
 * Positions are pre-computed and rounded rather than random so the server and
 * client markup serialise to identical strings.
 */
function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return Number((value - Math.floor(value)).toFixed(4));
}

type GoldenDustProps = {
  count?: number;
  className?: string;
  intensity?: number;
};

export function GoldenDust({
  count = 26,
  className,
  intensity = 0.7,
}: GoldenDustProps) {
  const motes = Array.from({ length: count }, (_, index) => {
    const left = (pseudoRandom(index + 1) * 100).toFixed(2);

    const top = (55 + pseudoRandom(index + 41) * 45).toFixed(2);

    const size = (2 + pseudoRandom(index + 83) * 5).toFixed(2);

    const duration = (9 + pseudoRandom(index + 127) * 12).toFixed(2);

    const delay = (pseudoRandom(index + 191) * -18).toFixed(2);

    const drift = ((pseudoRandom(index + 233) - 0.5) * 120).toFixed(2);

    return {
      key: index,
      style: {
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        "--mote-drift": `${drift}px`,
        "--mote-peak": String(intensity),
      } as CSSProperties,
    };
  });

  return (
    <div
      className={`${styles.dust} ${className ?? ""}`}
      aria-hidden="true"
      data-golden-dust
    >
      {motes.map((mote) => (
        <span key={mote.key} className={styles.mote} style={mote.style} />
      ))}
    </div>
  );
}

type LightRaysProps = {
  className?: string;
  opacity?: number;
  size?: string;
  top?: string;
  speed?: string;
};

export function LightRays({
  className,
  opacity = 0.4,
  size = "130vmax",
  top = "-30%",
  speed = "70s",
}: LightRaysProps) {
  return (
    <div
      className={`${styles.rays} ${className ?? ""}`}
      aria-hidden="true"
      data-light-rays
      style={
        {
          "--rays-opacity": String(opacity),
          "--rays-size": size,
          "--rays-top": top,
          "--rays-speed": speed,
        } as CSSProperties
      }
    />
  );
}

type BokehProps = {
  count?: number;
  className?: string;
};

export function BokehOrbs({ count = 7, className }: BokehProps) {
  const orbs = Array.from({ length: count }, (_, index) => {
    const left = (pseudoRandom(index + 11) * 92).toFixed(2);

    const top = (pseudoRandom(index + 53) * 88).toFixed(2);

    const size = (60 + pseudoRandom(index + 97) * 150).toFixed(2);

    const speed = (14 + pseudoRandom(index + 149) * 14).toFixed(2);

    const driftX = ((pseudoRandom(index + 199) - 0.5) * 90).toFixed(2);

    const driftY = (-30 - pseudoRandom(index + 251) * 70).toFixed(2);

    return {
      key: index,
      style: {
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`,
        "--orb-speed": `${speed}s`,
        "--orb-x": `${driftX}px`,
        "--orb-y": `${driftY}px`,
      } as CSSProperties,
    };
  });

  return (
    <div
      className={`${styles.bokeh} ${className ?? ""}`}
      aria-hidden="true"
      data-bokeh
    >
      {orbs.map((orb) => (
        <span key={orb.key} className={styles.orb} style={orb.style} />
      ))}
    </div>
  );
}

export function ShimmerSweep({
  className,
  speed = "7s",
}: {
  className?: string;
  speed?: string;
}) {
  return (
    <span
      className={`${styles.shimmer} ${className ?? ""}`}
      aria-hidden="true"
      style={{ "--shimmer-speed": speed } as CSSProperties}
    />
  );
}
