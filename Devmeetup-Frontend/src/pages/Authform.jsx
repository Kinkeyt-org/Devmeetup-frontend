import { useState } from "react";
import { login, signup } from "../api/auth";
import { useNavigate } from "react-router-dom";

const GOOGLE_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function Authform() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login(email, password);
      // FIX: Store only the token string from the response
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/home");
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
      const data = await signup(name, email, password, password);
      // FIX: Store only the token string from the response
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-[Satoshi] bg-white">
      <div className="w-full max-w-md p-6">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-black font-bold text-lg">EventHub</span>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        {mode === "forgot" && (
          <div>
            <button onClick={() => { setMode("signin"); setForgotSent(false); setError(""); }} className="flex cursor-pointer items-center gap-2 hover:text-amber-400 text-sm mb-8 transition-colors text-neutral-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to sign in
            </button>
            {!forgotSent ? (
              <>
                <h2 className="text-black text-2xl font-bold mb-1">Reset password</h2>
                <p className="text-neutral-500 text-sm mb-8">Enter your email and we'll send you a reset link.</p>
                <form onSubmit={(e) => { e.preventDefault(); setForgotSent(true); }} className="space-y-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1.5 font-medium tracking-wide uppercase">Email address</label>
                    <input type="email" required value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="you@example.com" className="w-full border border-neutral-700 rounded-xl px-4 py-3 text-black placeholder-neutral-600 text-sm focus:outline-none focus:border-amber-400 transition-all" />
                  </div>
                  <button type="submit" className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-3 rounded-xl text-sm transition-all mt-2">Send reset link</button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                    <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0l-8-5-8 5" />
                  </svg>
                </div>
                <h3 className="text-black font-bold text-lg mb-2">Check your inbox</h3>
                <p className="text-neutral-500 text-sm">We sent a reset link to <span className="text-amber-400 font-medium">{forgotEmail}</span></p>
                <button onClick={() => { setMode("signin"); setForgotSent(false); }} className="mt-6 text-sm text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors">Back to sign in</button>
              </div>
            )}
          </div>
        )}

        {mode === "signin" && (
          <>
            <div className="mb-8">
              <h2 className="text-black text-3xl font-bold mb-1">Welcome back</h2>
              <p className="text-neutral-500 text-sm">Sign in to your EventHub account</p>
            </div>
            <button className="w-full active:bg-neutral-100/50 flex items-center justify-center gap-3 cursor-pointer border border-neutral-200 hover:bg-neutral-50 rounded-xl py-3 text-sm font-medium transition-all mb-5">
              {GOOGLE_ICON} Continue with Google
            </button>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-neutral-400 text-xs">or with email</span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>
            <form className="space-y-4" onSubmit={handleSignIn}>
              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-medium tracking-wide uppercase">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-black placeholder-neutral-400 text-sm focus:outline-none focus:border-amber-400 transition-all" />
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs text-neutral-400 font-medium tracking-wide uppercase">Password</label>
                  <button type="button" onClick={() => { setMode("forgot"); setError(""); }} className="text-xs text-amber-500 cursor-pointer hover:text-amber-400 transition-colors">Forgot password?</button>
                </div>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-black placeholder-neutral-400 text-sm focus:outline-none focus:border-amber-400 transition-all pr-11" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-amber-400 transition-colors">
                    {showPass ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </button>
                </div>
              </div>
              <button disabled={loading} type="submit" className="w-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black font-bold py-3 cursor-pointer rounded-xl text-sm transition-all mt-2 shadow-lg shadow-amber-400/20 disabled:opacity-50 flex items-center justify-center">
                {loading ? <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full" /> : "Sign in"}
              </button>
            </form>
            <p className="text-center text-sm text-neutral-500 mt-6">
              Don't have an account? <button onClick={() => { setMode("signup"); setError(""); }} className="text-amber-500 cursor-pointer hover:text-amber-400 font-semibold transition-colors">Create one</button>
            </p>
          </>
        )}

        {mode === "signup" && (
          <>
            <div className="mb-8">
              <h2 className="text-black text-3xl font-bold mb-1">Join EventHub</h2>
              <p className="text-neutral-500 text-sm">Create your free account today</p>
            </div>
            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-medium tracking-wide uppercase">Full name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-black placeholder-neutral-400 text-sm focus:outline-none focus:border-amber-400 transition-all" />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-medium tracking-wide uppercase">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-black placeholder-neutral-400 text-sm focus:outline-none focus:border-amber-400 transition-all" />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-medium tracking-wide uppercase">Password</label>
                <input type={showPass ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-black placeholder-neutral-400 text-sm focus:outline-none focus:border-amber-400 transition-all" />
              </div>
              <button disabled={loading} type="submit" className="w-full cursor-pointer bg-amber-400 hover:bg-amber-300 text-black font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-amber-400/20 mt-2 disabled:opacity-50">
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>
            <p className="text-center text-sm text-neutral-500 mt-5">
              Already have an account? <button onClick={() => { setMode("signin"); setError(""); }} className="text-amber-500 cursor-pointer hover:text-amber-400 font-semibold transition-colors">Sign in</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}