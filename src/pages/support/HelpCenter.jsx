import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, HelpCircle, MessageSquare, Search, ChevronRight, FileText } from "lucide-react";
import SEO from "../../components/SEO";

const HelpCenter = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F9FB] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans pb-24">
      <SEO 
        title="Help Center" 
        description="Find guides, documentation, and answers to common questions about hosting and attending events on Nexus." 
        url="https://devmeetup-frontend.vercel.app/support/help"
        keywords="help center, support, event guides, ticket refunds, organizer documentation"
      />
      <nav className="sticky top-0 z-40 bg-[#F9F9FB]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-200/60 dark:border-white/5 px-4 h-16 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        </button>
        <span className="text-[16px] font-semibold tracking-tight">Help Center</span>
        <div className="w-9" />
      </nav>

      <main className="max-w-2xl mx-auto px-4 mt-8">
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search for help..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/5 shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button className="p-6 bg-white dark:bg-neutral-900 rounded-[1.5rem] border border-neutral-200/60 dark:border-white/5 text-left hover:shadow-md transition-shadow">
            <MessageSquare className="w-6 h-6 text-purple-500 mb-3" />
            <h3 className="font-semibold">Contact Support</h3>
            <p className="text-xs text-neutral-500 mt-1">Chat with our team for help.</p>
          </button>
          <button className="p-6 bg-white dark:bg-neutral-900 rounded-[1.5rem] border border-neutral-200/60 dark:border-white/5 text-left hover:shadow-md transition-shadow">
            <FileText className="w-6 h-6 text-blue-500 mb-3" />
            <h3 className="font-semibold">Documentation</h3>
            <p className="text-xs text-neutral-500 mt-1">Guides for using the platform.</p>
          </button>
        </div>

        <h2 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white mb-4 ml-4">Popular Topics</h2>
        <div className="bg-white dark:bg-neutral-900 rounded-[1.5rem] border border-neutral-200/60 dark:border-white/5 overflow-hidden">
          {["How to buy tickets", "Organizing your first event", "Refund policy", "Account verification"].map((topic, i) => (
            <button key={topic} className="w-full flex items-center justify-between p-5 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors border-b last:border-0 border-neutral-100 dark:border-white/5">
              <span className="font-medium">{topic}</span>
              <ChevronRight className="w-4 h-4 text-neutral-300" />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;
