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

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="w-full bg-neutral-950 text-neutral-400 border-t border-neutral-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        
        {/* UPPER ROW: Brand + Links + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Ticket className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
                Nexus
                <Sparkles size={14} className="text-amber-500 fill-amber-500 animate-pulse" />
              </span>
            </Link>
            
            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
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
                  className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300 text-neutral-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/events" className="hover:text-white transition-colors duration-200">
                  Explore Events
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white transition-colors duration-200">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/my-tickets" className="hover:text-white transition-colors duration-200">
                  My Tickets
                </Link>
              </li>
            </ul>
          </div>

          {/* HOST LINKS */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Organizers</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/become-organizer" className="hover:text-white transition-colors duration-200">
                  Become Organizer
                </Link>
              </li>
              <li>
                <Link to="/events/create" className="hover:text-white transition-colors duration-200">
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/upgrade" className="hover:text-white transition-colors duration-200">
                  Upgrade Account
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Stay Updated</h4>
            <p className="text-sm text-neutral-400">
              Subscribe to get notified about trending meetups and exclusive events in your area.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <div className="flex rounded-xl bg-neutral-900 border border-neutral-800 p-1.5 focus-within:border-neutral-700 transition duration-300">
                <div className="flex items-center pl-2.5 text-neutral-500">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 px-3 py-1.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-neutral-200 text-black text-xs font-medium px-4 py-2 rounded-lg transition duration-200 shrink-0 flex items-center gap-1.5 active:scale-95"
                >
                  {subscribed ? "Subscribed!" : (
                    <>
                      Subscribe <ArrowRight size={12} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* LOWER ROW: Copyright + Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Nexus. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/support/terms" className="hover:text-neutral-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/support/terms" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
