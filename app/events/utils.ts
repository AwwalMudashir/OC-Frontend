import type { EventItem } from "../types/education";

const YOUTUBE_ID_PATTERN =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i;

export function formatEventDate(dateValue: string) {
  if (!dateValue) {
    return "Date unavailable";
  }

  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(parsed);
}

export function resolveEventImage(imageUrl: string) {
  if (!imageUrl) {
    return "/oroye_vert_4.jpg";
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return `/api/event-image?path=${encodeURIComponent(imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`)}`;
}

export function getEventImages(event: EventItem) {
  const directImages = Array.isArray(event.imageUrls)
    ? event.imageUrls.filter((image): image is string => typeof image === "string" && image.trim().length > 0)
    : [];

  if (directImages.length > 0) {
    return directImages;
  }

  if (typeof event.imageUrl === "string" && event.imageUrl.trim().length > 0) {
    return [event.imageUrl];
  }

  return [];
}

export function getPrimaryEventImage(event: EventItem) {
  return getEventImages(event)[0] ?? "";
}

export function extractYouTubeId(videoLink?: string | null) {
  if (!videoLink) {
    return null;
  }

  const trimmedLink = videoLink.trim();
  if (!trimmedLink) {
    return null;
  }

  const match = trimmedLink.match(YOUTUBE_ID_PATTERN);
  return match?.[1] ?? null;
}

export function getYouTubeEmbedUrl(videoLink?: string | null) {
  const videoId = extractYouTubeId(videoLink);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

export function hasEventVideo(event: EventItem) {
  return Boolean(extractYouTubeId(event.videoLink));
}

export function normalizeEventItem(event: EventItem) {
  const normalizedImages = getEventImages(event);

  return {
    ...event,
    imageUrl: normalizedImages[0] ?? event.imageUrl ?? "",
    imageUrls: normalizedImages,
    videoLink: event.videoLink?.trim() || null,
  } satisfies EventItem;
}