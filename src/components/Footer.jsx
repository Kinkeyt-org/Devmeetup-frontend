import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Ticket, 
  Mail, 
  ArrowRight, 
  Sparkles 
} from "lucide-react";
import { 
  FaGithub, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin 
} from "react-icons/fa";
import SubscribeForm from "./SubscribeForm";

const Footer = () => {

  return (
    <footer className="w-full bg-neutral-50 dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-900 font-sans transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        
        {/* UPPER ROW: Brand + Links + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-200 dark:border-neutral-900">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Ticket className="w-5 h-5 text-white dark:text-black" />
              </div>
              <span className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-1.5">
                Nexus
                <Sparkles size={14} className="text-amber-500 fill-amber-500 animate-pulse" />
              </span>
            </Link>
            
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-sm">
              Connecting communities, hosting tech summits, design jams, and local meetups. Discover experiences that move you.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {[
                { Icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
                { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
                { Icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: FaGithub, href: "https://github.com", label: "GitHub" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-neutral-200 hover:bg-neutral-900 hover:text-white dark:bg-neutral-900 dark:hover:bg-white dark:hover:text-black flex items-center justify-center transition-all duration-300 text-neutral-500 dark:text-neutral-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/events" className="hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
                  Explore Events
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/my-tickets" className="hover:text-white dark:hover:text-white transition-colors duration-200">
                  My Tickets
                </Link>
              </li>
            </ul>
          </div>

          {/* HOST LINKS */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">Organizers</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/become-organizer" className="hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
                  Become Organizer
                </Link>
              </li>
              <li>
                <Link to="/events/create" className="hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/upgrade" className="hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
                  Upgrade Account
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">Stay Updated</h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Subscribe to get notified about trending meetups and exclusive events in your area.
            </p>
            
            <SubscribeForm className="mt-2" />
          </div>

        </div>

        {/* LOWER ROW: Copyright + Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-neutral-400 dark:text-neutral-500">
          <p>© {new Date().getFullYear()} Nexus. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/support/terms" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/support/terms" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
