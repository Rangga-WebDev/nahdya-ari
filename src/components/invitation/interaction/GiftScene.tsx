/** @format */

import { invitation } from "@/lib/invitation";

import { GiftAccount } from "./GiftAccount";

import styles from "./InteractionJourney.module.css";

export function GiftScene() {
  const config = invitation.interaction.gifts;

  if (!config.enabled) return null;

  return (
    <section
      id="gift"
      className={`${styles.scene} ${styles.giftScene}`}
      data-interaction-scene="gift"
      aria-labelledby="gift-title"
    >
      <div className={styles.sceneInner}>
        <header className={styles.sceneHeader}>
          <p className={styles.eyebrow} data-interaction-small>
            {config.eyebrow}
          </p>

          <div className={styles.titleMask}>
            <h2 className={styles.title} id="gift-title" data-interaction-title>
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

        <div className={styles.giftGrid}>
          {config.accounts.map((account) => (
            <GiftAccount key={account.id} account={account} />
          ))}
        </div>

        {config.address ? (
          <p className={styles.giftAddress} data-interaction-small>
            <span>{config.address.label}</span>

            {config.address.value}
          </p>
        ) : null}
      </div>
    </section>
  );
}
