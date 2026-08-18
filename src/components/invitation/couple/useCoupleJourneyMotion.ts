/** @format */

"use client";

import type { RefObject } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useCoupleJourneyMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /*
         * INITIAL STATES
         */

        gsap.set("[data-groom-scene]", {
          autoAlpha: 0,
        });

        gsap.set("[data-union-scene]", {
          autoAlpha: 0,
        });

        gsap.set("[data-bride-name]", {
          yPercent: 110,
        });

        gsap.set("[data-groom-name]", {
          yPercent: 110,
        });

        gsap.set("[data-union-name]", {
          yPercent: 120,
        });

        gsap.set("[data-bride-portrait]", {
          clipPath: "inset(100% 0 0 0 round 45% 45% 2rem 2rem)",
          rotateY: -32,
          z: -240,
          transformOrigin: "right center",
        });

        gsap.set("[data-groom-portrait]", {
          clipPath: "inset(100% 0 0 0 round 45% 45% 2rem 2rem)",
          rotateY: 32,
          z: -240,
          transformOrigin: "left center",
        });

        gsap.set(
          ["[data-bride-role]", "[data-bride-detail]", "[data-bride-quote]"],
          {
            opacity: 0,
            y: 25,
          },
        );

        gsap.set(
          ["[data-groom-role]", "[data-groom-detail]", "[data-groom-quote]"],
          {
            opacity: 0,
            y: 25,
          },
        );

        gsap.set("[data-union-left]", {
          xPercent: -35,
          yPercent: 6,
          rotate: -7,
          opacity: 0,
        });

        gsap.set("[data-union-right]", {
          xPercent: 35,
          yPercent: -5,
          rotate: 7,
          opacity: 0,
        });

        gsap.set(
          [
            "[data-union-eyebrow]",
            "[data-union-copy]",
            "[data-union-monogram]",
            "[data-union-next]",
          ],
          {
            opacity: 0,
            y: 20,
          },
        );

        gsap.set("[data-union-rule]", {
          opacity: 0,
          scaleX: 0,
        });

        /*
         * MAIN STORY
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
         * =============================
         * BRIDE
         * =============================
         */

        story
          .to(
            "[data-bride-portrait]",
            {
              clipPath: "inset(0% 0 0 0 round 45% 45% 2rem 2rem)",

              rotateY: 0,

              z: 0,

              duration: 0.15,

              ease: "power3.out",
            },
            0.02,
          )

          .to(
            "[data-bride-letter]",
            {
              opacity: 0.75,
              xPercent: 5,

              duration: 0.17,
            },
            0.02,
          )

          .to(
            "[data-bride-role]",
            {
              opacity: 1,
              y: 0,

              duration: 0.08,

              ease: "power2.out",
            },
            0.06,
          )

          .to(
            "[data-bride-name]",
            {
              yPercent: 0,

              duration: 0.13,

              ease: "power4.out",
            },
            0.08,
          )

          .to(
            "[data-bride-detail]",
            {
              opacity: 1,
              y: 0,

              stagger: 0.015,

              duration: 0.08,

              ease: "power3.out",
            },
            0.12,
          )

          .to(
            "[data-bride-quote]",
            {
              opacity: 1,
              y: 0,

              duration: 0.09,

              ease: "power3.out",
            },
            0.16,
          )

          /*
           * Bride subtle camera.
           */

          .to(
            "[data-bride-portrait]",
            {
              yPercent: -6,
              scale: 1.035,

              duration: 0.18,
            },
            0.17,
          )

          .to(
            "[data-bride-content]",
            {
              yPercent: -4,

              duration: 0.18,
            },
            0.17,
          );

        /*
         * =============================
         * BRIDE → GROOM
         * =============================
         */

        story
          .to(
            "[data-bride-scene]",
            {
              xPercent: -16,

              opacity: 0,

              duration: 0.12,
            },
            0.31,
          )

          .to(
            "[data-groom-scene]",
            {
              autoAlpha: 1,

              duration: 0.08,
            },
            0.34,
          )

          .fromTo(
            "[data-groom-scene]",
            {
              xPercent: 12,
            },
            {
              xPercent: 0,

              duration: 0.12,

              ease: "power3.out",
            },
            0.34,
          );

        /*
         * =============================
         * GROOM
         * =============================
         */

        story
          .to(
            "[data-groom-portrait]",
            {
              clipPath: "inset(0% 0 0 0 round 45% 45% 2rem 2rem)",

              rotateY: 0,

              z: 0,

              duration: 0.15,

              ease: "power3.out",
            },
            0.37,
          )

          .to(
            "[data-groom-letter]",
            {
              opacity: 0.32,
              xPercent: -4,

              duration: 0.15,
            },
            0.38,
          )

          .to(
            "[data-groom-role]",
            {
              opacity: 1,
              y: 0,

              duration: 0.08,

              ease: "power3.out",
            },
            0.4,
          )

          .to(
            "[data-groom-name]",
            {
              yPercent: 0,

              duration: 0.13,

              ease: "power4.out",
            },
            0.42,
          )

          .to(
            "[data-groom-detail]",
            {
              opacity: 1,
              y: 0,

              stagger: 0.015,

              duration: 0.08,

              ease: "power3.out",
            },
            0.46,
          )

          .to(
            "[data-groom-quote]",
            {
              opacity: 1,
              y: 0,

              duration: 0.09,

              ease: "power3.out",
            },
            0.5,
          )

          .to(
            "[data-groom-portrait]",
            {
              yPercent: -6,
              scale: 1.035,

              duration: 0.15,
            },
            0.51,
          )

          .to(
            "[data-groom-content]",
            {
              yPercent: -4,

              duration: 0.15,
            },
            0.51,
          );

        /*
         * =============================
         * GROOM → UNION
         * =============================
         */

        story
          .to(
            "[data-groom-scene]",
            {
              opacity: 0,

              scale: 1.035,

              duration: 0.12,
            },
            0.64,
          )

          .to(
            "[data-union-scene]",
            {
              autoAlpha: 1,

              duration: 0.08,
            },
            0.66,
          );

        /*
         * =============================
         * UNION PORTRAITS
         * =============================
         */

        story
          .to(
            "[data-union-left]",
            {
              xPercent: 0,
              yPercent: 0,
              rotate: -4,
              opacity: 1,

              duration: 0.13,

              ease: "power3.out",
            },
            0.68,
          )

          .to(
            "[data-union-right]",
            {
              xPercent: 0,
              yPercent: 0,
              rotate: 4,
              opacity: 1,

              duration: 0.13,

              ease: "power3.out",
            },
            0.69,
          )

          .to(
            "[data-union-eyebrow]",
            {
              opacity: 1,
              y: 0,

              duration: 0.08,

              ease: "power2.out",
            },
            0.72,
          )

          .to(
            "[data-union-name]",
            {
              yPercent: 0,

              stagger: 0.025,

              duration: 0.13,

              ease: "power4.out",
            },
            0.74,
          )

          .fromTo(
            "[data-union-ampersand]",
            {
              opacity: 0,
              rotate: -15,
              scale: 0.5,
            },
            {
              opacity: 1,
              rotate: 0,
              scale: 1,

              duration: 0.1,

              ease: "back.out(1.5)",
            },
            0.76,
          )

          .to(
            "[data-union-rule]",
            {
              opacity: 1,
              scaleX: 1,

              duration: 0.09,

              ease: "power3.out",
            },
            0.79,
          )

          .to(
            "[data-union-copy]",
            {
              opacity: 1,
              y: 0,

              duration: 0.09,

              ease: "power3.out",
            },
            0.81,
          )

          .to(
            "[data-union-monogram]",
            {
              opacity: 1,
              y: 0,

              duration: 0.09,

              ease: "power3.out",
            },
            0.84,
          )

          .to(
            "[data-union-next]",
            {
              opacity: 1,
              y: 0,

              duration: 0.08,

              ease: "power3.out",
            },
            0.87,
          )

          /*
           * FINAL BREATH
           */

          .to(
            "[data-union-glow]",
            {
              scale: 1.12,

              duration: 0.13,
            },
            0.87,
          );

        /*
         * PROGRESS INDICATOR
         */

        gsap.fromTo(
          "[data-couple-progress]",
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
        gsap.set(
          [
            "[data-bride-scene]",
            "[data-bride-portrait]",
            "[data-bride-role]",
            "[data-bride-name]",
            "[data-bride-detail]",
            "[data-bride-quote]",
          ],
          {
            clearProps: "all",
          },
        );

        gsap.set("[data-groom-scene]", {
          display: "none",
        });

        gsap.set("[data-union-scene]", {
          display: "none",
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
