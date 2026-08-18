/** @format */

"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { invitation } from "@/lib/invitation";
import { EASE, clipUp, drift, settle, slide } from "@/lib/reveal";

import { SectionTitle } from "@/components/invitation/vintage/VintageOrnaments";

import styles from "./StorySection.module.css";

export function StorySection() {
  const scope = useRef<HTMLElement>(null);

  const story = invitation.story;

  const total = String(story.chapters.length).padStart(2, "0");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-story-head]", {
          ...clipUp(),
          opacity: 0,
          stagger: 0.12,
          scrollTrigger: { trigger: scope.current, start: "top 78%" },
        });

        /* The spine draws itself as the guest reads down the story. */
        gsap.fromTo(
          "[data-story-spine]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-story-timeline]",
              start: "top 72%",
              end: "bottom 78%",
              scrub: 0.8,
            },
          },
        );

        gsap.utils
          .toArray<HTMLElement>("[data-story-chapter]")
          .forEach((chapter, index) => {
            gsap
              .timeline({
                defaults: { ease: EASE },
                scrollTrigger: { trigger: chapter, start: "top 84%" },
              })
              .from(
                chapter.querySelector("[data-story-node]"),
                settle({ scale: 0.5, duration: 0.9 }),
              )
              .from(
                chapter.querySelector("[data-story-body]"),
                slide(index % 2 === 0 ? "left" : "right", { x: 20 }),
                0.08,
              )
              .from(
                chapter.querySelectorAll("[data-story-line]"),
                { ...drift(), stagger: 0.07 },
                0.28,
              );
          });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="story" className={styles.story} data-story-section>
      <div className={styles.inner}>
        <div data-story-head>
          <SectionTitle script="Perjalanan Kami" heading="Love Story" />
        </div>

        <div className={styles.timeline} data-story-timeline>
          <span className={styles.spine} aria-hidden="true">
            <span className={styles.spineFill} data-story-spine />
          </span>

          {story.chapters.map((chapter, index) => (
            <article
              key={chapter.id}
              className={styles.chapter}
              data-story-chapter
            >
              <span className={styles.node} data-story-node aria-hidden="true">
                <span className={styles.nodeDot} />
              </span>

              <div className={styles.body} data-story-body>
                <span className={styles.count} data-story-line>
                  {String(index + 1).padStart(2, "0")} / {total}
                </span>

                <span className={styles.year} data-story-line>
                  {chapter.year}
                </span>

                <h3 className={styles.title} data-story-line>
                  {chapter.title}
                </h3>

                <p className={styles.text} data-story-line>
                  {chapter.story}
                </p>

                {chapter.date || chapter.location ? (
                  <p className={styles.meta} data-story-line>
                    <i aria-hidden="true" />

                    {[chapter.date, chapter.location]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.closing} data-story-head>
          <p className={styles.closingTitle}>{story.closing.title}</p>

          <p className={styles.closingText}>{story.closing.message}</p>
        </div>
      </div>
    </section>
  );
}

