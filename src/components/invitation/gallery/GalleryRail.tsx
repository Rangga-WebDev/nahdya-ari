/** @format */

import { invitation } from "@/lib/invitation";

import { GalleryCard } from "./GalleryCard";

import styles from "./GalleryJourney.module.css";

type GalleryRailProps = {
  onOpen: (index: number) => void;
};

export function GalleryRail({ onOpen }: GalleryRailProps) {
  const items = invitation.gallery.items;

  return (
    <div className={`${styles.layer} ${styles.railScene}`} data-gallery-rail>
      <div className={styles.railTrack} data-gallery-rail-track>
        <div className={styles.railLead} aria-hidden="true">
          <span className={styles.railLeadLine} />

          <span className={styles.railLeadLabel}>
            {invitation.gallery.eyebrow}
          </span>
        </div>

        {items.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={index}
            onOpen={onOpen}
          />
        ))}

        <div className={styles.railTail} aria-hidden="true">
          <span className={styles.railTailLine} />

          <span className={styles.railTailLabel}>
            {invitation.gallery.closing.eyebrow}
          </span>
        </div>
      </div>
    </div>
  );
}
