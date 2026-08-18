/** @format */

"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

import { invitation } from "@/lib/invitation";
import { EASE, blurIn, draw, drift, lineRise } from "@/lib/reveal";

import { ArchFrame } from "@/components/invitation/vintage/VintageOrnaments";

import styles from "./VintageHero.module.css";

export function VintageHero() {
  const scope = useRef<HTMLElement>(null);

  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: EASE },
          scrollTrigger: { trigger: scope.current, start: "top 80%" },
        });

        tl.from("[data-hero-arch]", {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.8,
        })
          .from("[data-hero-eyebrow]", blurIn({ duration: 1.1 }), 0.2)
          .from("[data-hero-name]", { ...lineRise(), stagger: 0.1 }, 0.35)
          .from("[data-hero-amp]", drift({ y: 0, scale: 0.7 }), 0.7)
          .from("[data-hero-rule]", { ...draw(), stagger: 0.06 }, 0.75)
          .from("[data-hero-date]", drift(), 0.85)
          .from("[data-hero-cta]", drift(), 0.98)
          .from("[data-hero-cue]", drift(), 1.1);
      });

      return () => mm.revert();
    },
    { scope },
  );

  function scrollToEvents() {
    const target = document.getElementById("day");

    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, { offset: -10 });

      return;
    }

    target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      ref={scope}
      id="beginning"
      className={styles.hero}
      data-vintage-hero
    >
      <div className={styles.archLayer} data-hero-arch aria-hidden="true">
        <ArchFrame inner={false} />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow} data-hero-eyebrow>
          {invitation.opening.eyebrow}
        </p>

        <h1 className={styles.names}>
          <span className={styles.mask}>
            <span className={styles.name} data-hero-name>
              {invitation.bride.firstName}
            </span>
          </span>

          <span className={styles.amp} data-hero-amp aria-hidden="true">
            &amp;
          </span>

          <span className={styles.mask}>
            <span className={styles.name} data-hero-name>
              {invitation.groom.firstName}
            </span>
          </span>
        </h1>

        <div className={styles.meta}>
          <span className={styles.rule} data-hero-rule aria-hidden="true" />

          <p className={styles.date} data-hero-date>
            {invitation.weddingDate}
          </p>

          <span className={styles.rule} data-hero-rule aria-hidden="true" />
        </div>

        <button
          type="button"
          className={styles.cta}
          onClick={scrollToEvents}
          data-hero-cta
        >
          <span className={styles.ctaFill} aria-hidden="true" />

          <span className={styles.ctaLabel}>Save The Date</span>
        </button>
      </div>

      <div className={styles.cue} data-hero-cue>
        <span className={styles.cueLine} aria-hidden="true" />

        <span>scroll</span>

        <span className={styles.cueLine} aria-hidden="true" />
      </div>
    </section>
  );
}
