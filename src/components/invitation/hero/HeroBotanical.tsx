/** @format */

import styles from "./HeroGarden.module.css";

type BranchProps = {
  className?: string;
};

function BotanicalBranch({ className = "" }: BranchProps) {
  return (
    <svg
      viewBox="0 0 260 520"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M126 520C122 390 138 288 169 184C187 123 206 72 235 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <g fill="currentColor">
        <ellipse
          cx="145"
          cy="389"
          rx="27"
          ry="62"
          transform="rotate(-37 145 389)"
        />

        <ellipse
          cx="112"
          cy="340"
          rx="23"
          ry="54"
          transform="rotate(42 112 340)"
        />

        <ellipse
          cx="163"
          cy="300"
          rx="24"
          ry="59"
          transform="rotate(-39 163 300)"
        />

        <ellipse
          cx="137"
          cy="248"
          rx="23"
          ry="55"
          transform="rotate(46 137 248)"
        />

        <ellipse
          cx="190"
          cy="209"
          rx="22"
          ry="55"
          transform="rotate(-36 190 209)"
        />

        <ellipse
          cx="169"
          cy="158"
          rx="20"
          ry="49"
          transform="rotate(48 169 158)"
        />

        <ellipse
          cx="215"
          cy="112"
          rx="19"
          ry="48"
          transform="rotate(-30 215 112)"
        />

        <ellipse
          cx="207"
          cy="67"
          rx="16"
          ry="39"
          transform="rotate(46 207 67)"
        />
      </g>
    </svg>
  );
}

export function HeroBotanical() {
  return (
    <>
      <div
        className={styles.midBotanical}
        data-hero-mid-botanical
        aria-hidden="true"
      >
        <BotanicalBranch className={styles.midBranchLeft} />

        <BotanicalBranch className={styles.midBranchRight} />
      </div>

      <div
        className={styles.foreground}
        data-hero-foreground
        aria-hidden="true"
      >
        <div className={styles.foregroundShade} />

        <div className={styles.botanicalLeft} data-botanical-left>
          <BotanicalBranch className={styles.branchLeftOuter} />

          <BotanicalBranch className={styles.branchLeftInner} />
        </div>

        <div className={styles.botanicalRight} data-botanical-right>
          <BotanicalBranch className={styles.branchRightOuter} />

          <BotanicalBranch className={styles.branchRightInner} />
        </div>
      </div>
    </>
  );
}
