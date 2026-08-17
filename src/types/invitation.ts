/** @format */

export type Person = {
  firstName: string;
  fullName: string;
  nickname: string;

  role?: string;
  quote?: string;
  portrait?: string;

  father: string;
  mother: string;
  instagram?: string;
};

export type WeddingEvent = {
  id: "ceremony" | "reception";

  eyebrow: string;
  title: string;

  date: string;

  dateTime: string;
  endDateTime: string;

  startTime: string;
  endTime?: string;

  venue: string;
  address: string;

  mapsUrl?: string;
};

export type WeddingIntroduction = {
  eyebrow: string;
  title: string;
  message: string;
  closing: string;
};

export type InvitationData = {
  bride: Person;
  groom: Person;

  weddingDate: string;

  events: WeddingEvent[];

  opening: {
    eyebrow: string;
    title: string;
    message: string;
  };

  introduction: WeddingIntroduction;
  story: LoveStory;
  gallery: WeddingGallery;
  interaction: WeddingInteraction;
  experience: WeddingExperience;
  closing: WeddingClosing;
};

/* =========================================================
   INTERACTION — RSVP / WISHES / GIFT
   ========================================================= */

export type RSVPConfig = {
  eyebrow: string;
  title: string;
  message: string;
  maxGuests: number;
};

export type WishesConfig = {
  eyebrow: string;
  title: string;
  message: string;
};

export type GiftAccount = {
  id: string;
  bank: string;
  accountNumber: string;
  accountName: string;
};

export type GiftConfig = {
  enabled: boolean;

  eyebrow: string;
  title: string;
  message: string;

  accounts: GiftAccount[];

  address?: {
    label: string;
    value: string;
  };
};

export type WeddingInteraction = {
  rsvp: RSVPConfig;
  wishes: WishesConfig;
  gifts: GiftConfig;
};

export type RSVPSubmission = {
  guestName: string;
  attendance: boolean;
  guestCount: number;
  message?: string;
};

export type Wish = {
  id: string;
  author: string;
  message: string;
  createdAt: string;
};

/* =========================================================
   EXPERIENCE — GUEST / MUSIC / NAVIGATION
   ========================================================= */

export type WeddingExperience = {
  guestParameter: string;
  guestFallback: string;

  music: {
    enabled: boolean;
    src: string;
    title: string;
  };

  chapters: {
    id: string;
    label: string;
  }[];
};

/* =========================================================
   CLOSING
   ========================================================= */

export type WeddingClosing = {
  eyebrow: string;
  title: string;
  message: string;
  signature: string;
  portrait?: string;
};

export type GalleryItemSize = "portrait" | "landscape" | "tall";

export type GalleryItem = {
  id: string;

  image?: string;

  alt: string;

  year?: string;
  location?: string;
  caption?: string;

  size: GalleryItemSize;

  objectPosition?: string;
};

export type WeddingGallery = {
  eyebrow: string;
  title: string;
  subtitle: string;

  items: GalleryItem[];

  closing: {
    eyebrow: string;
    title: string;
    message: string;
  };
};

export type LoveStoryChapter = {
  id: string;

  year: string;
  date?: string;

  eyebrow: string;
  title: string;

  story: string;

  location?: string;

  image?: string;

  align: "left" | "right";

  tone: "ivory" | "garden" | "golden";
};

export type LoveStory = {
  eyebrow: string;

  title: string;

  chapters: LoveStoryChapter[];

  closing: {
    eyebrow: string;
    title: string;
    message: string;
  };
};
