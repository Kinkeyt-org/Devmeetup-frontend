import React from "react";
import { GraduationCap } from "lucide-react";
import CategoryTemplate from "../../components/CategoryTemplate";

const MOCK_EVENTS = [
  {
    id: "e1",
    title: "Future of EdTech Conference",
    event_date_human: "Wed, Aug 10 • 9:00 AM",
    location: "Boston, MA",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    type: "physical",
  },
  {
    id: "e2",
    title: "Global Student Symposium",
    event_date_human: "Fri, Sep 16 • 10:00 AM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    type: "virtual",
  },
  {
    id: "e3",
    title: "Ivy League Admissions Workshop",
    event_date_human: "Sat, Oct 08 • 2:00 PM",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    type: "physical",
  },
  {
    id: "e4",
    title: "Machine Learning for Researchers",
    event_date_human: "Mon, Nov 14 • 1:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    type: "virtual",
  },
  {
    id: "e5",
    title: "Higher Ed Leadership Summit",
    event_date_human: "Thu, Dec 01 • 9:30 AM",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    type: "physical",
  },
  {
    id: "e6",
    title: "Language Learning Mastery",
    event_date_human: "Tue, Jan 17 • 6:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    type: "virtual",
  }
];

export default function Education() {
  return (
    <CategoryTemplate
      name="Education"
      seoDescription="Discover educational events, academic workshops, language learning meetups, and student research seminars."
      seoKeywords="education events, academic seminars, edtech conference, workshops, learning"
      heroImage="https://images.pexels.com/photos/6193147/pexels-photo-6193147.jpeg"
      description="Expand your horizons, learn new skills, and connect with fellow learners through our curated educational workshops and seminars."
      accentGradient="from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500"
      accentColor="text-blue-500 dark:text-blue-400"
      accentGlow="focus-within:ring-blue-500 dark:focus-within:ring-blue-400 shadow-blue-500/10 dark:shadow-blue-400/5"
      statIcon={GraduationCap}
      statCount="1.2K"
      statLabel="Events"
      subCount="12K"
      subLabel="Students"
      events={MOCK_EVENTS}
    />
  );
}
