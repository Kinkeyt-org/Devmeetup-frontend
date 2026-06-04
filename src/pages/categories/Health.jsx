import React from "react";
import { Heart } from "lucide-react";
import CategoryTemplate from "../../components/CategoryTemplate";

const MOCK_EVENTS = [
  {
    id: "h1",
    title: "Global Wellness Summit",
    event_date_human: "Sat, Aug 20 • 8:00 AM",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    type: "physical",
  },
  {
    id: "h2",
    title: "Mental Health First Aid",
    event_date_human: "Mon, Sep 12 • 1:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1544027993-37dbd58eae8e?w=800&q=80",
    type: "virtual",
  },
  {
    id: "h3",
    title: "Nutrition & Dietetics Expo",
    event_date_human: "Fri, Oct 07 • 10:00 AM",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    type: "physical",
  },
  {
    id: "h4",
    title: "Yoga Instructor Training",
    event_date_human: "Sat, Nov 05 • 7:00 AM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    type: "virtual",
  },
  {
    id: "h5",
    title: "Medical Tech Innovations",
    event_date_human: "Wed, Dec 14 • 9:00 AM",
    location: "San Diego, CA",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    type: "physical",
  },
  {
    id: "h6",
    title: "Holistic Healing Workshop",
    event_date_human: "Sun, Jan 22 • 2:00 PM",
    location: "Denver, CO",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
    type: "physical",
  }
];

export default function Health() {
  return (
    <CategoryTemplate
      name="Health"
      seoDescription="Discover wellness summits, mental health workshops, nutrition expos, and holistic healing gatherings."
      seoKeywords="health events, wellness summit, mental health workshop, nutrition, holistic healing"
      heroImage="https://images.pexels.com/photos/8376307/pexels-photo-8376307.jpeg"
      description="Focus on your well-being with fitness classes, mental health workshops, and groundbreaking medical symposiums."
      accentGradient="from-teal-400 to-emerald-500 dark:from-teal-300 dark:to-emerald-400"
      accentColor="text-teal-500 dark:text-teal-400"
      accentGlow="focus-within:ring-teal-500 dark:focus-within:ring-teal-400 shadow-teal-500/10 dark:shadow-teal-400/5"
      statIcon={Heart}
      statCount="9K"
      statLabel="Events"
      subCount="75K"
      subLabel="Enthusiasts"
      events={MOCK_EVENTS}
    />
  );
}
