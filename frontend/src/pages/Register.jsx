import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import API from "../api/api";
import GradientPage from "../components/layouts/GradientPage";

/* ---------------- ANIMATIONS ---------------- */

// Card enters from top
const cardVariant = {
  hidden: { opacity: 0, y: -60, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

// Children animate from bottom
const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const toastId = toast.loading("Creating your account...");

    try {
      await API.post("/auth/register", form);
      toast.success("Account created successfully!", { id: toastId });
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Registration failed. Try again.",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientPage>
      <motion.div
        className="w-full max-w-md px-6 relative"
        variants={cardVariant}
        initial="hidden"
        animate="show"
      >
        {/* Glow */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <motion.form
          onSubmit={submit}
          className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
        >
          {/* Header */}
          <motion.div variants={itemVariant} className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-500 mt-2">
              Join us to build your professional resume
            </p>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariant}>
            <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">
              Full Name
            </label>
            <input
              className="input"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariant} className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">
              Email Address
            </label>
            <input
              className="input"
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariant} className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">
              Password
            </label>
            <input
              className="input"
              type="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
            <p className="text-[10px] text-slate-400 mt-2 ml-1 italic">
              Must be at least 8 characters long.
            </p>
          </motion.div>

          {/* Button */}
          <motion.button
            variants={itemVariant}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            type="submit"
            className="btn w-full mt-8 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </>
            )}
          </motion.button>

          {/* Footer */}
          <motion.p
            variants={itemVariant}
            className="mt-8 text-center text-sm text-slate-600"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition"
            >
              Sign In
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </GradientPage>
  );
}
