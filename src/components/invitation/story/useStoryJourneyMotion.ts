/** @format */

"use client";

import type { RefObject } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { invitation } from "@/lib/invitation";

export function useStoryJourneyMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const desktop = window.matchMedia("(min-width: 769px)").matches;

        const chapterCount = invitation.story.chapters.length;

        /*
         * =============================
         * INITIAL STATES
         * =============================
         */

        gsap.set("[data-story-intro-title]", {
          yPercent: 115,
        });

        gsap.set("[data-story-intro-small]", {
          opacity: 0,
          y: 22,
        });

        gsap.set("[data-story-intro-year]", {
          opacity: 0,
          scale: 1.06,
        });

        for (let index = 0; index < chapterCount; index++) {
          const scene = `[data-story-scene="${index}"]`;

          gsap.set(scene, {
            autoAlpha: 0,
          });

          gsap.set(`${scene} [data-story-image]`, {
            rotateY: index % 2 === 0 ? -38 : 38,
            rotateX: 12,
            z: -300,
            opacity: 0,
            transformOrigin: index % 2 === 0 ? "left center" : "right center",
          });

          gsap.set(`${scene} [data-story-title]`, {
            yPercent: 115,
          });

          gsap.set(`${scene} [data-story-year]`, {
            opacity: 0,
            yPercent: 12,
          });

          gsap.set(`${scene} [data-story-rule]`, {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "left center",
          });

          gsap.set(
            [`${scene} [data-story-meta]`, `${scene} [data-story-copy]`],
            {
              opacity: 0,
              y: 22,
            },
          );
        }

        gsap.set("[data-story-finale]", {
          autoAlpha: 0,
        });

        gsap.set("[data-finale-title]", {
          yPercent: 120,
        });

        gsap.set(["[data-finale-small]", "[data-finale-monogram]"], {
          opacity: 0,
          y: 20,
        });

        gsap.set("[data-finale-rule]", {
          opacity: 0,
          scaleX: 0,
        });

        gsap.set("[data-finale-ring]", {
          opacity: 0,
          scale: 0.7,
        });

        /*
         * =============================
         * STORY TIMELINE
         * =============================
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
         * INTRO
         */

        story
          .to(
            "[data-story-intro-small]",
            {
              opacity: 1,
              y: 0,

              stagger: 0.02,

              duration: 0.07,

              ease: "power3.out",
            },
            0.01,
          )

          .to(
            "[data-story-intro-title]",
            {
              yPercent: 0,

              duration: 0.1,

              ease: "power4.out",
            },
            0.025,
          )

          .to(
            "[data-story-intro-year]",
            {
              opacity: 1,
              scale: 1,

              duration: 0.09,

              ease: "power3.out",
            },
            0.045,
          )

          .to(
            "[data-story-intro-glow]",
            {
              scale: 1.12,

              duration: 0.12,
            },
            0.05,
          )

          .to(
            "[data-story-intro]",
            {
              opacity: 0,

              scale: 0.97,

              duration: 0.07,
            },
            0.115,
          );

        /*
         * CHAPTERS
         */

        invitation.story.chapters.forEach((chapter, index) => {
          const scene = `[data-story-scene="${index}"]`;

          const previous =
            index === 0 ? null : `[data-story-scene="${index - 1}"]`;

          const start = 0.14 + index * 0.165;

          if (previous) {
            story.to(
              previous,
              {
                opacity: 0,

                scale: 1.025,

                duration: 0.045,
              },
              start - 0.02,
            );
          }

          /*
           * Enter scene.
           */

          story
            .to(
              scene,
              {
                autoAlpha: 1,

                duration: 0.035,
              },
              start,
            )

            .to(
              `${scene} [data-story-year]`,
              {
                opacity: desktop ? 0.85 : 0.45,

                yPercent: 0,

                duration: 0.06,

                ease: "power3.out",
              },
              start + 0.005,
            )

            .to(
              `${scene} [data-story-image]`,
              {
                rotateY: 0,
                rotateX: 0,
                z: 0,
                opacity: 1,

                duration: 0.09,

                ease: "power3.out",
              },
              start + 0.015,
            )

            .to(
              `${scene} [data-story-meta]`,
              {
                opacity: 1,
                y: 0,

                stagger: 0.007,

                duration: 0.045,

                ease: "power3.out",
              },
              start + 0.035,
            )

            .to(
              `${scene} [data-story-title]`,
              {
                yPercent: 0,

                duration: 0.065,

                ease: "power4.out",
              },
              start + 0.045,
            )

            .to(
              `${scene} [data-story-rule]`,
              {
                opacity: 1,
                scaleX: 1,

                duration: 0.045,

                ease: "power3.out",
              },
              start + 0.065,
            )

            .to(
              `${scene} [data-story-copy]`,
              {
                opacity: 1,
                y: 0,

                duration: 0.05,

                ease: "power3.out",
              },
              start + 0.075,
            );

          /*
           * Editorial camera motion.
           */

          story.to(
            `${scene} [data-story-image-column]`,
            desktop
              ? {
                  xPercent: chapter.align === "left" ? 8 : -8,

                  rotateY: chapter.align === "left" ? -7 : 7,

                  scale: 1.045,

                  duration: 0.11,
                }
              : {
                  yPercent: -4,

                  rotateX: -6,

                  scale: 1.025,

                  duration: 0.11,
                },
            start + 0.075,
          );

          story.to(
            `${scene} [data-story-content]`,
            desktop
              ? {
                  xPercent: chapter.align === "left" ? -4 : 4,

                  duration: 0.11,
                }
              : {
                  yPercent: -2,

                  duration: 0.11,
                },
            start + 0.075,
          );

          /*
           * Year drifts independently.
           */

          story.to(
            `${scene} [data-story-year]`,
            {
              xPercent: chapter.align === "left" ? -5 : 5,

              scale: 1.035,

              duration: 0.11,
            },
            start + 0.075,
          );

          /*
           * Background light movement.
           */

          story.to(
            `${scene} [data-story-glow]`,
            {
              xPercent: chapter.align === "left" ? 12 : -12,

              scale: 1.15,

              duration: 0.11,
            },
            start + 0.075,
          );
        });

        /*
         * LAST CHAPTER OUT
         */

        const lastIndex = chapterCount - 1;

        story.to(
          `[data-story-scene="${lastIndex}"]`,
          {
            opacity: 0,

            scale: 1.025,

            duration: 0.055,
          },
          0.81,
        );

        /*
         * FINALE
         */

        story
          .to(
            "[data-story-finale]",
            {
              autoAlpha: 1,

              duration: 0.05,
            },
            0.83,
          )

          .to(
            "[data-finale-ring]",
            {
              opacity: 1,
              scale: 1,

              duration: 0.08,

              ease: "power4.out",
            },
            0.84,
          )

          .to(
            "[data-finale-monogram]",
            {
              opacity: 1,
              y: 0,

              duration: 0.06,

              ease: "power3.out",
            },
            0.855,
          )

          .to(
            "[data-finale-small]",
            {
              opacity: 1,
              y: 0,

              stagger: 0.015,

              duration: 0.06,

              ease: "power3.out",
            },
            0.865,
          )

          .to(
            "[data-finale-title]",
            {
              yPercent: 0,

              duration: 0.085,

              ease: "power4.out",
            },
            0.88,
          )

          .to(
            "[data-finale-rule]",
            {
              opacity: 1,
              scaleX: 1,

              duration: 0.055,

              ease: "power3.out",
            },
            0.91,
          )

          .to(
            "[data-finale-sun]",
            {
              scale: 1.12,

              duration: 0.08,
            },
            0.92,
          );

        /*
         * GLOBAL PROGRESS
         */

        gsap.fromTo(
          "[data-story-progress]",
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

        gsap.fromTo(
          "[data-story-rail]",
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
          ["[data-story-intro]", "[data-story-scene]", "[data-story-finale]"],
          {
            clearProps: "all",
          },
        );

        gsap.set(
          [
            "[data-story-image]",
            "[data-story-title]",
            "[data-story-meta]",
            "[data-story-copy]",
            "[data-story-rule]",
            "[data-story-year]",
            "[data-finale-title]",
            "[data-finale-small]",
            "[data-finale-ring]",
            "[data-finale-rule]",
          ],
          {
            clearProps: "all",
          },
        );
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
