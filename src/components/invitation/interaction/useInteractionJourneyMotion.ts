/** @format */

"use client";

import type { RefObject } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useInteractionJourneyMotion(
  scope: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scenes = gsap.utils.toArray<HTMLElement>(
          "[data-interaction-scene]",
        );

        scenes.forEach((scene) => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: scene,

              start: "top 78%",

              toggleActions: "play none none none",
            },
          });

          const smalls = scene.querySelectorAll("[data-interaction-small]");

          const title = scene.querySelector("[data-interaction-title]");

          const rule = scene.querySelector("[data-interaction-rule]");

          const panels = scene.querySelectorAll("[data-interaction-panel]");

          const gifts = scene.querySelectorAll("[data-interaction-gift]");

          if (smalls.length) {
            timeline.fromTo(
              smalls,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.9,
                ease: "power3.out",
              },
              0,
            );
          }

          if (title) {
            timeline.fromTo(
              title,
              { yPercent: 115 },
              { yPercent: 0, duration: 1.1, ease: "power4.out" },
              0.05,
            );
          }

          if (rule) {
            timeline.fromTo(
              rule,
              { opacity: 0, scaleX: 0 },
              { opacity: 1, scaleX: 1, duration: 0.9, ease: "power3.out" },
              0.25,
            );
          }

          if (panels.length) {
            timeline.fromTo(
              panels,
              { opacity: 0, y: 34 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.12,
                duration: 1,
                ease: "power3.out",
              },
              0.3,
            );
          }

          if (gifts.length) {
            timeline.fromTo(
              gifts,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.9,
                ease: "power3.out",
              },
              0.35,
            );
          }
        });

        gsap.fromTo(
          "[data-interaction-veil]",
          { opacity: 1 },
          {
            opacity: 0,

            ease: "none",

            scrollTrigger: {
              trigger: scope.current,

              start: "top bottom",

              end: "top 40%",

              scrub: true,

              invalidateOnRefresh: true,
            },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            "[data-interaction-small]",
            "[data-interaction-title]",
            "[data-interaction-rule]",
            "[data-interaction-panel]",
            "[data-interaction-gift]",
            "[data-interaction-veil]",
          ],
          { clearProps: "all" },
        );
      });
    },
    { scope },
  );
}
