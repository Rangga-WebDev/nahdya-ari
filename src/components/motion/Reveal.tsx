/** @format */

"use client";

import { useRef, type ReactNode } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { EASE } from "@/lib/reveal";

import styles from "./Reveal.module.css";

/**
 * Image reveal: the frame uncrops while the picture eases down from a slight
 * over-scale. Both properties are compositor-friendly, and the two moving at
 * once is what stops it reading as a plain fade.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
  start = "top 85%",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;

      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: el, start }, delay })
          .to(el, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.3,
            ease: EASE,
          })
          .to(el.firstElementChild, { scale: 1, duration: 1.5, ease: EASE }, 0);
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={`${styles.frame} ${className ?? ""}`}>
      <span className={styles.frameInner}>{children}</span>
    </span>
  );
}

/**
 * A line of type that rises out of its own mask. Give it one line only —
 * multi-line text needs one Mask per line to look right.
 */
export function MaskLine({
  children,
  className,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "div" | "h2" | "h3" | "p";
}) {
  return (
    <Tag className={`${styles.mask} ${className ?? ""}`}>
      <span className={styles.maskInner} data-mask-line>
        {children}
      </span>
    </Tag>
  );
}
