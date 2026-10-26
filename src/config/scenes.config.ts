import type { SceneConfig } from "./types";
export const scenes: SceneConfig[] = [
  {
    id: "blessings",
    label: "Blessings",
    eyebrow: "With divine grace",
    title: "A blessed beginning",
    enabled: true,
  },
  {
    id: "invitation",
    label: "The invitation",
    eyebrow: "Two families. One beautiful beginning.",
    title: "Together, with love",
    enabled: true,
  },
  {
    id: "venue",
    label: "The venue",
    eyebrow: "A place to gather, a day to remember",
    title: "You are warmly welcomed",
    enabled: true,
  },
  {
    id: "itinerary",
    label: "Sweet moments",
    eyebrow: "A day to remember",
    title: "Sweet Moments",
    enabled: true,
  },
  {
    id: "family",
    label: "With love",
    eyebrow: "With best compliments from",
    title: "Our hearts await you",
    enabled: true,
  },
];
export const assets = {
  palace: "/art/heritage-palace.webp",
  palaceAlt:
    "An imagined Punjabi heritage courtyard with floral garlands; decorative illustration, not a photograph of Satyam Palace",
};
export const motionSettings = {
  openingDuration: 1.25,
  revealDuration: 0.65,
  revealDistance: 24,
};
