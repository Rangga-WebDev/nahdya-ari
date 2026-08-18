/** @format */

import type { InvitationData } from "@/types/invitation";

export const invitation: InvitationData = {
  bride: {
    firstName: "Nahdya",
    fullName: "Nahdya Andini Setyaningrum Antu, S.E.",
    nickname: "Nahdya",

    role: "Mempelai Wanita",

    quote:
      "Pada dirimu, aku menemukan ketenangan yang selama ini dicari hatiku.",

    portrait: "/art/couple/bride.webp",

    father: "Andry SY Antu, S.E.",
    mother: "Rini Ruslan",
    instagram: "@nadyaantu",
  },

  groom: {
    firstName: "Ari",
    fullName: "Ari Azlansya, S.E.",
    nickname: "Ari",

    role: "Mempelai Pria",

    portrait: "/art/couple/groom.webp",

    quote:
      "Sejauh apa pun langkahku, setiap jalan terasa pulang bila menuju padamu.",

    father: "SUHARMAN",
    mother: "Hj. Arniati Arsyad",
    instagram: "@ariazlansya",
  },

  weddingDate: "13.09.2026",

  opening: {
    eyebrow: "Undangan Pernikahan",
    title: "Nahdya & Ari",
    message:
      "Dengan memohon rahmat dan ridha Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menjadi saksi awal perjalanan kami.",
  },

  introduction: {
    eyebrow: "Bismillahirrahmanirrahim",

    title: "Dua hati, satu janji.",

    verse: {
      arabic:
        "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",

      translation:
        "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",

      reference: "QS. Ar-Rum : 21",
    },

    message:
      "Dengan penuh rasa syukur dan bahagia, kami mengundang Anda untuk menjadi bagian dari hari ketika dua perjalanan bertemu dan memulai satu kisah yang baru.",

    closing:
      "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.",
  },

  events: [
    {
      id: "ceremony",

      eyebrow: "Ijab & Kabul",
      title: "Akad Nikah",

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

      eyebrow: "Syukuran Pernikahan",
      title: "Resepsi",

      date: "13 September 2026",

      dateTime: "2026-09-13T19:00:00+08:00",

      endDateTime: "2026-09-13T22:00:00+08:00",

      startTime: "19:00",
      endTime: "22:00",

      venue: "Gedung Wanita",

      address:
        "JQ44+37V, Gebang Rejo, Poso Kota, Kabupaten Poso, Sulawesi Tengah 94612",

      mapsUrl: "https://maps.app.goo.gl/EsBnMG3z5mrd5uaLA",
    },
  ],

  story: {
    eyebrow: "Perjalanan yang Ditulis Perlahan",

    title: "Kisah kami, dalam empat babak.",

    chapters: [
      {
        id: "first-meeting",

        year: "2019",

        date: "Pertengahan 2019",

        eyebrow: "Awal Mula",

        title: "Sapa pertama.",

        story:
          "Tidak ada yang benar-benar istimewa pada hari itu, sampai sebuah percakapan sederhana perlahan menjadi awal dari sesuatu yang tidak pernah kami rencanakan.",

        location: "Poso",

        align: "left",

        tone: "ivory",
      },

      {
        id: "closer",

        year: "2024",

        date: "Akhir 2024",

        eyebrow: "Semakin Dekat",

        title: "Sedikit lebih dekat.",

        story:
          "Tahun 2023 dan 2024 kami sempat berjalan di jalur masing-masing, hingga takdir kembali mempertemukan di penghujung 2024. Dari pertemuan itulah tumbuh rasa yang menjadi awal kisah kami berdua.",

        location: "Poso",

        align: "right",

        tone: "garden",
      },

      {
        id: "promise",

        year: "2025",

        date: "Pertengahan 2025",

        eyebrow: "Sebuah Janji",

        title: "Memilih kita.",

        story:
          "Kami mulai berniat melangkah ke jenjang yang lebih serius. Sejak itu kami bersama-sama menyiapkan segala sesuatunya, sedikit demi sedikit, menuju hari yang kami impikan.",

        location: "Poso",

        align: "left",

        tone: "golden",
      },

      {
        id: "forever",

        year: "2026",

        date: "13 September 2026",

        eyebrow: "Awal dari Selamanya",

        title: "Dan kini, selamanya.",

        story:
          "Setelah semua perjalanan yang membawa kami sampai di sini, kini kami ingin memulai bab baru: berjalan dalam satu arah, membangun satu rumah, dan menulis cerita yang sama.",

        location: "Poso",

        align: "right",

        tone: "garden",
      },
    ],

    closing: {
      eyebrow: "Semua Jalan Menuju Ke Sini",

      title: "Dan bab terindah belum selesai ditulis.",

      message:
        "Apa yang bermula sebagai dua perjalanan kini menjadi satu kisah yang kami pilih untuk dilanjutkan bersama.",
    },
  },

  gallery: {
    eyebrow: "Serpihan Kenangan",

    title: "Gallery",

    subtitle:
      "Kumpulan momen sederhana, tawa, perjalanan, dan segala hal di antaranya.",

    items: [
      {
        id: "memory-01",
        alt: "Nahdya dan Ari berjalan bersama",
        image: "/art/gallery/memory-01.webp",
        year: "2019",
        location: "Poso",
        caption: "Ada awal yang datang tanpa suara.",
        size: "portrait",
      },

      {
        id: "memory-02",
        alt: "Nahdya dan Ari dalam sebuah perjalanan",
        image: "/art/gallery/memory-03.webp",
        year: "2023",
        location: "Sulawesi Tengah",
        caption: "Seribu petualangan kecil.",
        size: "landscape",
        objectPosition: "50% 50%",
      },

      {
        id: "memory-03",
        image: "/art/gallery/memory-02.webp",
        alt: "Potret tenang Nahdya dan Ari",
        year: "2024",
        caption: "Hangat yang lahir dari hari-hari biasa.",
        size: "tall",
        objectPosition: "0% 50%",
      },

      {
        id: "memory-04",
        image: "/art/gallery/memory-04.webp",
        alt: "Potret dari perjalanan mereka",
        year: "2025",
        caption: "Menemukan rumah pada seseorang.",
        size: "portrait",
      },

      {
        id: "memory-05",
        image: "/art/gallery/memory-05.webp",
        alt: "Nahdya dan Ari bersama",
        year: "2025",
        location: "Indonesia",
        caption: "Setiap musim membawa kami lebih dekat.",
        size: "landscape",
        objectPosition: "0% 20%",
      },

      {
        id: "memory-06",
        image: "/art/gallery/memory-06.webp",
        alt: "Potret prewedding Nahdya dan Ari",
        year: "2026",
        location: "Poso",
        caption: "Tepat sebelum selamanya dimulai.",
        size: "tall",
      },
    ],

    closing: {
      eyebrow: "Kenangan yang Kami Simpan",

      title: "Sebagian kenangan tak perlu kata.",

      message:
        "Ia hanya tinggal, diam-diam menjadi bagian dari kisah yang kami bawa ke depan.",
    },
  },

  interaction: {
    rsvp: {
      eyebrow: "Konfirmasi Kehadiran",

      title: "Berkenankah Anda hadir?",

      message:
        "Kehadiran Anda adalah kebahagiaan bagi kami. Mohon konfirmasi agar kami dapat menyambut Anda dengan sebaik-baiknya.",

      maxGuests: 4,
    },

    wishes: {
      eyebrow: "Buku Tamu",

      title: "Tinggalkan doa untuk awal baru kami.",

      message:
        "Setiap doa dan harapan yang Anda tuliskan akan kami simpan sebagai bagian dari cerita ini.",
    },

    gifts: {
      enabled: true,

      eyebrow: "Hadiah Pernikahan",

      title: "Kehadiran Anda adalah hadiah terindah.",

      message:
        "Bagi Bapak/Ibu/Saudara/i yang ingin mengirimkan tanda kasih, berikut kami sertakan informasinya dengan penuh rasa terima kasih.",

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
        label: "Alamat Pengiriman Hadiah",
        value:
          "JQ44+37V, Gebang Rejo, Poso Kota, Kabupaten Poso, Sulawesi Tengah 94612",
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
      { id: "beginning", label: "Pembuka" },
      { id: "couple", label: "Mempelai" },
      { id: "day", label: "Hari Bahagia" },
      { id: "story", label: "Kisah Kami" },
      { id: "memories", label: "Kenangan" },
      { id: "rsvp", label: "Kehadiran" },
      { id: "closing", label: "Penutup" },
    ],
  },

  closing: {
    eyebrow: "Dengan Penuh Cinta",

    title: "Terima kasih telah menjadi bagian dari kisah kami.",

    message:
      "Doa, kehadiran, dan kasih sayang Anda berarti lebih dari yang mampu kami ucapkan.",

    signature: "Nahdya & Ari",

    portrait: "/art/closing/couple.webp",
  },

  breaks: [
    {
      id: "break-journey",

      eyebrow: "Dua Warisan, Satu Perjalanan",

      lines: ["Dua jiwa.", "Satu perjalanan.", "Seumur hidup di depan."],

      image: "/art/gallery/memory-05.webp",

      objectPosition: "50% 35%",
    },

    {
      id: "break-vow",

      eyebrow: "Menuju Hari Itu",

      lines: ["Dari dua tanah,", "menuju satu rumah."],

      image: "/art/gallery/memory-03.webp",

      objectPosition: "50% 45%",
    },
  ],

  quote: {
    eyebrow: "Sebuah Doa",

    text: "Dari apa pun jiwa kami diciptakan, jiwanya dan jiwaku adalah sama.",

    author: "Nahdya & Ari",

    image: "/art/gallery/memory-06.webp",

    objectPosition: "50% 40%",
  },
};
