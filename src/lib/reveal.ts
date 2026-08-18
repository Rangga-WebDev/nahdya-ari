/** @format */

import type gsap from "gsap";

type Vars = gsap.TweenVars;

/**
 * Editorial motion language.
 *
 * Deliberately has no "drop in from above" recipe. Entrances are made of
 * crops, masks, blur, micro-scale and horizontal shift — never a 60px vertical
 * fall, which is what makes a page read as a generic template.
 *
 * `EASE` matches cubic-bezier(0.16, 1, 0.3, 1) closely enough to be
 * indistinguishable, and avoids pulling in the CustomEase plugin.
 */
export const EASE = "expo.out";
export const EASE_SOFT = "power3.out";

/** Content wipes up behind a moving clip edge. The workhorse. */
export function clipUp(overrides: Vars = {}): Vars {
  return {
    clipPath: "inset(0% 0% 100% 0%)",
    duration: 1.25,
    ease: EASE,
    ...overrides,
  };
}

/** Same idea, revealed from the left. Good for rules and captions. */
export function clipIn(overrides: Vars = {}): Vars {
  return {
    clipPath: "inset(0% 100% 0% 0%)",
    duration: 1.15,
    ease: EASE,
    ...overrides,
  };
}

/**
 * Heading reveal: comes out of soft focus with the tracking closing up.
 * Reserved for headings — blur repaints, so it must stay rare.
 */
export function blurIn(overrides: Vars = {}): Vars {
  return {
    opacity: 0,
    filter: "blur(9px)",
    letterSpacing: "0.14em",
    duration: 1.3,
    ease: EASE_SOFT,
    ...overrides,
  };
}

/** Supporting copy. A whisper of movement, never a leap. */
export function drift(overrides: Vars = {}): Vars {
  return {
    opacity: 0,
    y: 8,
    duration: 1,
    ease: EASE_SOFT,
    ...overrides,
  };
}

/** Lateral entrance — an alternative to vertical for asymmetric layouts. */
export function slide(
  from: "left" | "right" = "left",
  overrides: Vars = {},
): Vars {
  return {
    opacity: 0,
    x: from === "left" ? -28 : 28,
    duration: 1.15,
    ease: EASE,
    ...overrides,
  };
}

/** A rule drawing itself out from one end. */
export function draw(origin = "left center", overrides: Vars = {}): Vars {
  return {
    scaleX: 0,
    transformOrigin: origin,
    duration: 1.2,
    ease: EASE,
    ...overrides,
  };
}

/** Micro-scale settle for plates and cards. No translation at all. */
export function settle(overrides: Vars = {}): Vars {
  return {
    opacity: 0,
    scale: 1.04,
    duration: 1.2,
    ease: EASE,
    ...overrides,
  };
}

/** Words rising out of their own mask. Requires a clipping parent. */
export function lineRise(overrides: Vars = {}): Vars {
  return {
    yPercent: 105,
    duration: 1.15,
    ease: EASE,
    ...overrides,
  };
}

/** Scrubbed drift, expressed in percent of the element's own height. */
export function parallax(trigger: Element, strength = 8, scrub = 1.1) {
  return {
    from: { yPercent: -strength },
    to: {
      yPercent: strength,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub,
      },
    } as Vars,
  };
}
