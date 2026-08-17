/** @format */

import type { Wish } from "@/types/invitation";

import styles from "./InteractionJourney.module.css";

type WishesListProps = {
  wishes: Wish[];
  status: "loading" | "ready" | "error";
  error?: string | null;
};

export function WishesList({ wishes, status, error }: WishesListProps) {
  if (status === "loading") {
    return (
      <p className={styles.stateNote} role="status">
        Gathering wishes…
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className={styles.error} role="alert">
        {error ?? "The guest book could not be opened right now."}
      </p>
    );
  }

  if (wishes.length === 0) {
    return (
      <p className={styles.stateNote}>
        The first page is still blank. Yours could be the first wish.
      </p>
    );
  }

  return (
    <ul className={styles.wishes}>
      {wishes.map((wish) => (
        <li key={wish.id} className={styles.wish} data-interaction-wish>
          <p className={styles.wishMessage}>&ldquo;{wish.message}&rdquo;</p>

          <p className={styles.wishAuthor}>
            <span aria-hidden="true">—</span> {wish.author}
            <time className={styles.wishDate} dateTime={wish.createdAt}>
              {formatDate(wish.createdAt)}
            </time>
          </p>
        </li>
      ))}
    </ul>
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
