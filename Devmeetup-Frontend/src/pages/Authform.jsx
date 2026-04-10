import { useState } from "react";
import { login, signup } from "../api/auth";
import { useNavigate, useLocation } from "react-router-dom";

const GOOGLE_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const EYE_ICONS = {
  Visible: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Hidden: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  )
};

export default function Authform() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("signin");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [name, setName] = useState("");

  const icon = {
    Ticket: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><line x1="9" y1="9" x2="9" y2="15" /><line x1="15" y1="9" x2="15" y2="15" /></svg>
  };

  const handleRedirect = () => {
    navigate(location.state?.from || "/");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(email, password);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        handleRedirect();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await signup(name, email, password, password_confirmation);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        handleRedirect();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-white font-['Satoshi']">

      {/* LEFT SIDE */}
      <div className="hidden md:flex relative items-end p-12 bg-[#1d1d1f] text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-md">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
            EventHub
          </p>
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Discover experiences you’ll never forget.
          </h1>
          <p className="text-neutral-300">
            Find events that match your vibe and connect with people.
          </p>
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* LOGO */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center">
              {icon.Ticket()}
            </div>
            <span className="font-bold text-lg">EventHub</span>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
              {error}
            </div>
          )}

          {/* SIGN IN */}
          {mode === "signin" && (
            <>
              <h2 className="text-3xl font-bold mb-1">Welcome back</h2>
              <p className="text-neutral-500 text-sm mb-6">
                Sign in to continue
              </p>

              <button className="w-full flex items-center justify-center gap-3 border border-neutral-200 hover:bg-neutral-50 rounded-full py-3 text-sm font-medium transition mb-5">
                {GOOGLE_ICON} Sign in with Google
              </button>

              <form className="space-y-5" onSubmit={handleSignIn}>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-black"
                />

               <div className="relative group">
                  <input
                    type={showPass ? "text" : "password"} // Dynamic type
                    placeholder="Password"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3 pr-12 text-black placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)} // Toggle state
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                  >
                    {showPass ? <EYE_ICONS.Visible /> : <EYE_ICONS.Hidden />}
                  </button>
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs text-neutral-500 hover:text-black transition"
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-full font-bold"
                >
                  {loading ? "..." : "Sign in"}
                </button>

                {/* Forgot Password Link */}
              </form>
              <p className="text-sm text-neutral-500 mt-6">
                Don’t have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-black font-semibold"
                >
                  Create one
                </button>
              </p>
            </>
          )}

          {/* SIGN UP */}
          {mode === "signup" && (
            <>
              <h2 className="text-3xl font-bold mb-1">Create account</h2>
              <p className="text-neutral-500 text-sm mb-6">
                Join EventHub today
              </p>


              <button 
                type="button" 
                className="w-full flex items-center justify-center gap-3 border border-neutral-200 hover:bg-neutral-50 rounded-full py-3 text-sm font-medium transition mb-6"
              >
                {GOOGLE_ICON} Sign up with Google
              </button>

              {/* NEW: "OR" Divider */}
              <div className="relative flex items-center mb-6">
                <div className="grow border-t border-neutral-200"></div>
                <span className="shrink mx-4 text-xs font-medium text-neutral-400 uppercase tracking-widest">
                  or
                </span>
                <div className="grow border-t border-neutral-200"></div>
              </div>

              <form className="space-y-5" onSubmit={handleSignUp}>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3 text-sm"
                />

                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3 text-sm"
                />

                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3 text-sm"
                />

                <input
                  type="password"
                  required
                  placeholder="Confirm password"
                  value={password_confirmation}
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3 text-sm"
                />

                <button
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-full font-bold"
                >
                  {loading ? "..." : "Create account"}
                </button>
              </form>

              <p className="text-sm text-neutral-500 mt-6">
                Already have an account?{" "}
                <button
                  onClick={() => setMode("signin")}
                  className="text-black font-semibold"
                >
                  Sign in
                </button>
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}