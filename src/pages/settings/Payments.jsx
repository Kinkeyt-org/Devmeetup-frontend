import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Plus, History, ChevronRight, Wallet } from "lucide-react";

const Payments = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F9FB] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans pb-24">
      <nav className="sticky top-0 z-40 bg-[#F9F9FB]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-200/60 dark:border-white/5 px-4 h-16 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        </button>
        <span className="text-[16px] font-semibold tracking-tight">Payments & Payouts</span>
        <div className="w-9" />
      </nav>

      <main className="max-w-2xl mx-auto px-4 mt-8">
        <div className="space-y-6">
          {/* PAYMENT METHODS */}
          <div className="bg-white dark:bg-neutral-900 rounded-[1.5rem] border border-neutral-200/60 dark:border-white/5 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-neutral-400" />
                Payment Methods
              </h2>
              <button className="text-sm font-semibold text-black dark:text-white flex items-center gap-1 hover:underline">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center font-bold text-[10px] text-neutral-500">VISA</div>
                <div>
                  <p className="font-semibold">•••• 4242</p>
                  <p className="text-xs text-neutral-500">Expires 12/26</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Default</span>
            </div>
          </div>

          {/* HISTORY */}
          <div className="bg-white dark:bg-neutral-900 rounded-[1.5rem] border border-neutral-200/60 dark:border-white/5 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-100 dark:border-white/5">
              <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                <History className="w-5 h-5 text-neutral-400" />
                Transaction History
              </h2>
            </div>
            <div className="p-4 text-center py-12">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-neutral-300" />
              </div>
              <p className="text-neutral-500 font-medium">No recent transactions</p>
              <p className="text-xs text-neutral-400 mt-1">Your ticket purchases will appear here.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payments;
