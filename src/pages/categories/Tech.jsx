import React from "react";
import { Cpu } from "lucide-react";
import CategoryTemplate from "../../components/CategoryTemplate";

const MOCK_EVENTS = [
  {
    id: "m1",
    title: "AI & Machine Learning Summit 2024",
    event_date_human: "Sat, Jun 15 • 10:00 AM",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "physical",
  },
  {
    id: "m2",
    title: "React Developer Conference",
    event_date_human: "Wed, Jul 10 • 9:00 AM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    type: "virtual",
  },
  {
    id: "m3",
    title: "Web3 Hackathon: Building the Future",
    event_date_human: "Fri, Aug 05 • 6:00 PM",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    type: "physical",
  },
  {
    id: "m4",
    title: "Cybersecurity Best Practices Workshop",
    event_date_human: "Mon, Sep 12 • 2:00 PM",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    type: "physical",
  },
  {
    id: "m5",
    title: "Tech Startup Pitch Night",
    event_date_human: "Thu, Oct 20 • 7:00 PM",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
    type: "physical",
  },
  {
    id: "m6",
    title: "Cloud Computing Expo",
    event_date_human: "Tue, Nov 15 • 10:00 AM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    type: "virtual",
  }
];

export default function Tech() {
  return (
    <CategoryTemplate
      name="Tech"
      seoDescription="Discover popular Tech events, workshops, hackathons, and meetups. Join the builder community today."
      seoKeywords="tech events, programming, hackathons, developer meetups, software engineering"
      heroImage="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop"
      description="Join a hackathon, jam on product design, and meet fellow tinkerers in the industry of tomorrow."
      accentGradient="from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500"
      accentColor="text-cyan-500 dark:text-cyan-400"
      accentGlow="focus-within:ring-cyan-500 dark:focus-within:ring-cyan-400 shadow-cyan-500/10 dark:shadow-cyan-400/5"
      statIcon={Cpu}
      statCount="4K"
      statLabel="Events"
      subCount="38K"
      subLabel="Subscribers"
      events={MOCK_EVENTS}
    />
  );
}
