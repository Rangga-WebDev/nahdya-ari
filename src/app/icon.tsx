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
        background: "#45362f",
        color: "#c4ad8d",
        fontSize: 46,
      }}
    >
      &amp;
    </div>,
    size,
  );
}
