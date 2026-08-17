/** @format */

import type { WeddingEvent } from "@/types/invitation";

function toGoogleCalendarDate(date: string) {
  return new Date(date)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

export function buildGoogleCalendarUrl(event: WeddingEvent) {
  const start = toGoogleCalendarDate(event.dateTime);

  const end = toGoogleCalendarDate(event.endDateTime);

  const params = new URLSearchParams({
    action: "TEMPLATE",

    text: event.title,

    dates: `${start}/${end}`,

    details: "We would be honored to celebrate this beautiful day with you.",

    location: `${event.venue}, ${event.address}`,
  });

  return "https://calendar.google.com/calendar/render?" + params.toString();
}
