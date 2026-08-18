/** @format */

"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import type { Wish } from "@/types/invitation";

import { invitation } from "@/lib/invitation";

import { fetchWishes } from "@/lib/services/wishes";
import { drift, settle } from "@/lib/reveal";

import { SectionTitle } from "@/components/invitation/vintage/VintageOrnaments";

import { GiftAccount } from "./GiftAccount";
import { RSVPForm } from "./RSVPForm";
import { WishForm } from "./WishForm";
import { WishesList } from "./WishesList";

import styles from "./InteractionSection.module.css";

type WishesStatus = "loading" | "ready" | "error";

export function InteractionSection() {
  const scope = useRef<HTMLElement>(null);

  const gifts = invitation.interaction.gifts;

  const [wishes, setWishes] = useState<Wish[]>([]);

  const [status, setStatus] = useState<WishesStatus>("loading");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchWishes()
      .then((list) => {
        if (!active) return;

        setWishes(list);

        setStatus("ready");
      })
      .catch(() => {
        if (!active) return;

        setError("Buku tamu belum dapat dibuka saat ini.");

        setStatus("error");
      });

    return () => {
      active = false;
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>("[data-interaction-chapter]")
          .forEach((chapter, index) => {
            gsap.from(chapter.querySelectorAll("[data-interaction-reveal]"), {
              ...(index % 2 === 0 ? settle({ scale: 1.03 }) : drift({ y: 10 })),
              stagger: 0.11,
              scrollTrigger: { trigger: chapter, start: "top 80%" },
            });
          });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className={styles.interaction} data-interaction>
      {gifts.enabled ? (
        <div className={styles.chapter} data-interaction-chapter>
          <div className={styles.chapterInner}>
            <div data-interaction-reveal>
              <SectionTitle script="Tanda Kasih" heading="Amplop Digital" />
            </div>

            <p className={styles.message} data-interaction-reveal>
              {gifts.message}
            </p>

            <div className={styles.giftGrid} data-interaction-reveal>
              {gifts.accounts.map((account) => (
                <GiftAccount key={account.id} account={account} />
              ))}
            </div>

            {gifts.address ? (
              <p className={styles.giftAddress} data-interaction-reveal>
                <span>{gifts.address.label}</span>

                {gifts.address.value}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div
        id="rsvp"
        className={styles.chapter}
        data-interaction-chapter
        data-rsvp
      >
        <div className={styles.chapterInner}>
          <div data-interaction-reveal>
            <SectionTitle
              script="Konfirmasi Kehadiran"
              heading={invitation.interaction.rsvp.title}
            />
          </div>

          <p className={styles.message} data-interaction-reveal>
            {invitation.interaction.rsvp.message}
          </p>

          <div className={styles.panel} data-interaction-reveal>
            <span className={styles.panelBorder} aria-hidden="true" />

            <RSVPForm />
          </div>
        </div>
      </div>

      <div className={styles.chapter} data-interaction-chapter>
        <div className={styles.chapterInner}>
          <div data-interaction-reveal>
            <SectionTitle
              script="Doa & Restu"
              heading={invitation.interaction.wishes.title}
            />
          </div>

          <p className={styles.message} data-interaction-reveal>
            {invitation.interaction.wishes.message}
          </p>

          <div className={styles.panel} data-interaction-reveal>
            <span className={styles.panelBorder} aria-hidden="true" />

            <WishForm
              onSubmitted={(wish) => setWishes((list) => [wish, ...list])}
            />
          </div>

          <div data-interaction-reveal>
            <WishesList wishes={wishes} status={status} error={error} />
          </div>
        </div>
      </div>
    </section>
  );
}

