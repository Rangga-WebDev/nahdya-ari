/** @format */

"use client";

import type { RefObject } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useEventPavilionMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /*
         * INITIAL
         */

        gsap.set("[data-reception-layer]", {
          autoAlpha: 0,
        });

        gsap.set("[data-event-curtain]", {
          scaleY: 0,
          transformOrigin: "bottom",
        });

        gsap.set("[data-countdown-wrapper]", {
          opacity: 0,
          y: 30,
        });

        gsap.set("[data-event-title]", {
          yPercent: 115,
        });

        gsap.set(
          [
            "[data-event-eyebrow]",
            "[data-event-time]",
            "[data-event-venue]",
            "[data-event-actions]",
            "[data-event-date-header]",
          ],
          {
            opacity: 0,
            y: 20,
          },
        );

        /*
         * CHAPTER TIMELINE
         */

        const story = gsap.timeline({
          defaults: {
            ease: "none",
          },

          scrollTrigger: {
            trigger: scope.current,

            start: "top top",

            end: "bottom bottom",

            scrub: 1.1,

            invalidateOnRefresh: true,
          },
        });

        /*
         * CEREMONY INTRO
         */

        story
          .fromTo(
            "[data-ceremony-layer] [data-event-pavilion]",
            {
              scale: 0.9,
              opacity: 0,
              rotateX: -52,
              z: -320,
              transformOrigin: "top center",
            },
            {
              scale: 1,
              opacity: 1,
              rotateX: 0,
              z: 0,

              duration: 0.15,

              ease: "power3.out",
            },
            0.01,
          )

          .to(
            "[data-ceremony-layer] [data-event-date-header]",
            {
              opacity: 1,
              y: 0,

              duration: 0.08,

              ease: "power3.out",
            },
            0.03,
          )

          .to(
            "[data-ceremony-layer] [data-event-eyebrow]",
            {
              opacity: 1,
              y: 0,

              duration: 0.07,

              ease: "power3.out",
            },
            0.05,
          )

          .to(
            "[data-ceremony-layer] [data-event-title]",
            {
              yPercent: 0,

              duration: 0.11,

              ease: "power4.out",
            },
            0.07,
          )

          .to(
            "[data-ceremony-layer] [data-event-time]",
            {
              opacity: 1,
              y: 0,

              duration: 0.07,

              ease: "power3.out",
            },
            0.11,
          )

          .to(
            "[data-ceremony-layer] [data-event-venue]",
            {
              opacity: 1,
              y: 0,

              duration: 0.07,

              ease: "power3.out",
            },
            0.14,
          )

          .to(
            "[data-ceremony-layer] [data-event-actions]",
            {
              opacity: 1,
              y: 0,

              duration: 0.08,

              ease: "power3.out",
            },
            0.17,
          );

        /*
         * CEREMONY CAMERA
         */

        story
          .to(
            "[data-ceremony-layer] [data-event-giant-date]",
            {
              yPercent: -7,

              scale: 1.04,

              duration: 0.22,
            },
            0.18,
          )

          .to(
            "[data-ceremony-layer] [data-event-pavilion]",
            {
              yPercent: -4,

              rotateX: 9,

              duration: 0.22,
            },
            0.18,
          )

          .to(
            "[data-ceremony-layer] [data-event-botanical-left]",
            {
              xPercent: -7,
              yPercent: 8,

              duration: 0.22,
            },
            0.18,
          )

          .to(
            "[data-ceremony-layer] [data-event-botanical-right]",
            {
              xPercent: 7,
              yPercent: 8,

              duration: 0.22,
            },
            0.18,
          );

        /*
         * DAY → EVENING TRANSITION
         */

        story
          .to(
            "[data-event-curtain]",
            {
              scaleY: 1,

              duration: 0.12,

              ease: "power3.inOut",
            },
            0.37,
          )

          .to(
            "[data-ceremony-layer]",
            {
              opacity: 0,

              duration: 0.08,
            },
            0.41,
          )

          .to(
            "[data-reception-layer]",
            {
              autoAlpha: 1,

              duration: 0.05,
            },
            0.43,
          )

          .fromTo(
            "[data-reception-layer]",
            {
              scale: 1.04,
            },
            {
              scale: 1,

              duration: 0.12,

              ease: "power3.out",
            },
            0.43,
          )

          .to(
            "[data-event-curtain]",
            {
              scaleY: 0,

              transformOrigin: "top",

              duration: 0.13,

              ease: "power3.inOut",
            },
            0.47,
          );

        /*
         * RECEPTION
         */

        story
          .to(
            "[data-reception-layer] [data-event-date-header]",
            {
              opacity: 1,
              y: 0,

              duration: 0.07,
            },
            0.49,
          )

          .to(
            "[data-reception-layer] [data-event-eyebrow]",
            {
              opacity: 1,
              y: 0,

              duration: 0.07,
            },
            0.51,
          )

          .to(
            "[data-reception-layer] [data-event-title]",
            {
              yPercent: 0,

              duration: 0.12,

              ease: "power4.out",
            },
            0.53,
          )

          .to(
            "[data-reception-layer] [data-event-time]",
            {
              opacity: 1,
              y: 0,

              duration: 0.07,
            },
            0.57,
          )

          .to(
            "[data-reception-layer] [data-event-venue]",
            {
              opacity: 1,
              y: 0,

              duration: 0.07,
            },
            0.6,
          )

          .to(
            "[data-reception-layer] [data-event-actions]",
            {
              opacity: 1,
              y: 0,

              duration: 0.08,
            },
            0.63,
          );

        /*
         * COUNTDOWN
         */

        story
          .to(
            "[data-reception-layer] [data-event-pavilion]",
            {
              yPercent: -7,

              rotateX: -14,

              scale: 0.96,

              opacity: 0.36,

              duration: 0.15,
            },
            0.73,
          )

          .to(
            "[data-reception-layer] [data-event-giant-date]",
            {
              yPercent: -10,

              opacity: 0.2,

              duration: 0.15,
            },
            0.73,
          )

          .to(
            "[data-countdown-wrapper]",
            {
              opacity: 1,
              y: 0,

              duration: 0.13,

              ease: "power4.out",
            },
            0.77,
          );

        /*
         * FINAL BREATH
         */

        story
          .to(
            "[data-reception-layer] [data-event-atmosphere]",
            {
              scale: 1.12,

              duration: 0.14,
            },
            0.84,
          )

          .to(
            "[data-countdown-wrapper]",
            {
              yPercent: -3,

              duration: 0.14,
            },
            0.86,
          );

        /*
         * PROGRESS
         */

        gsap.fromTo(
          "[data-event-progress]",
          {
            scaleY: 0,

            transformOrigin: "top",
          },
          {
            scaleY: 1,

            ease: "none",

            scrollTrigger: {
              trigger: scope.current,

              start: "top top",

              end: "bottom bottom",

              scrub: true,
            },
          },
        );
      });

      /*
       * REDUCED MOTION
       */

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-ceremony-layer]", {
          display: "none",
        });

        gsap.set("[data-reception-layer]", {
          autoAlpha: 1,
        });

        gsap.set(
          [
            "[data-event-title]",
            "[data-event-eyebrow]",
            "[data-event-time]",
            "[data-event-venue]",
            "[data-event-actions]",
            "[data-event-date-header]",
          ],
          {
            clearProps: "all",
          },
        );

        gsap.set("[data-countdown-wrapper]", {
          opacity: 1,
          y: 0,
        });
      });

      return () => {
        mm.revert();
      };
    },
    {
      scope,
    },
  );
}
