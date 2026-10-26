export interface Person {
  fullName: string;
  father: string;
  mother: string;
  hometown?: string;
}
export interface Venue {
  id: string;
  name: string;
  address: string;
  mapsUrl?: string;
  label: string;
}
export type EventKind =
  "baraat" | "anand" | "lunch" | "vidaai" | "dance" | "welcome";
export interface WeddingEvent {
  id: string;
  name: string;
  time: string;
  description: string;
  kind: EventKind;
  venueId?: string;
  date?: string;
  illustrative?: boolean;
}
export interface WeddingData {
  slug: string;
  groom: Person;
  bride: Person;
  date: string;
  timezone: string;
  host: { name: string; relationship: string; invitation: string };
  scripture: { text: string; attribution: string; sourceUrl: string };
  printedBlessing: { lines: string[]; label: string };
  invocation: string;
  messages: {
    blessing: string;
    punjabi: string;
    closing: string;
    children?: string;
  };
  family: string[];
  venues: Venue[];
  events: WeddingEvent[];
  optional: {
    reception?: WeddingEvent;
    photos: { src: string; alt: string; width: number; height: number }[];
    music?: { src: string; title: string };
    contacts: { name: string; phone?: string; email?: string }[];
    rsvp: { enabled: boolean; url?: string; label: string };
  };
}
export interface ThemeConfig {
  colors: {
    maroon: string;
    gold: string;
    ivory: string;
    saffron: string;
    green: string;
  };
  fonts: { heading: string; body: string; punjabi: string };
}
export interface SceneConfig {
  id: "blessings" | "invitation" | "venue" | "itinerary" | "family";
  label: string;
  eyebrow: string;
  title: string;
  enabled: boolean;
}
