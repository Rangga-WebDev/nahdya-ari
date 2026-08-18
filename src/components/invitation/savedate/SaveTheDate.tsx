/** @format */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { invitation } from "@/lib/invitation";
import { buildGoogleCalendarUrl } from "@/lib/calendar";
import { EASE, blurIn, drift, lineRise } from "@/lib/reveal";

import { SaveTheDateGarden } from "@/components/invitation/botanical/SaveTheDateGarden";

import styles from "./SaveTheDate.module.css";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  complete: boolean;
};

function getRemaining(target: Date): Remaining {
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, complete: true };
  }

  const seconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    complete: false,
  };
}

export function SaveTheDate() {
  const scope = useRef<HTMLElement>(null);

  const ceremony = invitation.events[0];

  const target = useMemo(
    () => (ceremony ? new Date(ceremony.dateTime) : null),
    [ceremony],
  );

  /* Starts null so the server and the first client paint agree. */
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    if (!target) return;

    /* Deferred by a frame so the first value is never written synchronously
       during the effect, which would cascade a render. */
    const first = requestAnimationFrame(() =>
      setRemaining(getRemaining(target)),
    );

    const timer = window.setInterval(
      () => setRemaining(getRemaining(target)),
      1000,
    );

    return () => {
      cancelAnimationFrame(first);

      window.clearInterval(timer);
    };
  }, [target]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: EASE },
          scrollTrigger: { trigger: scope.current, start: "top 72%" },
        });

        tl.from("[data-save-script]", blurIn({ duration: 1.2 }))
          .from("[data-save-word]", { ...lineRise(), stagger: 0.09 }, 0.15)
          .from("[data-save-copy]", { ...drift(), stagger: 0.1 }, 0.55)
          .from("[data-save-unit]", { ...drift({ y: 12 }), stagger: 0.07 }, 0.7)
          .from("[data-save-cta]", drift(), 0.95);

        /* Depth. The numbers are small on purpose — the guest should register
           dimension, not movement. */
        const layers: [string, number][] = [
          ['[data-garden-layer="rear"]', 1.5],
          ['[data-garden-layer="mid"]', 3],
          ['[data-garden-layer="fore"]', 5],
        ];

        layers.forEach(([selector, strength]) => {
          gsap.fromTo(
            selector,
            { yPercent: -strength },
            {
              yPercent: strength,
              ease: "none",
              scrollTrigger: {
                trigger: scope.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  if (!ceremony) return null;

  const units: Array<[string, number | undefined]> = [
    ["Hari", remaining?.days],
    ["Jam", remaining?.hours],
    ["Menit", remaining?.minutes],
    ["Detik", remaining?.seconds],
  ];

  return (
    <section ref={scope} className={styles.saveDate} data-save-the-date>
      <SaveTheDateGarden />

      <div className={styles.inner}>
        <p className={styles.script} data-save-script>
          Menuju Hari Bahagia
        </p>

        <h2 className={styles.heading}>
          {["Save", "The"].map((word) => (
            <span key={word} className={styles.mask}>
              <span className={styles.word} data-save-word>
                {word}
              </span>
            </span>
          ))}

          <span className={styles.mask}>
            <span
              className={`${styles.word} ${styles.wordAccent}`}
              data-save-word
            >
              Date
            </span>
          </span>
        </h2>

        <p className={styles.message} data-save-copy>
          {invitation.introduction.closing}
        </p>

        <p className={styles.date} data-save-copy>
          {ceremony.date}
        </p>

        {remaining?.complete ? (
          <p className={styles.complete} data-save-copy>
            Hari bahagia itu telah tiba.
          </p>
        ) : (
          <div className={styles.countdown} aria-live="polite">
            {units.map(([label, value]) => (
              <div key={label} className={styles.unit} data-save-unit>
                <span className={styles.value}>
                  {value === undefined ? "--" : String(value).padStart(2, "0")}
                </span>

                <span className={styles.label}>{label}</span>
              </div>
            ))}
          </div>
        )}

        <a
          className={styles.calendar}
          href={buildGoogleCalendarUrl(ceremony)}
          target="_blank"
          rel="noreferrer"
          data-save-cta
        >
          <span className={styles.calendarFill} aria-hidden="true" />

          <span className={styles.calendarLabel}>Simpan ke Kalender</span>

          <span className={styles.calendarArrow} aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
