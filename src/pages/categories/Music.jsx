import React from "react";
import { Music as MusicIcon } from "lucide-react";
import CategoryTemplate from "../../components/CategoryTemplate";

const MOCK_EVENTS = [
  {
    id: "m1",
    title: "Summer Electronic Festival",
    event_date_human: "Fri, Jul 28 • 5:00 PM",
    location: "Las Vegas, NV",
    image: "https://images.unsplash.com/photo-1540039155732-68b209e51c8a?w=800&q=80",
    type: "physical",
  },
  {
    id: "m2",
    title: "Intimate Acoustic Sessions",
    event_date_human: "Sun, Aug 14 • 7:00 PM",
    location: "Nashville, TN",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    type: "physical",
  },
  {
    id: "m3",
    title: "Music Production Masterclass",
    event_date_human: "Wed, Sep 07 • 6:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    type: "virtual",
  },
  {
    id: "m4",
    title: "Jazz Night Under The Stars",
    event_date_human: "Sat, Oct 15 • 8:00 PM",
    location: "New Orleans, LA",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    type: "physical",
  },
  {
    id: "m5",
    title: "Global Choir Performance",
    event_date_human: "Sun, Nov 20 • 3:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    type: "virtual",
  },
  {
    id: "m6",
    title: "Indie Rock Showcase",
    event_date_human: "Fri, Dec 09 • 9:00 PM",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    type: "physical",
  }
];

export default function Music() {
  return (
    <CategoryTemplate
      name="Music"
      seoDescription="Discover electronic music festivals, acoustic sessions, jazz nights, and music production masterclasses."
      seoKeywords="music events, concerts, live music, jazz night, music production, festivals"
      heroImage="https://4kwallpapers.com/images/walls/thumbs_3t/413.jpg"
      description="Feel the rhythm at live concerts, intimate acoustic sessions, and massive electronic festivals around the globe."
      accentGradient="from-emerald-500 to-indigo-600 dark:from-emerald-400 dark:to-indigo-500"
      accentColor="text-emerald-500 dark:text-emerald-400"
      accentGlow="focus-within:ring-emerald-500 dark:focus-within:ring-emerald-400 shadow-emerald-500/10 dark:shadow-emerald-400/5"
      statIcon={MusicIcon}
      statCount="20K"
      statLabel="Events"
      subCount="150K"
      subLabel="Fans"
      events={MOCK_EVENTS}
    />
  );
}
