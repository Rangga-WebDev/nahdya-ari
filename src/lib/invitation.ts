/** @format */

import type { InvitationData } from "@/types/invitation";

export const invitation: InvitationData = {
  bride: {
    firstName: "Nahdya",
    fullName: "Nahdya Andini Setyaningrum Antu, S.E.",
    nickname: "Nahdya",

    role: "The Bride",

    quote:
      "In you, I found the quiet place my heart had always been looking for.",

    portrait: "/art/couple/bride.webp",

    father: "Andry SY Antu, S.E.",
    mother: "Rini Ruslan",
    instagram: "@nadyaantu",
  },

  groom: {
    firstName: "Ari",
    fullName: "Ari Azlansya, S.E.",
    nickname: "Ari",

    role: "The Groom",

    portrait: "/art/couple/groom.webp",

    quote: "Every road feels like home when I know it leads me back to you.",
    father: "SUHARMAN",
    mother: "Hj. Arniati Arsyad",
    instagram: "@ariazlansya",
  },

  weddingDate: "13.09.2026",

  opening: {
    eyebrow: "The Wedding Of",
    title: "Nahdya & Ari",
    message:
      "With joyful hearts, we invite you to celebrate the beginning of our forever.",
  },

  introduction: {
    eyebrow: "A Sacred Beginning",

    title: "Two souls, one promise.",

    message:
      "Dengan penuh rasa syukur dan bahagia, kami mengundang Anda untuk menjadi bagian dari sebuah hari ketika dua perjalanan bertemu dan memulai satu kisah yang baru.",

    closing:
      "We would be honored to celebrate this beautiful beginning with you.",
  },

  events: [
    {
      id: "ceremony",

      eyebrow: "The Sacred Ceremony",
      title: "Wedding Ceremony",

      date: "13 September 2026",

      dateTime: "2026-09-13T09:00:00+08:00",

      endDateTime: "2026-09-13T11:00:00+08:00",

      startTime: "09:00",
      endTime: "11:00",

      venue: "Kediaman Mempelai Wanita",

      address: "Poso, Sulawesi Tengah",

      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Poso",
    },

    {
      id: "reception",

      eyebrow: "An Evening Celebration",
      title: "Wedding Reception",

      date: "13 September 2026",

      dateTime: "2026-09-13T19:00:00+08:00",

      endDateTime: "2026-09-13T22:00:00+08:00",

      startTime: "19:00",
      endTime: "22:00",

      venue: "Gedung Wanita",

      address:
        "JQ44+37V, Gebang Rejo, Poso Kota, Poso Regency, Central Sulawesi 94612",

      mapsUrl: "https://maps.app.goo.gl/EsBnMG3z5mrd5uaLA",
    },
  ],

  story: {
    eyebrow: "A Journey Written Slowly",

    title: "Our story, in four chapters.",

    chapters: [
      {
        id: "first-meeting",

        year: "2019",

        date: "Pertengahan 2019",

        eyebrow: "Where It Started",

        title: "The first hello.",

        story:
          "Tidak ada yang benar-benar istimewa pada hari itu, sampai sebuah percakapan sederhana perlahan menjadi awal dari sesuatu yang tidak pernah kami rencanakan.",

        location: "Poso",

        align: "left",

        tone: "ivory",
      },

      {
        id: "closer",

        year: "2024",

        date: "Pertengahan 2023",

        eyebrow: "Growing Together",

        title: "A little closer.",

        story:
          "2023/2024 mempunyai pasangan masing-masing tapi takdir mempertemukan di akhir tahun 2024 di mana pertemuan itu memunculkan rasa yang menjadi awal kisah percintaan keduanya.",
        location: "Poso",

        align: "right",

        tone: "garden",
      },

      {
        id: "promise",

        year: "2025",

        date: "Pertengahan 2025",

        eyebrow: "A Promise",

        title: "Choosing us.",

        story:
          " mulai berkeinginan ingin melanjutkan ke jenjang yg lebih serius yaitu ke pernikahan setelah itu mulailah mengumpulkan modal untuk ke jenjang pernikahan tersebut ",
        location: "Poso",

        align: "left",

        tone: "golden",
      },

      {
        id: "forever",

        year: "2026",

        date: "14 Juni 2026",

        eyebrow: "The Beginning of Forever",

        title: "And now, forever.",

        story:
          "Setelah semua perjalanan yang membawa kami sampai di sini, kini kami ingin memulai bab baru—berjalan dalam satu arah, membangun satu rumah, dan menulis cerita yang sama.",

        location: "Poso",

        align: "right",

        tone: "garden",
      },
    ],

    closing: {
      eyebrow: "Every Road Led Here",

      title: "And the best chapter is still unwritten.",

      message:
        "What began as two separate journeys has become one story we now choose to continue together.",
    },
  },

  gallery: {
    eyebrow: "Fragments of Us",

    title: "Memories",

    subtitle:
      "A collection of quiet moments, laughter, journeys, and everything in between.",

    items: [
      {
        id: "memory-01",
        alt: "Nahdya and Ari walking together",
        image: "/art/gallery/memory-01.jpeg",
        year: "2019",
        location: "Poso",
        caption: "Some beginnings are quiet.",
        size: "portrait",
      },

      {
        id: "memory-02",
        alt: "Nahdya and Ari travelling together",
        image: "/art/gallery/memory-03.jpeg",
        year: "2023",
        location: "Sulawesi Tengah",
        caption: "A thousand little adventures.",
        size: "landscape",
        objectPosition: "50% 50%",
      },

      {
        id: "memory-03",
        image: "/art/gallery/memory-02.jpeg",
        alt: "A quiet portrait of Nahdya and Ari",
        year: "2024",
        caption: "The warmth between ordinary days.",
        size: "tall",
        objectPosition: "0% 50%",
      },

      {
        id: "memory-04",
        image: "/art/gallery/memory-04.jpeg",
        alt: "Portrait from their journey",
        year: "2025",
        caption: "Finding home in another person.",
        size: "portrait",
      },

      {
        id: "memory-05",
        image: "/art/gallery/memory-05.jpeg",
        alt: "Nahdya and Ari together",
        year: "2025",
        location: "Indonesia",
        caption: "Every season brought us closer.",
        size: "landscape",
        objectPosition: "0% 20%",
      },

      {
        id: "memory-06",
        image: "/art/gallery/memory-06.jpeg",
        alt: "Nahdya and Ari pre wedding portrait",
        year: "2026",
        location: "Poso",
        caption: "Right before forever begins.",
        size: "tall",
      },
    ],

    closing: {
      eyebrow: "The Moments We Keep",

      title: "Some memories never need words.",

      message:
        "They simply stay with us—quietly becoming part of the story we carry forward.",
    },
  },

  interaction: {
    rsvp: {
      eyebrow: "Répondez S'il Vous Plaît",

      title: "Will you join our celebration?",

      message:
        "Kehadiran Anda adalah kebahagiaan bagi kami. Mohon konfirmasi agar kami dapat menyambut Anda dengan sebaik-baiknya.",

      maxGuests: 4,
    },

    wishes: {
      eyebrow: "Guest Book",

      title: "Leave a wish for our new beginning.",

      message:
        "Setiap doa dan harapan yang Anda tuliskan akan kami simpan sebagai bagian dari cerita ini.",
    },

    gifts: {
      enabled: true,

      eyebrow: "Wedding Gift",

      title: "Your presence is the greatest gift.",

      message:
        "For those who wish to send a token of love, the details below are available with our deepest gratitude.",

      accounts: [
        {
          id: "gift-bride",
          bank: "Bank BRI",
          accountNumber: "520101042223543",
          accountName: "Nahdya Andini Setyaningrum Antu, S.E.",
        },

        {
          id: "gift-groom",
          bank: "Bank BRI",
          accountNumber: "520101027041533",
          accountName: "Ari Azlansya, S.E.",
        },
      ],

      address: {
        label: "Gift Address",
        value:
          "JQ44+37V, Gebang Rejo, Poso Kota, Poso Regency, Central Sulawesi 94612",
      },
    },
  },

  experience: {
    guestParameter: "to",

    guestFallback: "Bapak / Ibu / Saudara/i",

    music: {
      enabled: true,

      src: "/audio/Gunslinger.mp3",

      title: "Lagu na anak2ka",
    },

    chapters: [
      { id: "beginning", label: "The Beginning" },
      { id: "couple", label: "The Couple" },
      { id: "day", label: "The Day" },
      { id: "story", label: "Our Story" },
      { id: "memories", label: "Memories" },
      { id: "rsvp", label: "RSVP" },
      { id: "closing", label: "With Love" },
    ],
  },

  closing: {
    eyebrow: "With Love",

    title: "Thank you for being part of our story.",

    message:
      "Your prayers, presence, and love mean more to us than words can say.",

    signature: "Nahdya & Ari",

    // Set to "/art/closing/couple.webp" once the asset is provided.
    portrait: "/art/closing/couple.jpeg",
  },
};
