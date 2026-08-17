/** @format */

"use client";

import type { RefObject } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useClosingJourneyMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /*
         * Dusk transition — the ivory stationery darkens into the garden.
         */

        gsap.fromTo(
          "[data-closing-dawn]",
          { opacity: 1 },
          {
            opacity: 0,

            ease: "none",

            scrollTrigger: {
              trigger: scope.current,

              start: "top bottom",

              end: "top 25%",

              scrub: true,

              invalidateOnRefresh: true,
            },
          },
        );

        /*
         * Slow atmospheric parallax.
         */

        const parallax = gsap.timeline({
          defaults: { ease: "none" },

          scrollTrigger: {
            trigger: scope.current,

            start: "top bottom",

            end: "bottom top",

            scrub: 1,

            invalidateOnRefresh: true,
          },
        });

        parallax
          .fromTo(
            "[data-closing-moon]",
            { yPercent: 26, opacity: 0 },
            { yPercent: -6, opacity: 1, duration: 0.5 },
            0,
          )

          .fromTo(
            "[data-closing-mountains]",
            { yPercent: 16 },
            { yPercent: -4, duration: 1 },
            0,
          )

          .fromTo(
            "[data-closing-palace]",
            { yPercent: 20 },
            { yPercent: 0, duration: 1 },
            0,
          )

          .fromTo(
            "[data-closing-botanical]",
            { yPercent: 26 },
            { yPercent: -8, duration: 1 },
            0,
          )

          .fromTo(
            "[data-closing-stars]",
            { opacity: 0 },
            { opacity: 1, duration: 0.6 },
            0.1,
          );

        /*
         * Content reveal.
         */

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-closing-content]",

            start: "top 82%",

            toggleActions: "play none none none",
          },
        });

        reveal
          .fromTo(
            "[data-closing-portrait]",
            { clipPath: "inset(100% 0 0 0)", scale: 1.06 },
            {
              clipPath: "inset(0% 0 0 0)",
              scale: 1,
              duration: 1.5,
              ease: "power4.out",
            },
            0,
          )

          .fromTo(
            "[data-closing-title]",
            { yPercent: 118 },
            { yPercent: 0, duration: 1.2, ease: "power4.out" },
            0.4,
          )

          .fromTo(
            "[data-closing-rule]",
            { opacity: 0, scaleX: 0 },
            { opacity: 1, scaleX: 1, duration: 0.9, ease: "power3.out" },
            0.7,
          )

          .fromTo(
            "[data-closing-small]",
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.14,
              duration: 1,
              ease: "power3.out",
            },
            0.55,
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            "[data-closing-dawn]",
            "[data-closing-moon]",
            "[data-closing-mountains]",
            "[data-closing-palace]",
            "[data-closing-botanical]",
            "[data-closing-stars]",
            "[data-closing-portrait]",
            "[data-closing-title]",
            "[data-closing-rule]",
            "[data-closing-small]",
          ],
          { clearProps: "all" },
        );

        gsap.set("[data-closing-dawn]", { opacity: 0 });
      });
    },
    { scope },
  );
}
