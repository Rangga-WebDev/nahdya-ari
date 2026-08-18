/** @format */

"use client";

import type { RefObject } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useGalleryMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /*
       * =============================
       * DESKTOP — CINEMATIC RAIL
       * =============================
       */

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = scope.current?.querySelector<HTMLElement>(
            "[data-gallery-rail-track]",
          );

          if (!track) return;

          gsap.set("[data-gallery-intro-title]", { yPercent: 115 });

          gsap.set("[data-gallery-intro-small]", { opacity: 0, y: 24 });

          gsap.set("[data-gallery-rail]", { autoAlpha: 0 });

          gsap.set("[data-gallery-finale]", { autoAlpha: 0 });

          gsap.set("[data-gallery-finale-title]", { yPercent: 120 });

          gsap.set("[data-gallery-finale-small]", { opacity: 0, y: 20 });

          gsap.set("[data-gallery-finale-rule]", { opacity: 0, scaleX: 0 });

          gsap.set("[data-gallery-finale-arch]", { opacity: 0, scale: 0.86 });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },

            scrollTrigger: {
              trigger: scope.current,

              start: "top top",

              end: "bottom bottom",

              scrub: 1.1,

              invalidateOnRefresh: true,
            },
          });

          /*
           * INTRO — 0% to 15%
           */

          timeline
            .to(
              "[data-gallery-intro-small]",
              {
                opacity: 1,
                y: 0,
                stagger: 0.015,
                duration: 0.05,
                ease: "power3.out",
              },
              0.01,
            )

            .to(
              "[data-gallery-intro-title]",
              { yPercent: 0, duration: 0.08, ease: "power4.out" },
              0.02,
            )

            .to(
              "[data-gallery-intro-glow]",
              { scale: 1.25, opacity: 0.85, duration: 0.11 },
              0.03,
            )

            .to(
              "[data-gallery-intro]",
              { autoAlpha: 0, scale: 0.97, duration: 0.05 },
              0.14,
            );

          /*
           * RAIL — 15% to 82%
           */

          timeline
            .to("[data-gallery-rail]", { autoAlpha: 1, duration: 0.04 }, 0.16)

            .fromTo(
              track,
              { x: 0 },
              {
                x: () => -Math.max(0, track.scrollWidth - window.innerWidth),

                duration: 0.52,
              },
              0.25,
            )

            .to("[data-gallery-rail]", { autoAlpha: 0, duration: 0.04 }, 0.78);

          /*
           * FINALE — 82% to 100%
           */

          timeline
            .to("[data-gallery-finale]", { autoAlpha: 1, duration: 0.04 }, 0.82)

            .to(
              "[data-gallery-finale-arch]",
              { opacity: 1, scale: 1, duration: 0.09, ease: "power4.out" },
              0.83,
            )

            .to(
              "[data-gallery-finale-title]",
              { yPercent: 0, duration: 0.08, ease: "power4.out" },
              0.855,
            )

            .to(
              "[data-gallery-finale-rule]",
              { opacity: 1, scaleX: 1, duration: 0.05, ease: "power3.out" },
              0.89,
            )

            .to(
              "[data-gallery-finale-small]",
              {
                opacity: 1,
                y: 0,
                stagger: 0.02,
                duration: 0.06,
                ease: "power3.out",
              },
              0.9,
            )

            .to(
              "[data-gallery-finale-light]",
              { scale: 1.16, duration: 0.1 },
              0.92,
            );
        },
      );

      /*
       * =============================
       * MOBILE / TABLET — VERTICAL
       * =============================
       */

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const reveal = (target: string, vars: gsap.TweenVars) => {
            const elements = scope.current?.querySelectorAll(target);

            if (!elements || elements.length === 0) return;

            gsap.from(elements, {
              ...vars,

              scrollTrigger: {
                trigger: elements[0],

                start: "top 88%",

                toggleActions: "play none none none",
              },
            });
          };

          reveal("[data-gallery-intro-title]", {
            yPercent: 110,
            duration: 1.1,
            ease: "power4.out",
          });

          reveal("[data-gallery-intro-small]", {
            opacity: 0,
            y: 22,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
          });

          const cards = gsap.utils.toArray<HTMLElement>("[data-gallery-card]");

          cards.forEach((card, index) => {
            const frame = card.querySelector("[data-gallery-card-frame]");

            const caption = card.querySelector("[data-gallery-card-caption]");

            const media = card.querySelector("[data-gallery-card-media]");

            /* Alternate the hinge so the rail never feels repetitive. */
            const fromLeft = index % 2 === 0;

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: card,

                start: "top 85%",

                toggleActions: "play none none none",
              },
            });

            if (frame) {
              timeline.fromTo(
                frame,
                {
                  rotateY: fromLeft ? -34 : 34,
                  rotateX: 14,
                  rotateZ: fromLeft ? -4 : 4,
                  z: -260,
                  opacity: 0,
                  transformOrigin: fromLeft ? "left center" : "right center",
                },
                {
                  rotateY: 0,
                  rotateX: 0,
                  rotateZ: 0,
                  z: 0,
                  opacity: 1,
                  duration: 1.5,
                  ease: "power3.out",
                },
                0,
              );
            }

            if (media) {
              timeline.fromTo(
                media,
                { scale: 1.22 },
                { scale: 1, duration: 1.7, ease: "power3.out" },
                0,
              );
            }

            if (caption) {
              timeline.fromTo(
                caption,
                { opacity: 0, y: 20, rotateX: -22 },
                {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  duration: 0.9,
                  ease: "power3.out",
                },
                0.4,
              );
            }

            /* Keeps tilting gently while the card travels through the viewport. */
            gsap.fromTo(
              card,
              { rotateZ: fromLeft ? 1.6 : -1.6 },
              {
                rotateZ: fromLeft ? -1.6 : 1.6,

                ease: "none",

                scrollTrigger: {
                  trigger: card,

                  start: "top bottom",

                  end: "bottom top",

                  scrub: 1.2,
                },
              },
            );
          });

          reveal("[data-gallery-finale-title]", {
            yPercent: 115,
            duration: 1.1,
            ease: "power4.out",
          });

          reveal("[data-gallery-finale-small]", {
            opacity: 0,
            y: 20,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
          });

          reveal("[data-gallery-finale-rule]", {
            opacity: 0,
            scaleX: 0,
            duration: 0.9,
            ease: "power3.out",
          });
        },
      );

      /*
       * =============================
       * REDUCED MOTION
       * =============================
       */

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            "[data-gallery-intro]",
            "[data-gallery-rail]",
            "[data-gallery-rail-track]",
            "[data-gallery-finale]",
            "[data-gallery-card-frame]",
            "[data-gallery-card-caption]",
            "[data-gallery-intro-title]",
            "[data-gallery-intro-small]",
            "[data-gallery-finale-title]",
            "[data-gallery-finale-small]",
            "[data-gallery-finale-rule]",
            "[data-gallery-finale-arch]",
          ],
          { clearProps: "all" },
        );
      });
    },
    { scope },
  );
}
