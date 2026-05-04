import React, { useState } from "react";

const PaymentIcon = {
  Lock: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round" />
    </svg>
  ),
  X: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  ),
};



export const PaymentSheet = ({ event, onClose, onSuccess }) => {
  const [step, setStep] = useState("pay");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [qty] = useState(1);

  const formatCard = (v) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (v) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const handlePay = () => {
    setStep("processing");

    setTimeout(() => {
      setStep("done");
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1200);
    }, 1600);
  };

  const total = (event.price || 0) * qty;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center font-apple"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* SHEET */}
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-t-[2.5rem] shadow-2xl max-h-[92vh] overflow-y-auto animate-slideUp">

        {/* HANDLE */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
        </div>

        {/* HEADER */}
        {step === "pay" && (
          <div className="px-6 pb-6">

            <div className="flex justify-between items-start mb-5">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  Secure Checkout
                </p>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mt-1 line-clamp-1">
                  {event.title}
                </h2>
              </div>

              <button onClick={onClose} className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition">
                <PaymentIcon.X />
              </button>
            </div>



            {/* FORM SECTION */}
            <div className="mt-2 space-y-4">

              <div>
                <label className="text-xs text-neutral-400 dark:text-neutral-500">Cardholder</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white focus:outline-none text-sm dark:text-white"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 dark:text-neutral-500">Card Number</label>
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCard(e.target.value))}
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white focus:outline-none text-sm dark:text-white tracking-widest"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="text-xs text-neutral-400 dark:text-neutral-500">Expiry</label>
                  <input
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white focus:outline-none text-sm dark:text-white"
                    placeholder="MM/YY"
                  />
                </div>

                <div className="w-1/2">
                  <label className="text-xs text-neutral-400 dark:text-neutral-500">CVV</label>
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.slice(0, 3))}
                    type="password"
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white focus:outline-none text-sm dark:text-white"
                    placeholder="•••"
                  />
                </div>
              </div>
            </div>

            {/* PAY BUTTON (PRIMARY FOCUS) */}
            <button
              onClick={handlePay}
              className="mt-6 w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-semibold text-sm active:scale-[0.98] hover:opacity-90 transition"
            >
              Pay ₦{total.toLocaleString()}
            </button>

            {/* SECURITY */}
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-neutral-400 dark:text-neutral-500">
              <PaymentIcon.Lock />
              Secure encrypted payment
            </div>
          </div>
        )}

        {/* PROCESSING */}
        {step === "processing" && (
          <div className="py-20 text-center">
            <div className="w-12 h-12 border-4 border-neutral-200 dark:border-neutral-700 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="font-semibold dark:text-white">Processing payment</p>
          </div>
        )}

        {/* SUCCESS */}
        {step === "done" && (
          <div className="py-20 text-center">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-700 dark:text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-semibold text-lg dark:text-white">Payment successful</p>
          </div>
        )}
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.35s ease;
        }
      `}</style>
    </div>
  );
};