/** @format */

import { CoupleJourney } from "@/components/invitation/couple/CoupleJourney";

import { ClosingJourney } from "@/components/invitation/closing/ClosingJourney";

import { EventPavilion } from "@/components/invitation/event/EventPavilion";

import { InvitationExperience } from "@/components/invitation/experience/InvitationExperience";

import { GalleryJourney } from "@/components/invitation/gallery/GalleryJourney";

import { InteractionJourney } from "@/components/invitation/interaction/InteractionJourney";

import { OpeningSequence } from "@/components/invitation/opening/OpeningSequence";

import { EnvelopeOverture } from "@/components/invitation/overture/EnvelopeOverture";

import { StoryJourney } from "@/components/invitation/story/StoryJourney";

export default function Home() {
  return (
    <main>
      <EnvelopeOverture />

      <OpeningSequence />

      <CoupleJourney />

      <EventPavilion />

      <StoryJourney />

      <GalleryJourney />

      <InteractionJourney />

      <ClosingJourney />

      <InvitationExperience />
    </main>
  );
}
