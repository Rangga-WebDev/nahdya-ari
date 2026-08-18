/** @format */

"use client";

import { useRef } from "react";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { invitation } from "@/lib/invitation";

import { clipUp } from "@/lib/reveal";

import styles from "./ClosingSection.module.css";

export function ClosingSection() {
  const scope = useRef<HTMLElement>(null);

  const closing = invitation.closing;

  const monogram = `${invitation.bride.firstName.charAt(0)} ${invitation.groom.firstName.charAt(0)}`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Scale is fixed, not tweened — rescaling a full-bleed photo on every
           scroll frame forces a re-raster and stutters. */
        gsap.set("[data-closing-photo]", { scale: 1.1 });

        gsap.fromTo(
          "[data-closing-photo]",
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );

        gsap.from("[data-closing-reveal]", {
          ...clipUp({ duration: 1.35 }),
          opacity: 0,
          stagger: 0.13,
          scrollTrigger: { trigger: scope.current, start: "top 68%" },
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="closing"
      className={styles.closing}
      aria-label="Penutup"
      data-closing-section
    >
      <div className={styles.photo} data-closing-photo>
        {closing.portrait ? (
          <Image
            src={closing.portrait}
            alt={`${invitation.bride.firstName} dan ${invitation.groom.firstName}`}
            fill
            sizes="100vw"
            className={styles.photoImage}
          />
        ) : null}
      </div>

      <div className={styles.veil} aria-hidden="true" />

      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.frame} aria-hidden="true" />

      <div className={styles.content}>
        <span className={styles.script} data-closing-reveal>
          {closing.eyebrow}
        </span>

        <p className={styles.names} data-closing-reveal>
          {closing.signature}
        </p>

        <div className={styles.rule} data-closing-reveal aria-hidden="true">
          <span />

          <i>&#9671;</i>

          <span />
        </div>

        <p className={styles.message} data-closing-reveal>
          {closing.message}
        </p>

        <p className={styles.date} data-closing-reveal>
          {invitation.weddingDate}
        </p>

        <span
          className={styles.monogram}
          data-closing-reveal
          aria-hidden="true"
        >
          {monogram}
        </span>
      </div>
    </section>
  );
}
