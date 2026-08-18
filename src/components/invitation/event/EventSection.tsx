/** @format */

"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import type { WeddingEvent } from "@/types/invitation";

import { invitation } from "@/lib/invitation";
import { EASE, clipUp, drift } from "@/lib/reveal";

import { SectionTitle } from "@/components/invitation/vintage/VintageOrnaments";

import styles from "./EventSection.module.css";

export function EventSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-event-head]", {
          ...clipUp(),
          opacity: 0,
          stagger: 0.12,
          scrollTrigger: { trigger: scope.current, start: "top 78%" },
        });

        gsap.utils
          .toArray<HTMLElement>("[data-event-panel]")
          .forEach((panel) => {
            gsap
              .timeline({
                defaults: { ease: EASE },
                scrollTrigger: { trigger: panel, start: "top 84%" },
              })
              .from(panel, {
                clipPath: "inset(0% 0% 100% 0%)",
                duration: 1.3,
              })
              .from(
                panel.querySelectorAll("[data-event-line]"),
                { ...drift(), stagger: 0.07 },
                0.35,
              );
          });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="day" className={styles.events} data-event-section>
      <div className={styles.inner}>
        <div data-event-head>
          <SectionTitle script="Waktu & Tempat" heading="Rangkaian Acara" />
        </div>

        <div className={styles.list}>
          {invitation.events.map((event) => (
            <EventPanel key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventPanel({ event }: { event: WeddingEvent }) {
  const time = event.endTime
    ? `${event.startTime} — ${event.endTime} WITA`
    : `${event.startTime} WITA`;

  return (
    <article className={styles.panel} data-event-panel>
      <span className={styles.panelBorder} aria-hidden="true" />

      <Crest className={styles.crest} />

      <p className={styles.eyebrow}>{event.eyebrow}</p>

      <h3 className={styles.title}>{event.title}</h3>

      <p className={styles.day}>{event.date}</p>

      <p className={styles.time}>{time}</p>

      <span className={styles.rule} aria-hidden="true" />

      <p className={styles.venue}>{event.venue}</p>

      <p className={styles.address}>{event.address}</p>

      {event.mapsUrl ? (
        <a
          className={styles.action}
          href={event.mapsUrl}
          target="_blank"
          rel="noreferrer"
        >
          <PinIcon className={styles.actionIcon} />
          Lihat Lokasi
        </a>
      ) : null}
    </article>
  );
}

function Crest({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M4 30h20" />

      <path d="M36 30h20" />

      <path d="M30 8c5 6 5 16 0 22-5-6-5-16 0-22z" />

      <circle cx="30" cy="19" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />

      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

/** Sparse sprig wallpaper, matching the couple chapter. */

