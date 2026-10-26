import type { WeddingData } from "./types";
/** Transcribed from the two supplied printed cards. Content here overrides the original demo brief. */
export const wedding: WeddingData = {
  slug: "amritpal-akamdeep",
  groom: {
    fullName: "Amritpal Singh",
    father: "S. Jaimal Singh",
    mother: "Sardarni Rajvinder Kaur",
    hometown: "Sirsa",
  },
  bride: {
    fullName: "Akamdeep Kaur",
    father: "S. Sukhdev Singh",
    mother: "Sardarni Narinder Kaur",
  },
  date: "2026-11-04",
  timezone: "Asia/Kolkata",
  host: {
    name: "Sardar Satnam Singh Nagi",
    relationship: "his beloved granddaughter",
    invitation:
      "requests the honour of your presence and blessings on the auspicious occasion of the marriage of",
  },
  invocation: "ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ",
  scripture: {
    text: "ਲਖ ਖੁਸੀਆ ਪਾਤਿਸਾਹੀਆ ਜੇ ਸਤਿਗੁਰੁ ਨਦਰਿ ਕਰੇਇ ॥",
    attribution: "Sri Guru Granth Sahib Ji · Ang 44",
    sourceUrl:
      "https://www.srigranth.org/servlet/gurbani.gurbani?Action=Page&Param=44",
  },
  // The printed card's separate devotional wording is preserved without attributing it to SGGS.
  printedBlessing: {
    label: "Blessing from the family’s invitation",
    lines: [
      "ਸਤਿਗੁਰ ਦਾਤੇ ਕਾਜ ਰਚਾਇਆ, ਆਪਣੀ ਮਿਹਰ ਕਰਾਈ।",
      "ਦਾਸਾਂ ਕਾਰਜ ਆਪ ਸਵਾਰੇ, ਇਹ ਉਸ ਦੀ ਵਡਿਆਈ।",
    ],
  },
  messages: {
    blessing:
      "With the blessings of Waheguru Ji, two families come together to celebrate a beautiful new beginning.",
    punjabi: "ਆਪ ਜੀ ਨੂੰ ਸਾਡੇ ਪਰਿਵਾਰ ਵੱਲੋਂ ਨਿੱਘਾ ਸੱਦਾ।",
    closing: "Your presence is our most cherished blessing.",
  },
  family: ["All Nagi & Sohal Family", "Relatives & Friends"],
  venues: [
    {
      id: "palace",
      name: "Satyam Palace",
      address: "Hisar Road, Sirsa",
      label: "Wedding venue",
    },
  ],
  // Array order is deliberate: never sort automatically. No separate Gurdwara was printed.
  events: [
    {
      id: "baraat",
      name: "Reception of Barat",
      time: "09:15",
      kind: "baraat",
      venueId: "palace",
      description:
        "A warm welcome as the Barat arrives and two families come together.",
    },
    {
      id: "anand",
      name: "Anand Karaj",
      time: "11:15",
      kind: "anand",
      description:
        "Join the families in offering blessings for this sacred new beginning.",
    },
    {
      id: "lunch",
      name: "Lunch",
      time: "13:15",
      kind: "lunch",
      venueId: "palace",
      description:
        "Share a meal, warm conversations, and the joy of being together.",
    },
    {
      id: "doli",
      name: "Doli",
      time: "16:15",
      kind: "vidaai",
      description:
        "With love and blessings, a heartfelt farewell and a new chapter.",
    },
  ],
  optional: {
    photos: [],
    contacts: [],
    rsvp: { enabled: false, label: "RSVP" },
  },
};
