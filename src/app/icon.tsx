/** @format */

import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#5d3a0d",
        color: "#ffd970",
        fontSize: 46,
      }}
    >
      &amp;
    </div>,
    size,
  );
}
