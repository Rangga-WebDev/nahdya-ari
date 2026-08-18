/** @format */

"use client";

import { useRef } from "react";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import type { EditorialMoment } from "@/types/invitation";

import styles from "./EditorialBreak.module.css";

type EditorialBreakProps = {
  moment: EditorialMoment;
  priority?: boolean;
};

export function EditorialBreak({
  moment,
  priority = false,
}: EditorialBreakProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-break-media]", { scale: 1.08 });

        gsap.fromTo(
          "[data-break-media]",
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          },
        );

        gsap.from("[data-break-line]", {
          yPercent: 118,
          duration: 1.1,
          stagger: 0.11,
          ease: "power4.out",
          scrollTrigger: { trigger: scope.current, start: "top 72%" },
        });

        gsap.from("[data-break-eyebrow]", {
          opacity: 0,
          y: 18,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: scope.current, start: "top 72%" },
        });

        gsap.from("[data-break-rule]", {
          scaleX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: scope.current, start: "top 66%" },
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className={styles.break} data-editorial-break>
      <div className={styles.media} data-break-media>
        {moment.image ? (
          <Image
            src={moment.image}
            alt=""
            fill
            priority={priority}
            sizes="100vw"
            className={styles.image}
            style={{ objectPosition: moment.objectPosition ?? "50% 50%" }}
          />
        ) : null}
      </div>

      <div className={styles.veil} aria-hidden="true" />

      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.content}>
        {moment.eyebrow ? (
          <p className={styles.eyebrow} data-break-eyebrow>
            {moment.eyebrow}
          </p>
        ) : null}

        <p className={styles.lines}>
          {moment.lines.map((line) => (
            <span key={line} className={styles.lineMask}>
              <span className={styles.line} data-break-line>
                {line}
              </span>
            </span>
          ))}
        </p>

        <span className={styles.rule} data-break-rule aria-hidden="true" />
      </div>
    </section>
  );
}
