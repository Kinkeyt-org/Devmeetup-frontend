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
];

const MEETING_PLATFORMS = [
  { keywords: ["zoom.us"], name: "Zoom", color: "#2D8CFF" },
  { keywords: ["meet.google"], name: "Google Meet", color: "#00897B" },
  { keywords: ["teams.microsoft"], name: "Microsoft Teams", color: "#6264A7" },
  { keywords: ["discord.gg", "discord.com"], name: "Discord", color: "#5865F2" },
  { keywords: ["webex"], name: "Webex", color: "#00BCF2" },
  { keywords: ["whereby.com"], name: "Whereby", color: "#2D2D2D" },
  { keywords: ["meet.jit.si"], name: "Jitsi Meet", color: "#1D76BC" },
  { keywords: ["youtube.com", "youtu.be"], name: "YouTube", color: "#FF0000" },
  { keywords: ["twitch.tv"], name: "Twitch", color: "#9146FF" },
];

export function getLinkPreviewData(value = "") {
  const raw = String(value || "").trim();
  if (!raw) return null;

  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const parsed = new URL(candidate);
    const host = parsed.hostname.replace(/^www\./i, "");
    const platform = getMeetingPlatform(parsed.toString());

    return {
      raw,
      href: parsed.toString(),
      host,
      platform,
      favicon: `https://www.google.com/s2/favicons?domain=${host}&sz=64`,
    };
  } catch {
    return { raw, href: raw, host: raw, platform: null, favicon: null };
  }
}

export function getMeetingPlatform(url = "") {
  const host = String(url || "").toLowerCase();
  return MEETING_PLATFORMS.find((platform) =>
    platform.keywords.some((keyword) => host.includes(keyword))
  ) || null;
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

export function isOnlineEvent(event = {}, coords = null) {
  const explicitType = String(event?.event_type || event?.type || "").toLowerCase();

  if (["virtual", "online", "hybrid"].includes(explicitType)) return true;
  if (["physical", "offline"].includes(explicitType)) return false;
  if (event?.is_online || event?.is_virtual) return true;
  if (coords?.lat && coords?.lng) return false;

  const category = String(event?.category || event?.event_category || "").trim().toLowerCase();
  const tags = Array.isArray(event?.tags) ? event.tags : [];
  const tagText = tags
    .map((tag) => String(tag || "").trim().toLowerCase())
    .join(" ");
  const location = String(event?.location || "").trim().toLowerCase();
  const categoryText = `${category} ${tagText}`.trim().toLowerCase();

  if (!location && !categoryText) return false;
  if (["online", "virtual", "google meet", "zoom", "teams", "meet"].includes(location)) return true;
  if (categoryText.includes("online") || categoryText.includes("virtual")) return true;
  if (/^https?:\/\//i.test(location)) return true;

  return ONLINE_KEYWORDS.some((keyword) => location.includes(keyword));
}
