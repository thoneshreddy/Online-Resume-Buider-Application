import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/api";
import GradientPage from "../components/layouts/GradientPage";

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

      // Small delay for UX polish
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      console.error("Registration failed", err);

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
      <div className="w-full max-w-md px-6 animate-slide">
      <div className="w-full max-w-md px-6 animate-slide relative">

        {/* Floating Background Glow */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

        <form
          onSubmit={submit}
          className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-500 mt-2">
              Join us to build your professional resume
            </p>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
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
            </div>

            {/* Email */}
            <div>
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
            </div>

            {/* Password */}
            <div>
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
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              btn w-full mt-8 flex items-center justify-center gap-2
              ${loading ? "opacity-70 cursor-not-allowed" : ""}
            `}
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
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="9 5l7 7-7 7"
                  />
                </svg>
              </>
            )}
          </button>

          <p className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
    </GradientPage>
  );
}
