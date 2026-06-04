import React from "react";
import { Smile } from "lucide-react";
import CategoryTemplate from "../../components/CategoryTemplate";

const MOCK_EVENTS = [
  {
    id: "l1",
    title: "Morning Yoga Retreat",
    event_date_human: "Sat, Jul 02 • 7:00 AM",
    location: "Malibu, CA",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    type: "physical",
  },
  {
    id: "l2",
    title: "Urban Photography Walk",
    event_date_human: "Sun, Jul 10 • 4:00 PM",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&q=80",
    type: "physical",
  },
  {
    id: "l3",
    title: "Mindfulness & Meditation Online",
    event_date_human: "Wed, Aug 05 • 8:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80",
    type: "virtual",
  },
  {
    id: "l4",
    title: "Gourmet Cooking Masterclass",
    event_date_human: "Fri, Sep 15 • 6:30 PM",
    location: "Paris, FR",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80",
    type: "physical",
  },
  {
    id: "l5",
    title: "Minimalist Living Workshop",
    event_date_human: "Thu, Oct 20 • 7:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&q=80",
    type: "virtual",
  },
  {
    id: "l6",
    title: "Coffee Tasting Experience",
    event_date_human: "Sat, Nov 12 • 10:00 AM",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
    type: "physical",
  }
];

export default function Lifestyle() {
  return (
    <CategoryTemplate
      name="Lifestyle"
      seoDescription="Discover local lifestyle events, cooking masterclasses, wellness retreats, and coffee tasting meetups."
      seoKeywords="lifestyle events, wellness, cooking masterclass, coffee tasting, local gatherings"
      heroImage="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      description="Enrich your daily life with wellness retreats, incredible culinary experiences, culture trips, and mindful gatherings."
      accentGradient="from-amber-400 to-orange-600 dark:from-amber-300 dark:to-orange-500"
      accentColor="text-amber-500 dark:text-amber-400"
      accentGlow="focus-within:ring-amber-500 dark:focus-within:ring-amber-400 shadow-amber-500/10 dark:shadow-amber-400/5"
      statIcon={Smile}
      statCount="12K"
      statLabel="Events"
      subCount="90K"
      subLabel="Enthusiasts"
      events={MOCK_EVENTS}
    />
  );
}
