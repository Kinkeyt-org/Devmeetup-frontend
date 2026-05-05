import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Shield } from "lucide-react";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F9FB] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans pb-24">
      <nav className="sticky top-0 z-40 bg-[#F9F9FB]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-200/60 dark:border-white/5 px-4 h-16 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        </button>
        <span className="text-[16px] font-semibold tracking-tight">Terms & Privacy</span>
        <div className="w-9" />
      </nav>

      <main className="max-w-2xl mx-auto px-4 mt-8">
        <div className="bg-white dark:bg-neutral-900 rounded-[1.5rem] border border-neutral-200/60 dark:border-white/5 p-8 shadow-sm space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-neutral-400" />
              Terms of Service
            </h2>
            <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <p>Welcome to DevMeet. By using our platform, you agree to these terms.</p>
              <p>1. User Conduct: You are responsible for all content you post and events you organize.</p>
              <p>2. Ticket Sales: DevMeet acts as a facilitator for ticket sales. Refunds are subject to the organizer's policy.</p>
              <p>3. Account Security: You are responsible for maintaining the confidentiality of your login credentials.</p>
            </div>
          </section>

          <div className="h-px bg-neutral-100 dark:bg-white/5" />

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-neutral-400" />
              Privacy Policy
            </h2>
            <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <p>We value your privacy and are committed to protecting your personal data.</p>
              <p>1. Data Collection: We collect information you provide when creating an account and purchasing tickets.</p>
              <p>2. Data Usage: We use your data to improve our services and notify you about events.</p>
              <p>3. Third Parties: We do not sell your personal information to third parties.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Terms;
