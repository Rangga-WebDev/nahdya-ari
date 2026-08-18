/** @format */

import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Italiana } from "next/font/google";

import { MotionProvider } from "@/components/providers/MotionProvider";

import { invitation } from "@/lib/invitation";

import "./globals.css";
import "lenis/dist/lenis.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const coupleTitle = `${invitation.bride.firstName} & ${invitation.groom.firstName}`;

const description = `Join us in celebrating the wedding of ${coupleTitle} on ${invitation.weddingDate}.`;

/**
 * Set `NEXT_PUBLIC_SITE_URL` to the production origin so Open Graph assets
 * resolve to absolute URLs.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: `${coupleTitle} — Wedding Invitation`,

  description,

  openGraph: {
    type: "website",

    url: siteUrl,

    title: `${coupleTitle} — Wedding Invitation`,

    description,

    siteName: `${coupleTitle} Wedding`,

    locale: "id_ID",
  },

  twitter: {
    card: "summary_large_image",

    title: `${coupleTitle} — Wedding Invitation`,

    description,
  },

  robots: {
    index: false,

    follow: false,
  },
};

/** `viewportFit: "cover"` is required for the `env(safe-area-inset-*)` offsets. */
export const viewport: Viewport = {
  width: "device-width",

  initialScale: 1,

  viewportFit: "cover",

  themeColor: "#fff8e9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${cormorant.variable} ${manrope.variable} ${italiana.variable}`}
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
