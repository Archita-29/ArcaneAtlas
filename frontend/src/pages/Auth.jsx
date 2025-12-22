// src/pages/Auth.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        setMsg(
          "Account created! Please check your email to confirm your account."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        // logged-in user
        localStorage.setItem("aa_user_logged_in", "true");
        localStorage.setItem("aa_user_mode", "user");

        navigate("/home");
      }
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ GUEST MODE (NO SUPABASE)
  const continueAsGuest = () => {
    localStorage.setItem("aa_user_mode", "guest");
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl text-white space-y-6">

        {/* BRAND */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold">
            Arcane<span className="text-indigo-400">Atlas</span>
          </h1>
          <p className="text-sm text-gray-300">
            {mode === "login"
              ? "Welcome back, explorer"
              : "Begin your journey"}
          </p>
        </div>

        {/* MODE TOGGLE */}
        <div className="flex bg-white/10 rounded-lg overflow-hidden">
          <button
            onClick={() => setMode("login")}
            className={`w-1/2 py-2 text-sm transition ${
              mode === "login"
                ? "bg-indigo-500"
                : "hover:bg-white/10"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`w-1/2 py-2 text-sm transition ${
              mode === "signup"
                ? "bg-indigo-500"
                : "hover:bg-white/10"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 rounded-lg bg-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (min 6 characters)"
            className="w-full p-3 rounded-lg bg-white/10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        {/* MESSAGE */}
        {msg && (
          <p className="text-sm text-center text-yellow-300">{msg}</p>
        )}

        {/* ✅ CONTINUE AS GUEST */}
        <div className="text-center pt-2">
          <button
            onClick={continueAsGuest}
            className="text-sm text-indigo-300 hover:underline"
          >
            Continue as Guest →
          </button>
        </div>

      </div>
    </div>
  );
}
