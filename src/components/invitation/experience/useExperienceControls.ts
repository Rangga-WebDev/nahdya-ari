/** @format */

"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { useLenis } from "lenis/react";

import { invitation } from "@/lib/invitation";

import { readGuestNameFromLocation } from "@/lib/guest";

/* =========================================================
   GUEST
   ========================================================= */

export function useGuestName() {
  return useSyncExternalStore(
    subscribeToLocation,
    readClientGuestName,
    () => null,
  );
}

function subscribeToLocation(onChange: () => void) {
  window.addEventListener("popstate", onChange);

  return () => window.removeEventListener("popstate", onChange);
}

function readClientGuestName() {
  return readGuestNameFromLocation(invitation.experience.guestParameter);
}

/* =========================================================
   MUSIC
   ========================================================= */

export type MusicState = "loading" | "paused" | "playing" | "unavailable";

export function useWeddingMusic() {
  const config = invitation.experience.music;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [state, setState] = useState<MusicState>(
    config.enabled ? "loading" : "unavailable",
  );

  /** Once the guest pauses on purpose, stop trying to start playback for them. */
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (!config.enabled) return;

    const audio = new Audio(config.src);

    audio.loop = true;

    audio.preload = "auto";

    audio.volume = 0.45;

    audioRef.current = audio;

    const onReady = () =>
      setState((current) => (current === "loading" ? "paused" : current));

    const onPlay = () => setState("playing");

    const onPause = () =>
      setState((current) => (current === "unavailable" ? current : "paused"));

    const onError = () => setState("unavailable");

    audio.addEventListener("canplaythrough", onReady);
    audio.addEventListener("loadedmetadata", onReady);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    /*
     * Browsers reject audio playback until the page has been interacted with,
     * so the optimistic attempt below usually fails on a first visit. The
     * gesture listeners then start the song at the guest's first tap, scroll or
     * key press, and detach as soon as playback actually begins.
     */
    const gestures = ["pointerdown", "touchend", "keydown"] as const;

    const detachGestures = () => {
      gestures.forEach((event) =>
        window.removeEventListener(event, attemptAutoplay),
      );
    };

    function attemptAutoplay() {
      if (dismissedRef.current) return;

      if (!audio.paused) return;

      audio
        .play()
        .then(detachGestures)
        .catch(() => {
          /* Still blocked: keep waiting for the next gesture. */
        });
    }

    gestures.forEach((event) =>
      window.addEventListener(event, attemptAutoplay, { passive: true }),
    );

    attemptAutoplay();

    return () => {
      detachGestures();

      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("loadedmetadata", onReady);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);

      audio.pause();

      audio.src = "";

      audioRef.current = null;
    };
  }, [config.enabled, config.src]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || state === "unavailable") return;

    if (!audio.paused) {
      dismissedRef.current = true;

      audio.pause();

      return;
    }

    dismissedRef.current = false;

    try {
      await audio.play();
    } catch {
      // Autoplay policy or a missing asset: stay paused, never retry in a loop.
      setState((current) => (current === "playing" ? "paused" : current));
    }
  }, [state]);

  return { state, toggle };
}

/* =========================================================
   CHAPTER NAVIGATION
   ========================================================= */

export function useChapterNavigation() {
  const chapters = useMemo(() => invitation.experience.chapters, []);

  const lenis = useLenis();

  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveId(visible.target.id);
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [chapters]);

  const goTo = useCallback(
    (id: string) => {
      const target = document.getElementById(id);

      if (!target) return;

      if (lenis) {
        lenis.scrollTo(target, { offset: 0, duration: 1.6 });

        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [lenis],
  );

  return { chapters, activeId, goTo };
}
