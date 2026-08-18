/** @format */

import { invitation } from "@/lib/invitation";

import { InvitationCover } from "@/components/invitation/cover/InvitationCover";
import { VintageHero } from "@/components/invitation/hero/VintageHero";
import { VerseSection } from "@/components/invitation/verse/VerseSection";
import { CoupleSection } from "@/components/invitation/couple/CoupleSection";

import { LightTransition } from "@/components/invitation/transition/LightTransition";

import { SaveTheDate } from "@/components/invitation/savedate/SaveTheDate";
import { EventSection } from "@/components/invitation/event/EventSection";
import { StorySection } from "@/components/invitation/story/StorySection";
import { EditorialBreak } from "@/components/invitation/editorial/EditorialBreak";
import { GallerySection } from "@/components/invitation/gallery/GallerySection";
import { QuoteSection } from "@/components/invitation/editorial/QuoteSection";
import { InteractionSection } from "@/components/invitation/interaction/InteractionSection";
import { ClosingSection } from "@/components/invitation/closing/ClosingSection";

import { BotanicalVeil } from "@/components/invitation/botanical/BotanicalVeil";
import { InvitationExperience } from "@/components/invitation/experience/InvitationExperience";

import styles from "./page.module.css";

export default function Home() {
  const [journeyBreak] = invitation.breaks;

  return (
    <main>
      <InvitationCover />

      {/* Chapters one to three live in the dark. */}
      <div className={`${styles.darkZone} grain`}>
        <VintageHero />

        <VerseSection />

        <CoupleSection />
      </div>

      <LightTransition />

      {/* Everything from Save The Date onward shares one ivory canvas. */}
      <div className={`${styles.lightZone} grain`}>
        <SaveTheDate />

        <EventSection />

        <StorySection />

        {journeyBreak ? <EditorialBreak moment={journeyBreak} /> : null}

        <GallerySection />

        <QuoteSection />

        <InteractionSection />

        <ClosingSection />
      </div>

      <BotanicalVeil />

      <InvitationExperience />
    </main>
  );
}
