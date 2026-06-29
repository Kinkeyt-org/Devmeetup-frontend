import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ONLINE_KEYWORDS = [
  "zoom.us",
  "meet.google",
  "teams.microsoft",
  "discord.gg",
  "discord.com",
  "twitch.tv",
  "youtube.com",
  "webex",
  "whereby.com",
  "streamyard",
  "hopin.com",
  "meet.jit.si",
  "online",
  "virtual",
];

export function isOnlineEvent(event = {}, coords = null) {
  const explicitType = String(event?.event_type || "").toLowerCase();

  if (["virtual", "online", "hybrid"].includes(explicitType)) return true;
  if (["physical", "offline"].includes(explicitType)) return false;
  if (event?.is_online || event?.is_virtual) return true;
  if (coords?.lat && coords?.lng) return false;

  const location = String(event?.location || "").trim().toLowerCase();
  if (!location) return false;
  if (["online", "virtual", "google meet", "zoom", "teams", "meet"].includes(location)) return true;
  if (/^https?:\/\//i.test(location)) return true;

  return ONLINE_KEYWORDS.some((keyword) => location.includes(keyword));
}

export function getOnlineMeetingLink(event = {}) {
  const candidates = [
    event?.meeting_link,
    event?.join_link,
    event?.virtual_link,
    event?.link,
    event?.location,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string") {
      const trimmed = candidate.trim();
      if (trimmed && /^https?:\/\//i.test(trimmed)) return trimmed;
    }
  }

  return "";
}

export function getLinkPreviewData(value = "") {
  const raw = String(value || "").trim();
  if (!raw) return null;

  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const parsed = new URL(candidate);
    return {
      raw,
      href: parsed.toString(),
      host: parsed.hostname.replace(/^www\./i, ""),
    };
  } catch {
    return { raw, href: raw, host: raw };
  }
}

export function getEventLocationLabel(event = {}, coords = null) {
  if (isOnlineEvent(event, coords)) {
    return getOnlineMeetingLink(event) || event?.location || "Online meeting link";
  }

  return event?.location || "Venue to be announced";
}

export function getEventModeLabel(event = {}, coords = null) {
  return isOnlineEvent(event, coords) ? "Online" : "Physical";
}

export function getNotificationTargetPath(notification = {}) {
  const candidates = [
    notification?.event_id,
    notification?.eventId,
    notification?.event?.id,
    notification?.event?.event_id,
    notification?.event?.slug,
    notification?.data?.event_id,
    notification?.data?.eventId,
    notification?.data?.id,
    notification?.data?.event?.id,
    notification?.link,
    notification?.url,
    notification?.path,
    notification?.target_url,
    notification?.targetPath,
  ];

  for (const candidate of candidates) {
    if (candidate === undefined || candidate === null || candidate === "") continue;

    if (typeof candidate === "number") {
      return `/events/${candidate}`;
    }

    if (typeof candidate === "string") {
      const trimmed = candidate.trim();
      if (!trimmed) continue;

      if (/^https?:\/\//i.test(trimmed)) {
        try {
          const parsed = new URL(trimmed);
          if (/^\/events\//i.test(parsed.pathname)) return parsed.pathname;
          if (/^\/events\//i.test(parsed.pathname.replace(/^\//, ""))) return `/${parsed.pathname.replace(/^\//, "")}`;
        } catch {
          // ignore
        }
      }

      if (/^\/events\//i.test(trimmed)) return trimmed;
      if (/^events\//i.test(trimmed)) return `/${trimmed}`;
      if (/^\d+$/.test(trimmed)) return `/events/${trimmed}`;
    }
  }

  return null;
}
