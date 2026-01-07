import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/api";
import GradientPage from "../components/layouts/GradientPage";

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

      // Store token
      if (rememberMe) {
        localStorage.setItem("token", res.data.token);
      } else {
        sessionStorage.setItem("token", res.data.token);
      }

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Invalid email or password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientPage>
      <div className="w-full max-w-md px-6 animate-slide">
      <div className="w-full max-w-md px-6 relative">

        {/* Decorative Glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl -z-10" />

        <form
          onSubmit={submit}
          className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-800">
              Welcome Back
            </h2>
            <p className="text-slate-500 mt-2">
              Sign in to continue
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            {/* Email */}
            <div>
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
            </div>

            {/* Password */}
            <div>
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
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between mt-5">
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
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
          </button>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition"
            >
              Create an account
            </Link>
          </p>
        </form>

       
      </div>
    </div>
    </GradientPage>
  );
}
