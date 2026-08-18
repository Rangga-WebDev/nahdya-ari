/** @format */

import { ImageResponse } from "next/og";

import { invitation } from "@/lib/invitation";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

const coupleTitle = `${invitation.bride.firstName} & ${invitation.groom.firstName}`;

export const alt = `${coupleTitle} — Wedding Invitation`;

/**
 * Subsets the display serif straight from Google Fonts. Returns `null` when the
 * network is unavailable so the build falls back to the bundled sans instead of
 * failing outright.
 */
async function loadDisplayFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400&text=${encodeURIComponent(
      text,
    )}`;

    const css = await (
      await fetch(url, {
        headers: {
          // Google only serves TTF (which Satori needs) to legacy user agents.
          "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64)",
        },
      })
    ).text();

    const source = css.match(
      /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
    );

    if (!source) return null;

    const response = await fetch(source[1]);

    if (!response.ok) return null;

    return await response.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const eyebrow = invitation.opening.eyebrow.toUpperCase();

  const date = invitation.weddingDate;

  const venue = invitation.events[0]?.address ?? "";

  const fontData = await loadDisplayFont(
    `${coupleTitle}${eyebrow}${date}${venue}`,
  );

  const display = fontData ? "Cormorant Garamond" : "sans-serif";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(160deg, #fffdf7 0%, #fff4d6 45%, #f3ce93 100%)",
        color: "#5d3a0d",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 34,
          left: 34,
          right: 34,
          bottom: 34,
          border: "1px solid rgba(143, 99, 20, 0.38)",
        }}
      />

      <div
        style={{
          fontSize: 24,
          letterSpacing: 14,
          color: "#8f6314",
        }}
      >
        {eyebrow}
      </div>

      <div
        style={{
          marginTop: 26,
          fontSize: 132,
          fontFamily: display,
          letterSpacing: -2,
          color: "#5d3a0d",
        }}
      >
        {coupleTitle}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 34,
        }}
      >
        <div style={{ width: 120, height: 1, background: "#8f6314" }} />

        <div
          style={{
            margin: "0 22px",
            fontSize: 30,
            letterSpacing: 8,
            color: "#8f6314",
          }}
        >
          {date}
        </div>

        <div style={{ width: 120, height: 1, background: "#8f6314" }} />
      </div>

      <div
        style={{
          marginTop: 30,
          fontSize: 22,
          letterSpacing: 6,
          color: "#7d6440",
        }}
      >
        {venue.toUpperCase()}
      </div>
    </div>,
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: "Cormorant Garamond",
              data: fontData,
              style: "normal",
              weight: 400,
            },
          ]
        : [],
    },
  );
}
