/** @format */

"use client";

import { useRef } from "react";

import { invitation } from "@/lib/invitation";

import { StoryIntro } from "./StoryIntro";

import { StoryScene } from "./StoryScene";

import { StoryFinale } from "./StoryFinale";

import { useStoryJourneyMotion } from "./useStoryJourneyMotion";

import styles from "./StoryJourney.module.css";

export function StoryJourney() {
  const scope = useRef<HTMLElement>(null);

  useStoryJourneyMotion(scope);

  return (
    <section
      ref={scope}
      id="story"
      className={styles.journey}
      data-story-journey
    >
      <div className={styles.stage}>
        <StoryIntro />

        {invitation.story.chapters.map((chapter, index) => (
          <StoryScene key={chapter.id} chapter={chapter} index={index} />
        ))}

        <StoryFinale />

        <div className={styles.storyProgress} aria-hidden="true">
          <span>V</span>

          <div className={styles.storyProgressTrack}>
            <span data-story-progress />
          </div>

          <span>VI</span>
        </div>

        <div className={styles.timelineRail} aria-hidden="true">
          <span className={styles.timelineRailFill} data-story-rail />
        </div>
      </div>
    </section>
  );
}
