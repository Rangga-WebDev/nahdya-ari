/** @format */

export const motion = {
  duration: {
    instant: 0.2,
    fast: 0.45,
    normal: 0.8,
    slow: 1.2,
    cinematic: 1.8,
    dramatic: 2.4,
  },

  ease: {
    enter: "power3.out",
    leave: "power2.in",
    cinematic: "power4.out",
    smooth: "power2.inOut",
    elastic: "back.out(1.4)",
  },

  distance: {
    xs: 8,
    sm: 16,
    md: 32,
    lg: 64,
    xl: 120,
  },

  stagger: {
    tight: 0.04,
    normal: 0.08,
    relaxed: 0.14,
    dramatic: 0.22,
  },
} as const;
