import React from "react";
import { Palette } from "lucide-react";
import CategoryTemplate from "../../components/CategoryTemplate";

const MOCK_EVENTS = [
  {
    id: "d1",
    title: "Global UI/UX Summit 2024",
    event_date_human: "Sat, Jun 22 • 10:00 AM",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    type: "physical",
  },
  {
    id: "d2",
    title: "Figma Advanced Masterclass",
    event_date_human: "Wed, Jul 15 • 9:00 AM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    type: "virtual",
  },
  {
    id: "d3",
    title: "The Typography Conference",
    event_date_human: "Fri, Aug 12 • 6:00 PM",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?w=800&q=80",
    type: "physical",
  },
  {
    id: "d4",
    title: "Brand Identity Workshop",
    event_date_human: "Mon, Sep 05 • 2:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
    type: "virtual",
  },
  {
    id: "d5",
    title: "Creative Directors Meetup",
    event_date_human: "Thu, Oct 10 • 7:00 PM",
    location: "Berlin, DE",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    type: "physical",
  },
  {
    id: "d6",
    title: "Future of Product Design",
    event_date_human: "Tue, Nov 22 • 10:00 AM",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "physical",
  }
];

export default function Design() {
  return (
    <CategoryTemplate
      name="Design"
      seoDescription="Discover creative design events, UI/UX workshops, and typography meetups. Connect with top creators."
      seoKeywords="design events, UI/UX, product design, creative meetups, graphic design"
      heroImage="https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      description="Connect with fellow creatives, explore the latest UI/UX trends, and elevate your design skills in the industry's top events."
      accentGradient="from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500"
      accentColor="text-purple-500 dark:text-purple-400"
      accentGlow="focus-within:ring-purple-500 dark:focus-within:ring-purple-400 shadow-purple-500/10 dark:shadow-purple-400/5"
      statIcon={Palette}
      statCount="2.5K"
      statLabel="Events"
      subCount="25K"
      subLabel="Creators"
      events={MOCK_EVENTS}
    />
  );
}
