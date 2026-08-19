/** @format */

"use client";

import { useRef } from "react";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { invitation } from "@/lib/invitation";
import { clipUp, parallax, settle } from "@/lib/reveal";

import { ArchFrame } from "@/components/invitation/vintage/VintageOrnaments";

import styles from "./VerseSection.module.css";

export function VerseSection() {
  const scope = useRef<HTMLDivElement>(null);

  const verse = invitation.introduction.verse;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-verse-reveal]", {
          ...clipUp(),
          opacity: 0,
          stagger: 0.14,
          scrollTrigger: { trigger: "[data-verse-section]", start: "top 76%" },
        });

        gsap.from("[data-verse-arch]", {
          ...settle({ scale: 1.1, duration: 1.7 }),
          scrollTrigger: { trigger: "[data-verse-section]", start: "top 80%" },
        });

        gsap.from("[data-verse-plate]", {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-verse-plate]", start: "top 84%" },
        });

        const plate = document.querySelector("[data-verse-plate] img");

        if (plate) {
          const p = parallax(plate.closest("section") as Element, 8, 1.2);

          gsap.fromTo(plate, p.from, p.to);
        }
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope}>
      <section
        className={styles.verse}
        data-verse-section
        aria-label="Ayat pembuka"
      >
        <div className={styles.paper} aria-hidden="true" />

        <div className={styles.archWrap} data-verse-arch>
          <ArchFrame inner={false} />
        </div>

        <figure className={styles.inner}>
          <p className={styles.bismillah} data-verse-reveal>
            {invitation.introduction.eyebrow}
          </p>

          <p className={styles.arabic} lang="ar" dir="rtl" data-verse-reveal>
            {verse.arabic}
          </p>

          <blockquote className={styles.translation} data-verse-reveal>
            {verse.translation}
          </blockquote>

          <figcaption className={styles.reference} data-verse-reveal>
            {verse.reference}
          </figcaption>
        </figure>
      </section>

      <section className={styles.plate} aria-label="Potret mempelai">
        <div className={styles.mat} data-verse-plate>
          <div className={styles.matInner}>
            <Image
              src="/art/gallery/memory-02.webp"
              alt={`${invitation.bride.firstName} dan ${invitation.groom.firstName}`}
              fill
              sizes="(max-width: 768px) 90vw, 26rem"
              className={styles.matImage}
            />
          </div>

          <p className={styles.caption}>{invitation.closing.signature}</p>
        </div>
      </section>
    </div>
  );
}
