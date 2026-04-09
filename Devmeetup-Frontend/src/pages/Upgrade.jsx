import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const BecomeOrganizer = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    orgName: "",
    bio: "",
    website: "",
    category: "tech",
    agree: false,
  });

  const handleChange = (e) => {
    setError("");
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!form.agree) {
      setError("You must agree to continue.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // simulate API call → replace with real API
      await new Promise((res) => setTimeout(res, 1500));

      // after success → upgrade user role + redirect
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="hero"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/80 to-slate-50" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Become an Event Organizer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-base text-slate-600"
          >
            Create events, grow your audience, and build your own community.
            Set up your organizer profile in less than 2 minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex justify-center gap-3"
          >
            <button
              onClick={() => setStep(1)}
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-slate-800"
            >
              Start Setup
            </button>

            <button
              onClick={() => navigate(-1)}
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300"
            >
              Go Back
            </button>
          </motion.div>
        </div>
      </section>

      {/* ONBOARDING CARD */}
      <main className="mx-auto max-w-3xl px-4 pb-20">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {/* STEP INDICATOR */}
          <div className="mb-8 flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= s
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {s}
                </div>
                {s !== 3 && (
                  <div className="h-[2px] w-10 bg-slate-100" />
                )}
              </div>
            ))}
          </div>

          {/* STEP CONTENT */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <h2 className="text-xl font-semibold">
                  Tell us about your organization
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  This helps attendees recognize you as a trusted host.
                </p>

                <input
                  name="orgName"
                  value={form.orgName}
                  onChange={handleChange}
                  placeholder="Organization or personal brand name"
                  className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                />

                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Short bio about you or your events"
                  className="mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <h2 className="text-xl font-semibold">
                  Add optional details
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  These help build trust and credibility.
                </p>

                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="Website (optional)"
                  className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                />

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <option value="tech">Tech</option>
                  <option value="business">Business</option>
                  <option value="education">Education</option>
                  <option value="lifestyle">Lifestyle</option>
                </select>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <h2 className="text-xl font-semibold">
                  Final step
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Accept terms and complete setup.
                </p>

                <label className="mt-5 flex items-start gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  I agree to host events responsibly and follow platform rules.
                </label>

                {error && (
                  <p className="mt-3 text-sm text-red-500">{error}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                onClick={back}
                className="rounded-xl border border-slate-200 px-5 py-2 text-sm"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={next}
                className="rounded-xl bg-slate-950 px-5 py-2 text-sm text-white"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-xl bg-slate-950 px-5 py-2 text-sm text-white"
              >
                {loading ? "Setting up..." : "Become Organizer"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BecomeOrganizer;