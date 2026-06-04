import React from "react";
import { Briefcase } from "lucide-react";
import CategoryTemplate from "../../components/CategoryTemplate";

const MOCK_EVENTS = [
  {
    id: "b1",
    title: "Global Entrepreneurship Summit",
    event_date_human: "Sat, Jun 25 • 9:00 AM",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=800&q=80",
    type: "physical",
  },
  {
    id: "b2",
    title: "Startup Pitch & Networking",
    event_date_human: "Thu, Jul 14 • 6:30 PM",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    type: "physical",
  },
  {
    id: "b3",
    title: "Venture Capital Insider Q&A",
    event_date_human: "Mon, Aug 01 • 1:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    type: "virtual",
  },
  {
    id: "b4",
    title: "Corporate Strategy Masterclass",
    event_date_human: "Wed, Sep 21 • 10:00 AM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    type: "virtual",
  },
  {
    id: "b5",
    title: "Fintech Innovators Conference",
    event_date_human: "Fri, Oct 14 • 8:30 AM",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    type: "physical",
  },
  {
    id: "b6",
    title: "B2B Marketing Strategies",
    event_date_human: "Tue, Nov 08 • 4:00 PM",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&q=80",
    type: "physical",
  }
];

export default function Business() {
  return (
    <CategoryTemplate
      name="Business"
      seoDescription="Discover professional business events, startup pitch nights, and networking meetups. Scale your career."
      seoKeywords="business events, networking, startup pitch, entrepreneurship, professional development"
      heroImage="https://images.unsplash.com/photo-1474377207190-a7d8b3334068?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      description="Discover opportunities, expand your network, and scale your career through exclusive business and entrepreneurship events."
      accentGradient="from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500"
      accentColor="text-amber-500 dark:text-amber-400"
      accentGlow="focus-within:ring-amber-500 dark:focus-within:ring-amber-400 shadow-amber-500/10 dark:shadow-amber-400/5"
      statIcon={Briefcase}
      statCount="8K"
      statLabel="Events"
      subCount="65K"
      subLabel="Professionals"
      events={MOCK_EVENTS}
    />
  );
}
