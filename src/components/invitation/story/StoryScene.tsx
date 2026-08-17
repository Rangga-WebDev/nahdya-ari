/** @format */

import type { LoveStoryChapter } from "@/types/invitation";

import { StoryImage } from "./StoryImage";

import styles from "./StoryJourney.module.css";

type StorySceneProps = {
  chapter: LoveStoryChapter;
  index: number;
};

export function StoryScene({ chapter, index }: StorySceneProps) {
  const isLeft = chapter.align === "left";

  return (
    <article
      className={`
        ${styles.storyLayer}
        ${styles.chapterScene}
        ${styles[`tone${capitalize(chapter.tone)}`]}
      `}
      data-story-scene={index}
    >
      <div className={styles.chapterGlow} data-story-glow aria-hidden="true" />

      <div className={styles.giantStoryYear} data-story-year aria-hidden="true">
        {chapter.year}
      </div>

      <div
        className={`
          ${styles.storyGrid}
          ${isLeft ? styles.alignLeft : styles.alignRight}
        `}
      >
        <div className={styles.imageColumn} data-story-image-column>
          <StoryImage chapter={chapter} index={index} />
        </div>

        <div className={styles.storyContent} data-story-content>
          <span className={styles.chapterNumber} data-story-meta>
            0{index + 1}
          </span>

          <p className={styles.chapterEyebrow} data-story-meta>
            {chapter.eyebrow}
          </p>

          <div className={styles.chapterTitleMask}>
            <h3 className={styles.chapterTitle} data-story-title>
              {chapter.title}
            </h3>
          </div>

          <div className={styles.storyRule} data-story-rule>
            <span />
            <i />
          </div>

          <p className={styles.storyBody} data-story-copy>
            {chapter.story}
          </p>

          <div className={styles.storyMeta} data-story-meta>
            {chapter.date && <span>{chapter.date}</span>}

            {chapter.location && (
              <>
                <i />

                <span>{chapter.location}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <span className={styles.edgeYear} data-story-meta>
        {chapter.year}
      </span>
    </article>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
