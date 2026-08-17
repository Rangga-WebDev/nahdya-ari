/** @format */

"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { invitation } from "@/lib/invitation";
import { motion } from "@/lib/motion";

export function FoundationStage() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: {
            ease: motion.ease.cinematic,
          },
        });

        timeline
          .from("[data-foundation-line]", {
            scaleX: 0,
            transformOrigin: "left center",
            duration: motion.duration.slow,
          })
          .from(
            "[data-foundation-eyebrow]",
            {
              opacity: 0,
              y: 16,
              duration: motion.duration.normal,
            },
            "-=0.8",
          )
          .from(
            "[data-foundation-title]",
            {
              opacity: 0,
              yPercent: 20,
              duration: motion.duration.cinematic,
            },
            "-=0.55",
          )
          .from(
            "[data-foundation-subtitle]",
            {
              opacity: 0,
              y: 24,
              duration: motion.duration.slow,
            },
            "-=1.2",
          )
          .from(
            "[data-foundation-meta]",
            {
              opacity: 0,
              y: 16,
              duration: motion.duration.normal,
            },
            "-=0.75",
          );
      });

      return () => mm.revert();
    },
    {
      scope,
    },
  );

  return (
    <section
      ref={scope}
      className="
        relative
        flex
        min-h-svh
        items-center
        overflow-hidden
        bg-ivory
        px-5
        py-14
        text-ink
        md:px-10
      "
    >
      <div
        aria-hidden="true"
        className="
          absolute
          -left-[12rem]
          top-[15%]
          size-[30rem]
          rounded-full
          bg-gold/10
          blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          -right-[10rem]
          bottom-[5%]
          size-[28rem]
          rounded-full
          bg-sogan/10
          blur-[120px]
        "
      />

      <div className="page-container relative z-10">
        <div className="mx-auto max-w-5xl">
          <div data-foundation-line className="mb-10 h-px w-full bg-sogan/25" />

          <p
            data-foundation-eyebrow
            className="
              mb-7
              font-body
              text-[0.65rem]
              font-medium
              uppercase
              tracking-[0.38em]
              text-sogan-deep
              md:text-xs
            "
          >
            {invitation.opening.eyebrow}
          </p>

          <div className="overflow-hidden">
            <h1
              data-foundation-title
              className="
                text-wedding-display
                text-sogan-dark
              "
            >
              {invitation.bride.firstName}
              <span
                className="
                  mx-[0.15em]
                  font-serif
                  italic
                  text-gold
                "
              >
                &
              </span>
              {invitation.groom.firstName}
            </h1>
          </div>

          <div
            data-foundation-subtitle
            className="
              mt-10
              grid
              gap-8
              md:grid-cols-[1fr_1.3fr]
              md:items-end
            "
          >
            <p
              className="
                max-w-md
                font-serif
                text-2xl
                leading-[1.15]
                text-ink-soft
                md:text-3xl
              "
            >
              A cinematic celebration of love, nature and timeless elegance.
            </p>

            <p
              className="
                max-w-lg
                font-body
                text-sm
                leading-7
                text-muted
                md:justify-self-end
                md:text-base
              "
            >
              Foundation established. Botanical imagery, layered scenery and
              cinematic interaction will enter in the next module.
            </p>
          </div>

          <div
            data-foundation-meta
            className="
              mt-14
              flex
              items-center
              justify-between
              border-t
              border-sogan/15
              pt-5
              font-body
              text-[0.65rem]
              uppercase
              tracking-[0.28em]
              text-sogan-deep
            "
          >
            <span>Royal Botanical</span>

            <span>{invitation.weddingDate}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
