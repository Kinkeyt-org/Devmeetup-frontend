import React, { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

export default function SubscribeForm({ className = "" }) {
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
    <form onSubmit={handleSubscribe} className={`w-full ${className}`}>
      <div className="flex rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800/80 p-1.5 focus-within:border-neutral-400 dark:focus-within:border-neutral-700 transition duration-300 shadow-sm">
        <div className="flex items-center pl-2.5 text-neutral-400 dark:text-neutral-500">
          <Mail size={16} />
        </div>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent border-0 px-3 py-1.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          className="bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-xs font-medium px-4 py-2 rounded-lg transition duration-200 shrink-0 flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          {subscribed ? "Subscribed!" : (
            <>
              Subscribe <ArrowRight size={12} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
