/** @format */

"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

import { invitation } from "@/lib/invitation";

import { useGuestName } from "@/components/invitation/experience/useExperienceControls";

import {
  GoldenDust,
  LightRays,
} from "@/components/invitation/effects/AmbientEffects";

import styles from "./EnvelopeOverture.module.css";

export function EnvelopeOverture() {
  const scope = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);

  const guest = useGuestName();

  const lenis = useLenis();

  const name = guest ?? invitation.experience.guestFallback;

  /* The page stays frozen behind the envelope until the guest opens it. */
  useEffect(() => {
    if (opened) return;

    lenis?.stop();

    document.body.style.overflow = "hidden";
  }, [lenis, opened]);

  useGSAP(
    () => {
      if (opened) return;

      /* `fromTo` keeps the end state explicit so a re-run cannot strand it. */
      gsap.fromTo(
        "[data-overture-envelope]",
        { y: 60, opacity: 0, rotateX: 26 },
        { y: 0, opacity: 1, rotateX: 9, duration: 1.4, ease: "power3.out" },
      );

      gsap.fromTo(
        "[data-overture-panel]",
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.45, ease: "power3.out" },
      );

      gsap.to("[data-overture-seal]", {
        scale: 1.06,
        duration: 1.9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope },
  );

  function handleOpen() {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const finish = () => {
      document.body.style.overflow = "";

      lenis?.start();

      window.scrollTo(0, 0);

      setOpened(true);
    };

    if (reduced) {
      finish();

      return;
    }

    const timeline = gsap.timeline({ onComplete: finish });

    timeline
      .to("[data-overture-panel]", {
        opacity: 0,
        y: 18,
        duration: 0.4,
        ease: "power2.in",
      })

      .to(
        "[data-overture-seal]",
        {
          scale: 0,
          rotate: 150,
          opacity: 0,
          duration: 0.6,
          ease: "back.in(1.8)",
        },
        0,
      )

      .to(
        "[data-overture-flap]",
        {
          rotateX: -172,
          duration: 1.05,
          ease: "power2.inOut",
        },
        0.35,
      )

      /* Drop the flap behind the pocket once it has swung past vertical. */
      .set("[data-overture-flap]", { zIndex: 0 }, 0.85)

      .to(
        "[data-overture-letter]",
        {
          y: "-58%",
          z: 90,
          duration: 1.15,
          ease: "power3.out",
        },
        0.95,
      )

      .to(
        "[data-overture-envelope]",
        {
          y: 90,
          rotateX: 32,
          opacity: 0,
          duration: 0.9,
          ease: "power2.in",
        },
        1.5,
      )

      .to(
        "[data-overture-letter]",
        {
          scale: 2.4,
          opacity: 0,
          duration: 0.85,
          ease: "power2.in",
        },
        1.6,
      )

      .to(
        "[data-overture-gate]",
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        },
        1.9,
      );
  }

  if (opened) return null;

  return (
    <div ref={scope} className={styles.gate} data-overture-gate>
      <LightRays opacity={0.5} speed="70s" />

      <GoldenDust count={30} intensity={0.8} />

      <div className={styles.stage}>
        <div className={styles.envelope} data-overture-envelope>
          <span className={styles.pocket} aria-hidden="true" />

          <div className={styles.letter} data-overture-letter>
            <span className={styles.letterFrame} aria-hidden="true" />

            <span className={styles.letterEyebrow}>
              {invitation.opening.eyebrow}
            </span>

            <p className={styles.letterNames}>
              {invitation.bride.firstName}
              <span className={styles.letterAmp}> &amp; </span>
              {invitation.groom.firstName}
            </p>

            <span className={styles.letterRule} aria-hidden="true">
              <span />
              <i />
              <span />
            </span>

            <span className={styles.letterDate}>{invitation.weddingDate}</span>
          </div>

          <span className={styles.front} aria-hidden="true" />

          <span className={styles.frontEdge} aria-hidden="true" />

          <span className={styles.flap} data-overture-flap aria-hidden="true">
            <span className={styles.flapShade} />
          </span>

          <span className={styles.seal} data-overture-seal aria-hidden="true">
            {invitation.bride.firstName.charAt(0)}
            {invitation.groom.firstName.charAt(0)}
          </span>
        </div>

        <div data-overture-panel>
          <div className={styles.guest}>
            <p className={styles.guestLabel}>Kepada Yth.</p>

            <p className={styles.guestName}>{name}</p>
          </div>

          <button type="button" className={styles.open} onClick={handleOpen}>
            <span>Buka Undangan</span>

            <span className={styles.openIcon} aria-hidden="true">
              ✦
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
