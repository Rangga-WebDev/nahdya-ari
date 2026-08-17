/** @format */

import Image from "next/image";

import type { GalleryItem } from "@/types/invitation";

import styles from "./GalleryJourney.module.css";

type GalleryCardProps = {
  item: GalleryItem;
  index: number;
  onOpen: (index: number) => void;
};

export function GalleryCard({ item, index, onOpen }: GalleryCardProps) {
  const number = (index + 1).toString().padStart(2, "0");

  const meta = [item.year, item.location].filter(Boolean).join(" · ");

  return (
    <figure
      className={`${styles.card} ${styles[`card${capitalize(item.size)}`]}`}
      data-gallery-card={index}
    >
      <button
        type="button"
        className={styles.cardTrigger}
        onClick={() => onOpen(index)}
        aria-label={`Open memory ${number} — ${item.alt}`}
      >
        <span className={styles.cardFrame} data-gallery-card-frame>
          <span className={styles.cardMedia} data-gallery-card-media>
            {item.image ? (
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 1023px) 82vw, 30vw"
                className={styles.cardImage}
                style={{
                  objectPosition: item.objectPosition ?? "50% 50%",
                }}
              />
            ) : (
              <GalleryFallback number={number} />
            )}
          </span>

          <span className={styles.cardVeil} aria-hidden="true" />

          <span className={styles.cardGrain} aria-hidden="true" />

          <span className={styles.cardView} aria-hidden="true">
            View
          </span>
        </span>
      </button>

      <figcaption className={styles.cardCaption} data-gallery-card-caption>
        <span className={styles.cardIndex}>{number}</span>

        {item.caption ? (
          <span className={styles.cardText}>{item.caption}</span>
        ) : null}

        {meta ? <span className={styles.cardMeta}>{meta}</span> : null}
      </figcaption>
    </figure>
  );
}

function GalleryFallback({ number }: { number: string }) {
  return (
    <span className={styles.cardFallback} aria-hidden="true">
      <span className={styles.fallbackArch} />

      <span className={styles.fallbackNumber}>{number}</span>
    </span>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
