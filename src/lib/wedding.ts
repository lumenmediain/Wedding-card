import type { Venue } from "../config/types";
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
export function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}
export function directionsUrl(venue: Venue) {
  if (venue.mapsUrl) {
    try {
      const url = new URL(venue.mapsUrl);
      if (
        url.protocol === "https:" &&
        (url.hostname === "maps.app.goo.gl" ||
          url.hostname === "maps.google.com" ||
          url.hostname === "www.google.com" ||
          url.hostname === "google.com")
      )
        return url.toString();
    } catch {}
  }
  return venue.name.trim() && venue.address.trim()
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.name}, ${venue.address}`)}`
    : undefined;
}
export function safeExternalUrl(value?: string) {
  try {
    const u = new URL(value || "");
    return u.protocol === "https:" ? u.toString() : undefined;
  } catch {
    return undefined;
  }
}
