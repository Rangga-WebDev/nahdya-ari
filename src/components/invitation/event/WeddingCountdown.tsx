/** @format */

"use client";

import { useEffect, useState } from "react";

import styles from "./EventPavilion.module.css";

type WeddingCountdownProps = {
  target: string;
};

type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  complete: boolean;
};

function calculateCountdown(target: string): CountdownValue {
  const targetTime = new Date(target).getTime();

  const currentTime = Date.now();

  const difference = Math.max(targetTime - currentTime, 0);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,

    complete: difference <= 0,
  };
}

export function WeddingCountdown({ target }: WeddingCountdownProps) {
  const [countdown, setCountdown] = useState<CountdownValue | null>(null);

  useEffect(() => {
    const update = () => {
      setCountdown(calculateCountdown(target));
    };

    const initialTimer = window.setTimeout(update, 0);

    const timer = window.setInterval(update, 1000);

    return () => {
      window.clearTimeout(initialTimer);

      window.clearInterval(timer);
    };
  }, [target]);

  if (countdown?.complete) {
    return (
      <div className={styles.countdownComplete}>
        The beautiful day has arrived.
      </div>
    );
  }

  return (
    <div className={styles.countdown} data-event-countdown aria-live="polite">
      <CountdownItem value={countdown?.days} label="Days" />

      <CountdownSeparator />

      <CountdownItem value={countdown?.hours} label="Hours" />

      <CountdownSeparator />

      <CountdownItem value={countdown?.minutes} label="Minutes" />

      <CountdownSeparator />

      <CountdownItem value={countdown?.seconds} label="Seconds" />
    </div>
  );
}

function CountdownItem({ value, label }: { value?: number; label: string }) {
  return (
    <div className={styles.countdownItem}>
      <span className={styles.countdownNumber}>
        {value === undefined ? "--" : String(value).padStart(2, "0")}
      </span>

      <span className={styles.countdownLabel}>{label}</span>
    </div>
  );
}

function CountdownSeparator() {
  return (
    <span className={styles.countdownSeparator} aria-hidden="true">
      ·
    </span>
  );
}
