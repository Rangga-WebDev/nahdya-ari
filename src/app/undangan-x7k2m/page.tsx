/** @format */

import type { Metadata } from "next";

import { invitation } from "@/lib/invitation";

import { GuestLinkBuilder } from "./GuestLinkBuilder";

/* Unlisted page: no crawling, and it is never linked from the invitation. */
export const metadata: Metadata = {
  title: "Daftar Tamu — Generator Link Undangan",

  robots: { index: false, follow: false, nocache: true },
};

export default function GuestLinkPage() {
  return (
    <GuestLinkBuilder
      coupleName={`${invitation.bride.firstName} & ${invitation.groom.firstName}`}
      guestParameter={invitation.experience.guestParameter}
    />
  );
}
