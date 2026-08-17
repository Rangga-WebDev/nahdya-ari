/** @format */

"use client";

import { useEffect, useState } from "react";

import { invitation } from "@/lib/invitation";

import { fetchWishes } from "@/lib/services/wishes";

import type { Wish } from "@/types/invitation";

import { WishesList } from "./WishesList";

import { WishForm } from "./WishForm";

import styles from "./InteractionJourney.module.css";

export function WishesScene() {
  const config = invitation.interaction.wishes;

  const [wishes, setWishes] = useState<Wish[]>([]);

  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchWishes()
      .then((result) => {
        if (!active) return;

        setWishes(result);

        setStatus("ready");
      })
      .catch((cause: unknown) => {
        if (!active) return;

        setError(
          cause instanceof Error ? cause.message : "Unable to load wishes.",
        );

        setStatus("error");
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="wishes"
      className={`${styles.scene} ${styles.wishesScene}`}
      data-interaction-scene="wishes"
      aria-labelledby="wishes-title"
    >
      <div className={styles.sceneInner}>
        <header className={styles.sceneHeader}>
          <p className={styles.eyebrow} data-interaction-small>
            {config.eyebrow}
          </p>

          <div className={styles.titleMask}>
            <h2
              className={styles.title}
              id="wishes-title"
              data-interaction-title
            >
              {config.title}
            </h2>
          </div>

          <div className={styles.rule} data-interaction-rule>
            <span />

            <i>◇</i>

            <span />
          </div>

          <p className={styles.sceneMessage} data-interaction-small>
            {config.message}
          </p>
        </header>

        <div className={styles.wishesLayout}>
          <div className={styles.wishesColumn} data-interaction-panel>
            <WishesList wishes={wishes} status={status} error={error} />
          </div>

          <div className={styles.stationery} data-interaction-panel>
            <WishForm
              onSubmitted={(wish) => setWishes((current) => [wish, ...current])}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
