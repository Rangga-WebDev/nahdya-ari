/** @format */

"use client";

import { useEffect, useState } from "react";

import { useLenis } from "lenis/react";

import { useChapterNavigation } from "./useExperienceControls";

import styles from "./ExperienceControls.module.css";

export function ChapterNavigation() {
  const { chapters, activeId, goTo } = useChapterNavigation();

  const [open, setOpen] = useState(false);

  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const body = document.body;

    const previousOverflow = body.style.overflow;

    body.style.overflow = "hidden";

    lenis?.stop();

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);

      body.style.overflow = previousOverflow;

      lenis?.start();
    };
  }, [lenis, open]);

  function handleSelect(id: string) {
    setOpen(false);

    goTo(id);
  }

  return (
    <>
      <nav className={styles.rail} aria-label="Daftar bab">
        <ul>
          {chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <button
                type="button"
                className={`${styles.railItem} ${
                  activeId === chapter.id ? styles.railItemActive : ""
                }`}
                onClick={() => handleSelect(chapter.id)}
                aria-current={activeId === chapter.id ? "true" : undefined}
              >
                <span className={styles.railIndex}>
                  {(index + 1).toString().padStart(2, "0")}
                </span>

                <span className={styles.railLabel}>{chapter.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className={styles.menuTrigger}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="chapter-panel"
      >
        <span className={styles.menuLines} aria-hidden="true">
          <i />
          <i />
        </span>

        <span className={styles.visuallyHidden}>
          {open ? "Tutup daftar bab" : "Buka daftar bab"}
        </span>
      </button>

      <div
        id="chapter-panel"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        hidden={!open}
      >
        <p className={styles.panelEyebrow}>Daftar Bab</p>

        <button
          type="button"
          className={styles.panelClose}
          onClick={() => setOpen(false)}
        >
          <span>Close</span>

          <span aria-hidden="true">×</span>
        </button>

        <ul>
          {chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <button
                type="button"
                className={`${styles.panelItem} ${
                  activeId === chapter.id ? styles.panelItemActive : ""
                }`}
                onClick={() => handleSelect(chapter.id)}
              >
                <span>{(index + 1).toString().padStart(2, "0")}</span>

                {chapter.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
