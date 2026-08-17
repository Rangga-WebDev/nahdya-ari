/** @format */

import type { WeddingEvent } from "@/types/invitation";

import { buildGoogleCalendarUrl } from "@/lib/calendar";

import styles from "./EventPavilion.module.css";

type EventActionsProps = {
  event: WeddingEvent;
};

export function EventActions({ event }: EventActionsProps) {
  const calendarUrl = buildGoogleCalendarUrl(event);

  return (
    <div className={styles.eventActions} data-event-actions>
      {event.mapsUrl ? (
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.eventAction}
        >
          <span>View Location</span>

          <span className={styles.actionIcon} aria-hidden="true">
            ↗
          </span>
        </a>
      ) : (
        <span className={`${styles.eventAction} ${styles.eventActionDisabled}`}>
          <span>Location Soon</span>

          <span className={styles.actionIcon}>—</span>
        </span>
      )}

      <a
        href={calendarUrl}
        target="_blank"
        rel="noreferrer"
        className={styles.eventAction}
      >
        <span>Add to Calendar</span>

        <span className={styles.actionIcon} aria-hidden="true">
          +
        </span>
      </a>
    </div>
  );
}
