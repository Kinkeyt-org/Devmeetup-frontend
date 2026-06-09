import { useState, useEffect } from "react";
import { login, signup } from "../api/auth";
import { updateProfile } from "../api/user";
import { useNavigate, useLocation, Link } from "react-router-dom";
import SEO from "../components/SEO";
import { Loader } from "lucide-react";

const GOOGLE_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const EyeVisible = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeHidden = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7" />
    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);



export default function Authform() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState(() => {
    return location.pathname === "/signup" ? "signup" : "signin";
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.pathname === "/signup") {
      setMode("signup");
    } else if (location.pathname === "/login") {
      setMode("signin");
    }
  }, [location.pathname]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleRedirect = () => {
    navigate("/", { replace: true });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(email, password);
      if (data?.token) {
        window.dispatchEvent(new Event("userUpdate"));
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
      const data = await signup({ name, email, password, password_confirmation });

      if (data?.token) {
        localStorage.setItem("token", data.token);

        // If a profile picture was selected, wait to upload it now that we have a token
        let updatedUser = data.user;
        if (profilePicture) {
          try {
            const formData = new FormData();
            formData.append("profile_picture", profilePicture);
            const pRes = await updateProfile(formData);
            if (pRes._resolvedAvatarUrl) {
              updatedUser = {
                ...updatedUser,
                avatar: pRes._resolvedAvatarUrl,
                profile_picture: pRes._resolvedAvatarUrl,
              };
            }
          } catch (pErr) {
            console.error("Profile picture upload failed on signup:", pErr);
          }
        }

        localStorage.setItem("user", JSON.stringify(updatedUser || data.user));
        // Force the navbar and app to update
        window.dispatchEvent(new Event("userUpdate"));
        handleRedirect();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title={`${mode === "signin" ? "Sign In" : "Sign Up"}`}
        description={mode === "signin"
          ? "Sign in to your Nexus account and discover amazing tech events near you. Connect, explore, and never miss out on the action."
          : "Create a Nexus account to find and book tech events near you. Join our community of tech enthusiasts and start exploring today."
        }
        url={`https://devmeetup-frontend.vercel.app/${mode === "signin" ? "login" : "signup"}`}
      />
      <div className="min-h-screen grid md:grid-cols-2 bg-white">

        {/* LEFT */}
        <div className="hidden md:flex relative items-end p-14 bg-[#1d1d1f] text-white overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

          <div className="relative z-10 max-w-md space-y-4">
            <p className="text-xs tracking-[0.25em] text-neutral-400">
              Nexus
            </p>
            <h1 className="text-4xl leading-tight">
              Discover experiences you'll never forget.
            </h1>
            <p className="text-neutral-300 text-sm">
              Find events that match your vibe and connect with people.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
                {error}
              </div>
            )}

            {/* HEADER */}
            <div className="mb-8 space-y-2">
              <h2 className="text-2xl font-medium text-black">
                {mode === "signin" ? "Welcome back" : "Create account"}
              </h2>
              <p className="text-neutral-500 text-sm">
                {mode === "signin"
                  ? "Sign in to continue"
                  : "Join and start exploring events"}
              </p>
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 text-black bg-neutral-100 hover:bg-neutral-200 py-3 rounded-xl border border-neutral-200 text-sm transition"
            >
              {GOOGLE_ICON}
              {mode === "signin" ? "Sign in with Google" : "Sign up with Google"}
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-xs text-neutral-400">or</span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            {/* FORMS */}
            {mode === "signin" ? (
              <form className="space-y-4" onSubmit={handleSignIn}>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 text-black placeholder:text-neutral-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
                />

                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-neutral-50 border border-neutral-200 text-black placeholder:text-neutral-400 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    {showPass ? <EyeVisible /> : <EyeHidden />}
                  </button>
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-black text-white py-3 flex justify-center rounded-xl text-sm transition active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? <Loader className="animate-spin" /> : "Sign in"}
                </button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleSignUp}>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 text-black placeholder:text-neutral-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
                />

                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 text-black placeholder:text-neutral-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
                />

                {/* OPTIONAL PROFILE */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 ml-1">
                    Profile Picture (optional)
                  </label>
                  <p className="text-xs text-neutral-400 ml-1">
                    You can add this later
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    className="w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-neutral-100 hover:file:bg-neutral-200"
                  />
                </div>

                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 text-black placeholder:text-neutral-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
                />

                <input
                  type="password"
                  required
                  placeholder="Confirm password"
                  value={password_confirmation}
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 text-black placeholder:text-neutral-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
                />

                <button
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-xl flex justify-center text-sm transition active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? <Loader className="animate-spin" /> : "Create account"}
                </button>

                <p className="text-[11px] text-neutral-400 mt-4 leading-relaxed text-center">
                  By signing up you agree to our{" "}
                  <Link to="/support/terms" className="text-black underline">terms and conditions</Link>.
                </p>
              </form>
            )}

            {/* SWITCH */}
            <div className="mt-8 text-sm text-neutral-500">
              {mode === "signin" ? (
                <p>
                  Don't have an account?{" "}
                  <button onClick={() => navigate("/signup")} className="text-black">
                    Create one
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button onClick={() => navigate("/login")} className="text-black">
                    Sign in
                  </button>
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}