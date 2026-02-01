import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GradientPage from "../components/layouts/GradientPage";

/* ---------------- ANIMATION VARIANTS ---------------- */

// From TOP
const fromTop = {
  hidden: { opacity: 0, y: -50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// From BOTTOM
const fromBottom = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// From LEFT
const fromLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// From RIGHT
const fromRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Home() {
  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  // ✅ correct pattern (no React warning)
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getToken());

  useEffect(() => {
    const onFocus = () => setIsLoggedIn(!!getToken());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return (
    <GradientPage>
      <motion.div
        className="w-full max-w-5xl px-6 py-10"
        initial="hidden"
        animate="show"
      >
        {/* HERO – FROM TOP */}
        <motion.div
          variants={fromTop}
          className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl pointer-events-none -z-10" />

          <h1 className="text-4xl font-extrabold text-slate-800 leading-tight">
            Online Resume Builder Application
          </h1>

          <p className="text-slate-600 mt-4 text-lg max-w-2xl">
            Create a professional resume in minutes using ready-made templates,
            simple editing, and instant preview. Update your resume anytime and
            keep it job-ready.
          </p>

          {!isLoggedIn ? (
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="px-6 py-3 rounded-xl font-semibold bg-white/70 border border-white text-slate-800 hover:bg-white transition"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="px-6 py-3 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition"
              >
                Create Account
              </Link>
            </div>
          ) : (
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="px-6 py-3 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition"
              >
                Go to Dashboard
              </Link>

              <Link
                to="/editor/new"
                className="px-6 py-3 rounded-xl font-semibold bg-white/70 border border-white text-slate-800 hover:bg-white transition"
              >
                Create New Resume
              </Link>
            </div>
          )}
        </motion.div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {/* LEFT */}
          <motion.div
            variants={fromLeft}
            className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white shadow-sm"
          >
            <h3 className="font-bold text-slate-800">Templates</h3>
            <p className="text-sm text-slate-600 mt-2">
              Choose clean, ATS-friendly templates and customize them easily.
            </p>
          </motion.div>

          {/* BOTTOM */}
          <motion.div
            variants={fromBottom}
            className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white shadow-sm"
          >
            <h3 className="font-bold text-slate-800">Live Editor</h3>
            <p className="text-sm text-slate-600 mt-2">
              Edit sections like Education, Skills, Projects, and Experience
              with instant preview.
            </p>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={fromRight}
            className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white shadow-sm"
          >
            <h3 className="font-bold text-slate-800">
              Edit Existing Resumes
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Open saved resumes anytime, update content quickly, and keep your
              resume job-ready.
            </p>
          </motion.div>
        </div>

        {/* HOW IT WORKS – FROM BOTTOM */}
        <motion.div
          variants={fromBottom}
          className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white shadow-sm mt-8"
        >
          <h2 className="text-2xl font-extrabold text-slate-800">
            How it works
          </h2>

          <ol className="mt-4 space-y-3 text-slate-600">
            <li>
              <span className="font-semibold text-slate-800">1.</span> Create an
              account or login.
            </li>
            <li>
              <span className="font-semibold text-slate-800">2.</span> Create a
              new resume or open an existing one.
            </li>
            <li>
              <span className="font-semibold text-slate-800">3.</span> Edit,
              preview, and download your updated resume.
            </li>
          </ol>
        </motion.div>
      </motion.div>
    </GradientPage>
  );
}
