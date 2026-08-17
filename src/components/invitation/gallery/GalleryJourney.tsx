/** @format */

"use client";

import { useRef, useState } from "react";

import { invitation } from "@/lib/invitation";

import { GalleryIntro } from "./GalleryIntro";

import { GalleryRail } from "./GalleryRail";

import { GalleryFinale } from "./GalleryFinale";

import { GalleryLightbox } from "./GalleryLightbox";

import { useGalleryMotion } from "./useGalleryMotion";

import styles from "./GalleryJourney.module.css";

export function GalleryJourney() {
  const scope = useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useGalleryMotion(scope);

  const items = invitation.gallery.items;

  return (
    <section
      ref={scope}
      id="memories"
      className={styles.journey}
      aria-label={invitation.gallery.title}
      data-gallery-journey
    >
      <div className={styles.stage}>
        <GalleryIntro />

        <GalleryRail onOpen={setActiveIndex} />

        <GalleryFinale />
      </div>

      {activeIndex !== null ? (
        <GalleryLightbox
          items={items}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      ) : null}
    </section>
  );
}
