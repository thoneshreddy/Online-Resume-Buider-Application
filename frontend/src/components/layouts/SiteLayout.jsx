import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const SITE_NAME = "Online Resume Builder Application";

export default function SiteLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const isLoggedIn = !!token;

  const path = location.pathname;
  const isOnHome = path === "/";
  const isAuthPage = path === "/login" || path === "/register";
  const isOnDashboard = path === "/dashboard";

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center">
              <span className="font-black text-indigo-700">R</span>
            </div>
            <div className="leading-tight">
              <p className="font-extrabold text-slate-800">
                {SITE_NAME}
              </p>
              <p className="text-xs text-slate-500 -mt-0.5">
                Build resumes faster
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-3">
            {/* Home (hide on home page) */}
            {!isOnHome && (
              <Link
                to="/"
                className="px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-white/70 transition"
              >
                Home
              </Link>
            )}

            {/* Dashboard (only when useful) */}
            {isLoggedIn && !isAuthPage && !isOnHome && !isOnDashboard && (
              <Link
                to="/dashboard"
                className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-white/70 transition"
              >
                Dashboard
              </Link>
            )}

            {/* Logout */}
            {isLoggedIn && !isAuthPage && (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white bg-white/40 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
