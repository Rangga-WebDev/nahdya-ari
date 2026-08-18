/** @format */

"use client";

import { useRef } from "react";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import type { Person } from "@/types/invitation";

import { invitation } from "@/lib/invitation";
import { clipUp, parallax, slide } from "@/lib/reveal";

import { SectionTitle } from "@/components/invitation/vintage/VintageOrnaments";

import styles from "./CoupleSection.module.css";

export function CoupleSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-couple-head]", {
          ...clipUp(),
          opacity: 0,
          stagger: 0.12,
          scrollTrigger: { trigger: scope.current, start: "top 78%" },
        });

        gsap.utils
          .toArray<HTMLElement>("[data-couple-person]")
          .forEach((person, index) => {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: person, start: "top 80%" },
            });

            tl.from(person.querySelector("[data-couple-portrait]"), {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 1.35,
              ease: "expo.out",
            }).from(
              person.querySelectorAll("[data-couple-detail]"),
              {
                ...slide(index === 0 ? "left" : "right", { x: 18 }),
                stagger: 0.09,
              },
              0.4,
            );

            const media = person.querySelector("[data-couple-portrait] img");

            if (media) {
              const p = parallax(person, 6, 1.2);

              gsap.fromTo(media, p.from, p.to);
            }
          });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="couple" className={styles.couple} data-couple>
      <div className={styles.inner}>
        <div data-couple-head>
          <SectionTitle script="Bismillah" heading="Kedua Mempelai" onDark />
        </div>

        <p className={styles.intro} data-couple-head>
          {invitation.opening.message}
        </p>

        <div className={styles.people}>
          <PersonBlock person={invitation.bride} label="Putri dari" />

          <span className={styles.amp} aria-hidden="true">
            &amp;
          </span>

          <PersonBlock person={invitation.groom} label="Putra dari" />
        </div>
      </div>
    </section>
  );
}

function PersonBlock({ person, label }: { person: Person; label: string }) {
  const handle = person.instagram?.replace(/^@/, "");

  return (
    <article className={styles.person} data-couple-person>
      <div className={styles.portrait} data-couple-portrait>
        <span className={styles.portraitFrame} aria-hidden="true" />

        <div className={styles.portraitInner}>
          {person.portrait ? (
            <Image
              src={person.portrait}
              alt={person.fullName}
              fill
              sizes="(max-width: 900px) 70vw, 24rem"
              className={styles.portraitImage}
            />
          ) : (
            <span className={styles.portraitFallback} aria-hidden="true">
              {person.firstName.charAt(0)}
            </span>
          )}
        </div>
      </div>

      <h3 className={styles.name} data-couple-detail>
        {person.fullName}
      </h3>

      {person.role ? (
        <p className={styles.role} data-couple-detail>
          {person.role}
        </p>
      ) : null}

      <p className={styles.parents} data-couple-detail>
        <span className={styles.parentsLabel}>{label}</span>
        {person.father}
        <br />
        &amp; {person.mother}
      </p>

      {handle ? (
        <a
          className={styles.social}
          href={`https://instagram.com/${handle}`}
          target="_blank"
          rel="noreferrer"
          data-couple-detail
        >
          <InstagramIcon className={styles.socialIcon} />@{handle}
        </a>
      ) : null}
    </article>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />

      <circle cx="12" cy="12" r="4" />

      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
