import React from "react";
import { Users } from "lucide-react";
import CategoryTemplate from "../../components/CategoryTemplate";

const MOCK_EVENTS = [
  {
    id: "s1",
    title: "Singles Mixer & Rooftop Party",
    event_date_human: "Fri, Jul 22 • 8:00 PM",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
    type: "physical",
  },
  {
    id: "s2",
    title: "Virtual Speed Networking",
    event_date_human: "Tue, Aug 09 • 7:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    type: "virtual",
  },
  {
    id: "s3",
    title: "Board Game Night",
    event_date_human: "Thu, Sep 01 • 6:00 PM",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffaed?w=800&q=80",
    type: "physical",
  },
  {
    id: "s4",
    title: "Global Expats Meetup",
    event_date_human: "Sat, Oct 15 • 5:00 PM",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
    type: "physical",
  },
  {
    id: "s5",
    title: "Book Club: Fiction Lovers",
    event_date_human: "Sun, Nov 06 • 11:00 AM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
    type: "virtual",
  },
  {
    id: "s6",
    title: "Holiday Charity Gala",
    event_date_human: "Fri, Dec 16 • 7:30 PM",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80",
    type: "physical",
  }
];

export default function Social() {
  return (
    <CategoryTemplate
      name="Social"
      seoDescription="Discover social gatherings, speed networking mixers, expat meetups, and board game nights near you."
      seoKeywords="social events, mixers, networking, board game night, community gatherings"
      heroImage="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop"
      description="Meet new people, find your community, and make lasting memories at exciting social gatherings and mixers."
      accentGradient="from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500"
      accentColor="text-orange-500 dark:text-orange-400"
      accentGlow="focus-within:ring-orange-500 dark:focus-within:ring-orange-400 shadow-orange-500/10 dark:shadow-orange-400/5"
      statIcon={Users}
      statCount="15K"
      statLabel="Events"
      subCount="120K"
      subLabel="Members"
      events={MOCK_EVENTS}
    />
  );
}
