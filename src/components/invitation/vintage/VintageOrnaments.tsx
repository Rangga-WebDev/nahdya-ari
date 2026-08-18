/** @format */

import styles from "./VintageOrnaments.module.css";

/**
 * Vintage engraving ornaments. Everything is drawn with thin strokes rather
 * than filled silhouettes so the botanical work reads as etched line art.
 */

type ArchFrameProps = {
  className?: string;
  stroke?: string;
  fill?: string;
  inner?: boolean;
};

/**
 * Slender architectural arch.
 *
 * Drawn to a tall 400×860 box and scaled uniformly, so the curve keeps its
 * shape in every panel it is used in. The legs run right to the bottom edge
 * and finish on a plinth rather than stopping in mid-air.
 */
export function ArchFrame({
  className,
  stroke = "currentColor",
  fill = "none",
  inner = true,
}: ArchFrameProps) {
  return (
    <svg
      className={`${styles.arch} ${className ?? ""}`}
      viewBox="0 0 400 860"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path
        d="M10 860V214C10 101.5 95.1 16 200 16s190 85.5 190 198v646"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />

      {inner ? (
        <path
          d="M26 860V218C26 112 104 34 200 34s174 78 174 184v642"
          fill="none"
          stroke={stroke}
          strokeWidth="0.9"
          opacity="0.45"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />
      ) : null}
    </svg>
  );
}

export function SectionTitle({
  script,
  heading,
  onDark = false,
  as: Heading = "h2",
}: {
  script?: string;
  heading: string;
  onDark?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={styles.titleGroup}>
      {script ? (
        <span
          className={`${styles.script} ${onDark ? styles.scriptOnDark : ""}`}
        >
          {script}
        </span>
      ) : null}

      <Heading
        className={`${styles.heading} ${onDark ? styles.headingOnDark : ""}`}
      >
        {heading}
      </Heading>
    </div>
  );
}

