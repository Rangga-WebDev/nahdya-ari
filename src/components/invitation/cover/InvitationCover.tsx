/** @format */

"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

import { invitation } from "@/lib/invitation";

import { useGuestName } from "@/components/invitation/experience/useExperienceControls";

import {
  REPLAY_SCALE,
  hasPlayedOpening,
  opening,
} from "@/components/invitation/botanical/timing";

import styles from "./InvitationCover.module.css";

const COVER_PHOTO = "/art/gallery/memory-06.webp";

export function InvitationCover() {
  const scope = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);

  const guest = useGuestName();

  const lenis = useLenis();

  const guestName = guest ?? invitation.experience.guestFallback;

  /* The invitation stays frozen behind the cover until the guest opens it. */
  useEffect(() => {
    if (opened) return;

    lenis?.stop();

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [lenis, opened]);

  useGSAP(
    () => {
      if (opened) return;

      const root = scope.current;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduced) {
        root?.removeAttribute("data-cover-stage");

        return;
      }

      /* Returning guests get the same beats at the curtain's replay speed. */
      const scale = hasPlayedOpening() ? REPLAY_SCALE : 1;

      const beat = {
        backdrop: opening.backdrop * scale,
        eyebrow: opening.eyebrow * scale,
        names: opening.names * scale,
        date: opening.date * scale,
        cta: opening.cta * scale,
      };

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        /* GSAP has written the inline from-values by now, so releasing the CSS
           gate cannot cause a flash. */
        onStart: () => root?.removeAttribute("data-cover-stage"),
      });

      /* Beats are absolute offsets from mount so they stay locked to the
         botanical curtain, which mounts in the same frame. */
      intro
        .fromTo(
          "[data-cover-photo]",
          { scale: 1.14, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2.2, ease: "power2.out" },
          beat.backdrop,
        )

        .fromTo(
          "[data-cover-frame]",
          { opacity: 0 },
          { opacity: 1, duration: 1.1 },
          beat.backdrop + 0.2,
        )

        .fromTo(
          "[data-cover-sprig]",
          { opacity: 0, y: 14 },
          { opacity: 0.85, y: 0, duration: 0.9 },
          beat.backdrop + 0.35,
        )

        .fromTo(
          "[data-cover-eyebrow]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9 },
          beat.eyebrow,
        )

        .fromTo(
          "[data-cover-name]",
          { yPercent: 116, opacity: 0, filter: "blur(9px)" },
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.6,
            stagger: 0.14,
            ease: "power4.out",
          },
          beat.names,
        )

        .fromTo(
          "[data-cover-date]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.9 },
          beat.date,
        )

        .fromTo(
          "[data-cover-guest]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9 },
          beat.date + 0.1,
        )

        .fromTo(
          "[data-cover-open]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9 },
          beat.cta,
        );
    },
    { scope, dependencies: [opened] },
  );

  function handleOpen() {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const finish = () => {
      document.body.style.overflow = "";

      lenis?.start();

      lenis?.scrollTo(0, { immediate: true });

      window.scrollTo(0, 0);

      setOpened(true);

      window.dispatchEvent(new CustomEvent("invitation:opened"));
    };

    if (reduced) {
      finish();

      return;
    }

    /* The photo keeps growing as the cover lifts, so the hero feels continuous. */
    gsap
      .timeline({ onComplete: finish })
      .to(
        "[data-cover-content]",
        { opacity: 0, y: -26, duration: 0.5, ease: "power2.in" },
        0,
      )
      .to(
        "[data-cover-frame]",
        { opacity: 0, duration: 0.45, ease: "power2.in" },
        0,
      )
      .to(
        "[data-cover-photo]",
        { scale: 1.16, duration: 1.3, ease: "power2.inOut" },
        0,
      )
      .to(
        scope.current,
        {
          yPercent: -100,
          duration: 1.15,
          ease: "power3.inOut",
        },
        0.35,
      );
  }

  if (opened) return null;

  return (
    <div
      ref={scope}
      className={styles.cover}
      data-invitation-cover
      data-cover-stage=""
    >
      <div className={styles.photo} data-cover-photo>
        <Image
          src={COVER_PHOTO}
          alt={`${invitation.bride.firstName} dan ${invitation.groom.firstName}`}
          fill
          priority
          sizes="100vw"
          className={styles.photoImage}
        />
      </div>

      <div className={styles.grade} aria-hidden="true" />

      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.frame} data-cover-frame aria-hidden="true">
        <CornerFlourish
          className={`${styles.corner} ${styles.cornerTopLeft}`}
        />

        <CornerFlourish
          className={`${styles.corner} ${styles.cornerTopRight}`}
        />

        <CornerFlourish
          className={`${styles.corner} ${styles.cornerBottomLeft}`}
        />

        <CornerFlourish
          className={`${styles.corner} ${styles.cornerBottomRight}`}
        />
      </div>

      <div className={styles.content} data-cover-content>
        <Sprig className={styles.sprig} data-cover-sprig />

        <p className={styles.eyebrow} data-cover-eyebrow>
          The Wedding of
        </p>

        <h1 className={styles.nameMask}>
          <span className={styles.name} data-cover-name>
            {invitation.bride.firstName}
          </span>
        </h1>

        <span className={styles.ampersand} data-cover-name aria-hidden="true">
          &amp;
        </span>

        <p className={styles.nameMask}>
          <span className={styles.name} data-cover-name>
            {invitation.groom.firstName}
          </span>
        </p>

        <p className={styles.date} data-cover-date>
          <i aria-hidden="true" />

          {invitation.weddingDate}

          <i aria-hidden="true" />
        </p>

        <div className={styles.guest} data-cover-guest>
          <span className={styles.guestLabel}>Kepada Bapak/Ibu/Saudara/i</span>

          <span className={styles.guestName}>{guestName}</span>
        </div>

        <button
          type="button"
          className={styles.open}
          onClick={handleOpen}
          data-cover-open
        >
          <EnvelopeIcon className={styles.openIcon} />
          Buka Undangan
        </button>
      </div>
    </div>
  );
}

function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
    >
      <path d="M0 22C14 22 22 14 22 0" />

      <path d="M0 34C20 34 34 20 34 0" opacity="0.55" />

      <circle cx="27" cy="27" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Sprig({ className, ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
      {...rest}
    >
      <path d="M6 17h34" />

      <path d="M80 17h34" />

      <path d="M60 5c6 5 6 19 0 24-6-5-6-19 0-24z" />

      <path d="M48 11c4 3 6 6 8 6M72 11c-4 3-6 6-8 6" opacity="0.7" />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />

      <path d="M3 6.5 12 13l9-6.5" />
    </svg>
  );
}
