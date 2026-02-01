import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import API from "../api/api";
import GradientPage from "../components/layouts/GradientPage";

/* ---------------- ANIMATION VARIANTS ---------------- */

// Grid container – stagger cards
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Card entrance
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1], // smooth cubic-bezier
    },
  },
};

// Floating preview animation
const floatVariant = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/* ---------------- COMPONENT ---------------- */

const Dashboard = () => {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recent");

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get("/resume");
        setResumes(res.data || []);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load resumes");
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const ok = window.confirm("Delete this resume?");
    if (!ok) return;

    const loadId = toast.loading("Deleting resume...");
    try {
      await API.delete(`/resume/${id}`);
      setResumes((prev) => prev.filter((x) => x._id !== id));
      toast.success("Resume deleted", { id: loadId });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed", {
        id: loadId,
      });
    }
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/editor/${id}`);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = resumes.filter((r) => {
      if (!q) return true;
      return (r.title || "").toLowerCase().includes(q);
    });

    if (sort === "title") {
      list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else {
      list.sort((a, b) => {
        const da = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const db = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return db - da;
      });
    }

    return list;
  }, [resumes, query, sort]);

  const formatDate = (r) => {
    const d = r.updatedAt || r.createdAt;
    if (!d) return "—";
    return new Date(d).toLocaleDateString();
  };

  return (
    <GradientPage>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              My Resumes
            </h2>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Tap a card to open and edit.
            </p>
          </div>

          <Link
            to="/editor/new"
            className="btn py-2.5 px-4 text-sm sm:text-base w-full sm:w-auto text-center"
          >
            ➕ New Resume
          </Link>
        </div>

        {/* Controls */}
        <div className="bg-white/75 backdrop-blur-xl border border-white rounded-2xl p-4 sm:p-5 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-600 ml-1">
                Search
              </label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title..."
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div className="w-full md:w-56">
              <label className="text-xs font-semibold text-slate-600 ml-1">
                Sort
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option value="recent">Most Recent</option>
                <option value="title">Title (A → Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-dashed border-slate-200 px-4">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-lg font-bold text-slate-800">
              No resumes found
            </h3>
            <p className="text-slate-500 mb-6 text-sm sm:text-base">
              Create your first resume to get started.
            </p>
            <Link to="/editor/new" className="btn inline-flex">
              Create Now
            </Link>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filtered.map((r) => (
              <motion.div
                key={r._id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.035,
                  boxShadow: "0 25px 50px rgba(79,70,229,0.15)",
                }}
                whileTap={{ scale: 0.96 }}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/editor/${r._id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/editor/${r._id}`);
                  }
                }}
                className="group cursor-pointer bg-white/85 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {/* Preview */}
                <div className="w-full h-36 sm:h-40 bg-slate-100 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-indigo-300/20 rounded-full blur-2xl pointer-events-none" />
                  <motion.span
                    className="text-4xl"
                    variants={floatVariant}
                    animate="animate"
                    whileHover={{ scale: 1.15 }}
                  >
                    📝
                  </motion.span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-slate-800 mb-1 truncate">
                  {r.title || "Untitled Resume"}
                </h3>

                <p className="text-[11px] sm:text-xs text-slate-400 mb-5 uppercase tracking-wider font-semibold">
                  Last Edited: {formatDate(r)}
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={(e) => handleEdit(e, r._id)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-indigo-600 hover:text-white rounded-xl font-bold text-sm text-slate-700 transition-all"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, r._id)}
                    className="px-3.5 py-2.5 bg-white hover:bg-red-50 text-red-500 border border-slate-200 hover:border-red-200 rounded-xl transition-all"
                  >
                    🗑
                  </button>
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  Tip: Tap anywhere on this card to open.
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </GradientPage>
  );
};

export default Dashboard;
