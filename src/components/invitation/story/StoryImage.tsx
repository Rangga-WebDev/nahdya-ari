/** @format */

import Image from "next/image";

import type { LoveStoryChapter } from "@/types/invitation";

import styles from "./StoryJourney.module.css";

type StoryImageProps = {
  chapter: LoveStoryChapter;
  index: number;
};

export function StoryImage({ chapter, index }: StoryImageProps) {
  return (
    <div className={styles.imageFrame} data-story-image>
      <div className={styles.imageInner}>
        {chapter.image ? (
          <Image
            src={chapter.image}
            alt={chapter.title}
            fill
            sizes="
              (max-width: 768px) 84vw,
              48vw
            "
            className={styles.storyImage}
          />
        ) : (
          <div
            className={`${styles.imageFallback} ${
              styles[`fallback${capitalize(chapter.tone)}`]
            }`}
          >
            <span className={styles.fallbackYear}>{chapter.year}</span>

            <span className={styles.fallbackNumber}>0{index + 1}</span>
          </div>
        )}

        <div className={styles.imageOverlay} aria-hidden="true" />

        <div className={styles.imageGrain} aria-hidden="true" />
      </div>

      <span className={styles.imageIndex}>0{index + 1}</span>
    </div>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
