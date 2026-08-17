/** @format */

"use client";

import { useCallback, useEffect, useRef } from "react";

import { createPortal } from "react-dom";

import Image from "next/image";

import { useLenis } from "lenis/react";

import type { GalleryItem } from "@/types/invitation";

import styles from "./GalleryJourney.module.css";

type GalleryLightboxProps = {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

export function GalleryLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const lenis = useLenis();

  const closeRef = useRef<HTMLButtonElement>(null);

  const total = items.length;

  const item = items[index];

  const goNext = useCallback(() => {
    onNavigate((index + 1) % total);
  }, [index, onNavigate, total]);

  const goPrevious = useCallback(() => {
    onNavigate((index - 1 + total) % total);
  }, [index, onNavigate, total]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrevious, onClose]);

  useEffect(() => {
    const body = document.body;

    const previousOverflow = body.style.overflow;

    body.style.overflow = "hidden";

    lenis?.stop();

    return () => {
      body.style.overflow = previousOverflow;

      lenis?.start();
    };
  }, [lenis]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;

    closeRef.current?.focus();

    return () => previouslyFocused?.focus?.();
  }, []);

  if (!item) return null;

  const number = (index + 1).toString().padStart(2, "0");

  const meta = [item.year, item.location].filter(Boolean).join(" · ");

  return createPortal(
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={`Memory ${number} of ${total}`}
    >
      <div
        className={styles.lightboxBackdrop}
        onClick={onClose}
        aria-hidden="true"
      />

      <div className={styles.lightboxInner}>
        <header className={styles.lightboxBar}>
          <span className={styles.lightboxIndex}>
            {number} <i>/</i> {total.toString().padStart(2, "0")}
          </span>

          <button
            type="button"
            ref={closeRef}
            className={styles.lightboxClose}
            onClick={onClose}
          >
            <span>Close</span>

            <span aria-hidden="true">×</span>
          </button>
        </header>

        <figure className={styles.lightboxFigure}>
          <div className={styles.lightboxMedia} key={item.id}>
            {item.image ? (
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 1023px) 92vw, 60vw"
                className={styles.lightboxImage}
              />
            ) : (
              <span className={styles.lightboxFallback} aria-hidden="true">
                {number}
              </span>
            )}
          </div>

          <figcaption className={styles.lightboxCaption}>
            {item.caption ? <p>{item.caption}</p> : <p>{item.alt}</p>}

            {meta ? <span>{meta}</span> : null}
          </figcaption>
        </figure>

        <nav className={styles.lightboxNav} aria-label="Gallery navigation">
          <button
            type="button"
            className={styles.lightboxAction}
            onClick={goPrevious}
          >
            <span aria-hidden="true">←</span>

            <span>Previous</span>
          </button>

          <button
            type="button"
            className={styles.lightboxAction}
            onClick={goNext}
          >
            <span>Next</span>

            <span aria-hidden="true">→</span>
          </button>
        </nav>
      </div>
    </div>,
    document.body,
  );
}
