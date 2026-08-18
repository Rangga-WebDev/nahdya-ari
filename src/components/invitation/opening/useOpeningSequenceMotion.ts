/** @format */

"use client";

import type { RefObject } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { motion } from "@/lib/motion";

export function useOpeningSequenceMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /*
       * ==========================================
       * FULL MOTION EXPERIENCE
       * ==========================================
       */

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /*
         * INITIAL STATES
         */

        gsap.set("[data-hero-title-word]", {
          yPercent: 115,
        });

        gsap.set("[data-opening-sacred]", {
          autoAlpha: 0,
          scale: 1.035,
        });

        gsap.set("[data-sacred-title]", {
          yPercent: 120,
        });

        gsap.set(
          [
            "[data-sacred-eyebrow]",
            "[data-sacred-monogram]",
            "[data-sacred-closing]",
            "[data-sacred-signature]",
            "[data-sacred-chapter]",
          ],
          {
            opacity: 0,
            y: 22,
          },
        );

        gsap.set("[data-sacred-verse]", {
          opacity: 0,
          y: 34,
          scale: 0.96,
        });

        gsap.set("[data-sacred-divider]", {
          opacity: 0,
          scaleX: 0,
        });

        gsap.set("[data-sacred-arch]", {
          opacity: 0,
          scale: 0.92,
        });

        /*
         * ==========================================
         * PAGE LOAD HERO ENTRANCE
         * ==========================================
         */

        const entrance = gsap.timeline({
          defaults: {
            ease: motion.ease.cinematic,
          },
        });

        entrance
          .from("[data-hero-sky]", {
            opacity: 0,
            scale: 1.08,
            duration: 2.15,
          })

          .from(
            "[data-hero-sun]",
            {
              opacity: 0,
              scale: 0.65,
              duration: 2,
            },
            0.15,
          )

          .from(
            "[data-hero-background]",
            {
              opacity: 0,
              yPercent: 8,
              scale: 1.04,
              duration: 1.8,
            },
            0.3,
          )

          .from(
            "[data-hero-palace]",
            {
              opacity: 0,
              y: 48,
              scale: 0.95,
              duration: 1.8,
            },
            0.48,
          )

          .from(
            "[data-hero-mid]",
            {
              opacity: 0,
              yPercent: 11,
              duration: 1.7,
            },
            0.57,
          )

          .from(
            "[data-hero-mid-botanical]",
            {
              opacity: 0,
              yPercent: 12,
              scale: 1.06,
              duration: 1.7,
            },
            0.63,
          )

          .from(
            "[data-hero-foreground]",
            {
              opacity: 0,
              scale: 1.13,
              duration: 2,
            },
            0.65,
          )

          .from(
            "[data-hero-eyebrow]",
            {
              opacity: 0,
              y: 16,
              duration: 0.9,
            },
            0.82,
          )

          .to(
            "[data-hero-title-word]",
            {
              yPercent: 0,

              duration: 1.5,

              stagger: motion.stagger.relaxed,
            },
            0.95,
          )

          .from(
            "[data-hero-ampersand]",
            {
              opacity: 0,
              scale: 0.55,
              rotate: -10,

              duration: 1,
            },
            1.28,
          )

          .from(
            "[data-hero-ornament]",
            {
              scaleX: 0,

              duration: 1.15,

              stagger: 0.08,
            },
            1.3,
          )

          .from(
            "[data-hero-date]",
            {
              opacity: 0,
              y: 18,

              duration: 0.9,
            },
            1.48,
          )

          .from(
            "[data-scroll-cue]",
            {
              opacity: 0,
              y: 15,

              duration: 0.9,
            },
            1.72,
          );

        /*
         * ==========================================
         * AMBIENT PETALS
         * ==========================================
         */

        gsap.utils
          .toArray<HTMLElement>("[data-petal]")
          .forEach((petal, index) => {
            gsap.to(petal, {
              y: 55 + index * 17,

              x: index % 2 === 0 ? 24 : -18,

              rotation: index % 2 === 0 ? 42 : -38,

              duration: 5.2 + index * 0.7,

              ease: "sine.inOut",

              repeat: -1,

              yoyo: true,
            });
          });

        /*
         * ==========================================
         * AMBIENT BREATHING
         *
         * Continuous loops that keep the sacred frame
         * alive independently of the scroll position.
         * ==========================================
         */

        gsap.to("[data-sacred-glow]", {
          opacity: 0.72,

          scale: 1.14,

          duration: 4.6,

          ease: "sine.inOut",

          repeat: -1,

          yoyo: true,
        });

        gsap.to("[data-sacred-monogram]", {
          scale: 1.045,

          duration: 3.4,

          ease: "sine.inOut",

          repeat: -1,

          yoyo: true,
        });

        gsap.to("[data-sacred-arch]", {
          scale: 1.018,

          duration: 6.5,

          ease: "sine.inOut",

          repeat: -1,

          yoyo: true,
        });

        gsap.to("[data-sacred-decoration-left]", {
          rotate: 2.2,

          yPercent: -2,

          duration: 7,

          ease: "sine.inOut",

          repeat: -1,

          yoyo: true,
        });

        gsap.to("[data-sacred-decoration-right]", {
          rotate: -2.2,

          yPercent: -2,

          duration: 7.6,

          ease: "sine.inOut",

          repeat: -1,

          yoyo: true,
        });

        gsap.to("[data-hero-sun]", {
          scale: 1.12,

          opacity: 0.82,

          duration: 5.4,

          ease: "sine.inOut",

          repeat: -1,

          yoyo: true,
        });

        gsap.to("[data-hero-haze]", {
          xPercent: 4,

          duration: 9,

          ease: "sine.inOut",

          repeat: -1,

          yoyo: true,
        });

        /*
         * ==========================================
         * SCROLL STORY
         * ==========================================
         */

        const story = gsap.timeline({
          defaults: {
            ease: "none",
          },

          scrollTrigger: {
            trigger: scope.current,

            start: "top top",

            end: "bottom bottom",

            scrub: 1.15,

            invalidateOnRefresh: true,
          },
        });

        /*
         * PHASE 01
         *
         * Enter the garden.
         */

        story
          .to(
            "[data-hero-background]",
            {
              yPercent: -4,
              scale: 1.04,

              duration: 0.34,
            },
            0,
          )

          .to(
            "[data-hero-mid]",
            {
              yPercent: 9,
              scale: 1.04,

              duration: 0.34,
            },
            0,
          )

          .to(
            "[data-hero-mid-botanical]",
            {
              yPercent: 13,
              scale: 1.07,

              duration: 0.34,
            },
            0,
          )

          .to(
            "[data-hero-foreground]",
            {
              yPercent: 15,
              scale: 1.1,

              duration: 0.34,
            },
            0,
          )

          .to(
            "[data-hero-content]",
            {
              yPercent: -9,

              duration: 0.34,
            },
            0,
          )

          .to(
            "[data-scroll-cue]",
            {
              opacity: 0,
              y: 25,

              duration: 0.12,
            },
            0,
          );

        /*
         * PHASE 02
         *
         * Garden opens.
         */

        story
          .to(
            "[data-botanical-left]",
            {
              xPercent: -34,
              yPercent: 9,
              rotate: -3,

              duration: 0.33,
            },
            0.24,
          )

          .to(
            "[data-botanical-right]",
            {
              xPercent: 34,
              yPercent: 9,
              rotate: 3,

              duration: 0.33,
            },
            0.24,
          )

          .to(
            "[data-hero-content]",
            {
              yPercent: -20,

              scale: 0.96,

              opacity: 0,

              duration: 0.26,
            },
            0.29,
          )

          .to(
            "[data-hero-palace]",
            {
              yPercent: 15,

              scale: 0.94,

              opacity: 0.22,

              duration: 0.31,
            },
            0.29,
          )

          .to(
            "[data-hero-haze]",
            {
              opacity: 0.88,

              yPercent: -15,

              scale: 1.22,

              duration: 0.32,
            },
            0.29,
          );

        /*
         * PHASE 03
         *
         * Light takes over.
         */

        story
          .to(
            "[data-transition-mist]",
            {
              opacity: 1,

              yPercent: -18,

              duration: 0.24,
            },
            0.38,
          )

          .to(
            "[data-transition-light]",
            {
              opacity: 1,

              scale: 5.5,

              duration: 0.3,
            },
            0.39,
          )

          .to(
            "[data-opening-hero]",
            {
              opacity: 0,

              scale: 1.035,

              duration: 0.18,
            },
            0.48,
          );

        /*
         * PHASE 04
         *
         * Sacred chapter enters.
         */

        story
          .to(
            "[data-opening-sacred]",
            {
              autoAlpha: 1,

              scale: 1,

              duration: 0.22,
            },
            0.51,
          )

          .to(
            "[data-transition-light]",
            {
              opacity: 0,

              scale: 7,

              duration: 0.22,
            },
            0.54,
          )

          .to(
            "[data-transition-mist]",
            {
              opacity: 0,

              duration: 0.2,
            },
            0.55,
          );

        /*
         * PHASE 05
         *
         * Sacred frame.
         */

        story
          .to(
            "[data-sacred-arch]",
            {
              opacity: 1,

              scale: 1,

              duration: 0.18,

              ease: "power2.out",
            },
            0.57,
          )

          .fromTo(
            "[data-sacred-decoration-left]",
            {
              xPercent: -25,
              opacity: 0,
            },
            {
              xPercent: 0,
              opacity: 1,

              duration: 0.18,

              ease: "power2.out",
            },
            0.59,
          )

          .fromTo(
            "[data-sacred-decoration-right]",
            {
              xPercent: 25,
              opacity: 0,
            },
            {
              xPercent: 0,
              opacity: 1,

              duration: 0.18,

              ease: "power2.out",
            },
            0.59,
          );

        /*
         * PHASE 06
         *
         * Sacred typography choreography.
         */

        story
          .to(
            "[data-sacred-eyebrow]",
            {
              opacity: 1,
              y: 0,

              duration: 0.12,

              ease: "power2.out",
            },
            0.62,
          )

          .to(
            "[data-sacred-monogram]",
            {
              opacity: 1,
              y: 0,

              duration: 0.13,

              ease: "power3.out",
            },
            0.64,
          )

          .to(
            "[data-sacred-title]",
            {
              yPercent: 0,

              duration: 0.18,

              ease: "power4.out",
            },
            0.66,
          )

          .to(
            "[data-sacred-divider]",
            {
              opacity: 1,
              scaleX: 1,

              duration: 0.15,

              ease: "power3.out",
            },
            0.71,
          )

          .to(
            "[data-sacred-verse]",
            {
              opacity: 1,
              y: 0,
              scale: 1,

              duration: 0.19,

              ease: "power3.out",
            },
            0.73,
          )

          .to(
            "[data-sacred-closing]",
            {
              opacity: 1,
              y: 0,

              duration: 0.14,

              ease: "power3.out",
            },
            0.77,
          )

          .to(
            "[data-sacred-signature]",
            {
              opacity: 1,
              y: 0,

              duration: 0.13,

              ease: "power3.out",
            },
            0.8,
          )

          .to(
            "[data-sacred-chapter]",
            {
              opacity: 1,
              y: 0,

              duration: 0.13,

              ease: "power3.out",
            },
            0.83,
          );

        /*
         * Small breathing motion at end.
         */

        story.to(
          "[data-sacred-glow]",
          {
            scale: 1.08,

            duration: 0.17,
          },
          0.83,
        );
      });

      /*
       * ==========================================
       * REDUCED MOTION
       * ==========================================
       */

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-opening-hero]", {
          autoAlpha: 0,
        });

        gsap.set("[data-opening-sacred]", {
          autoAlpha: 1,
        });

        gsap.set(
          [
            "[data-sacred-root]",
            "[data-sacred-arch]",
            "[data-sacred-eyebrow]",
            "[data-sacred-monogram]",
            "[data-sacred-title]",
            "[data-sacred-divider]",
            "[data-sacred-verse]",
            "[data-sacred-closing]",
            "[data-sacred-signature]",
            "[data-sacred-chapter]",
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
