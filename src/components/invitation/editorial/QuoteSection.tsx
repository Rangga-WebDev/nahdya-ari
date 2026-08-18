/** @format */

"use client";

import { useRef } from "react";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { invitation } from "@/lib/invitation";

import { clipUp, settle } from "@/lib/reveal";

import styles from "./QuoteSection.module.css";

export function QuoteSection() {
  const scope = useRef<HTMLElement>(null);

  const quote = invitation.quote;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-quote-media]", { scale: 1.1 });

        gsap.fromTo(
          "[data-quote-media]",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );

        gsap.from("[data-quote-frame]", {
          ...settle({ scale: 1.04, duration: 1.4 }),
          scrollTrigger: { trigger: scope.current, start: "top 70%" },
        });

        gsap.from("[data-quote-reveal]", {
          ...clipUp({ duration: 1.15 }),
          opacity: 0,
          stagger: 0.13,
          scrollTrigger: { trigger: scope.current, start: "top 66%" },
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className={styles.quote}
      aria-label="Kutipan"
      data-quote-section
    >
      <div className={styles.media} data-quote-media>
        {quote.image ? (
          <Image
            src={quote.image}
            alt=""
            fill
            sizes="100vw"
            className={styles.image}
            style={{ objectPosition: quote.objectPosition ?? "50% 50%" }}
          />
        ) : null}
      </div>

      <div className={styles.veil} aria-hidden="true" />

      <figure className={styles.frame} data-quote-frame>
        {quote.eyebrow ? (
          <figcaption className={styles.eyebrow} data-quote-reveal>
            {quote.eyebrow}
          </figcaption>
        ) : null}

        <span className={styles.mark} aria-hidden="true" data-quote-reveal>
          &ldquo;
        </span>

        <blockquote className={styles.text} data-quote-reveal>
          {quote.text}
        </blockquote>

        {quote.author ? (
          <p className={styles.author} data-quote-reveal>
            <i aria-hidden="true" />

            {quote.author}

            <i aria-hidden="true" />
          </p>
        ) : null}
      </figure>
    </section>
  );
}
