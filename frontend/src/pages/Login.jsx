import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import API from "../api/api";
import GradientPage from "../components/layouts/GradientPage";

/* ---------------- ANIMATIONS ---------------- */

// Card drops from top
const cardVariant = {
  hidden: { opacity: 0, y: -60, scale: 0.95 },
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

// Items fade + slide up
const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });

      if (rememberMe) localStorage.setItem("token", res.data.token);
      else sessionStorage.setItem("token", res.data.token);

      const u = res.data.user || res.data;
      const userPayload = {
        name: u.name || u.username || u.fullName || "",
        email: u.email || u.mail || "",
      };

      if (rememberMe)
        localStorage.setItem("user", JSON.stringify(userPayload));
      else sessionStorage.setItem("user", JSON.stringify(userPayload));

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid email or password"
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
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <motion.form
          onSubmit={submit}
          className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
        >
          {/* Header */}
          <motion.div variants={itemVariant} className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-800">
              Welcome Back
            </h2>
            <p className="text-slate-500 mt-2">
              Sign in to continue
            </p>
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariant}>
            <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">
              Email Address
            </label>
            <input
              className="input"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariant} className="mt-4">
            <div className="flex justify-between mb-1 ml-1">
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-indigo-600 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <input
              className="input"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </motion.div>

          {/* Remember me */}
          <motion.div
            variants={itemVariant}
            className="flex items-center justify-between mt-5"
          >
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-indigo-600"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-xs text-indigo-600 hover:underline"
            >
              Forgot password?
            </Link>
          </motion.div>

          {/* Button */}
          <motion.button
            variants={itemVariant}
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className="btn w-full mt-8 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </motion.button>

          {/* Footer */}
          <motion.p
            variants={itemVariant}
            className="mt-8 text-center text-sm text-slate-600"
          >
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition"
            >
              Create an account
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </GradientPage>
  );
}
