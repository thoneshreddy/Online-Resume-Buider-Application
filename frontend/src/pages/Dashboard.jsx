import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/api";
import GradientPage from "../components/layouts/GradientPage";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get("/resume");
        setResumes(res.data);
      } catch (err) {
        toast.error("Failed to load resumes",err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    const loadId = toast.loading("Deleting resume...");
    try {
      await API.delete(`/resume/${id}`);
      setResumes(resumes.filter((x) => x._id !== id));
      toast.success("Resume deleted", { id: loadId });
    } catch (err) {
      toast.error("Delete failed", { id: loadId },err);
    }
  };

  return (
    <div className="min-h-screen bg-animated-gradient">
      <div className="max-w-7xl mx-auto p-8">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md bg-white/80">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          Resume<span className="text-indigo-600">Builder</span>
        </h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
            className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Logout
          </button>
          <Link to="/editor/new" className="btn py-2 px-4 text-sm">
            ➕ New Resume
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12 animate-slide">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">My Resumes</h2>
            <p className="text-slate-500 mt-1">Manage and edit your professional documents</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-lg font-bold text-slate-800">No resumes yet</h3>
            <p className="text-slate-500 mb-6">Create your first resume to get started</p>
            <Link to="/editor/new" className="btn inline-flex">Create Now</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((r) => (
              <div 
                key={r._id} 
                className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-full h-40 bg-slate-100 rounded-xl mb-4 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                   <span className="text-4xl group-hover:scale-110 transition-transform duration-300">📝</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-1 truncate">{r.title}</h3>
                <p className="text-xs text-slate-400 mb-6 uppercase tracking-wider font-semibold">
                  Last Edited: {new Date().toLocaleDateString()}
                </p>

                <div className="flex gap-3">
                  <Link 
                    to={`/editor/${r._id}`} 
                    className="flex-1 text-center py-2 bg-slate-100 hover:bg-indigo-600 hover:text-white rounded-lg font-bold text-sm text-slate-700 transition-all"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="px-3 py-2 bg-white hover:bg-red-50 text-red-500 border border-slate-200 hover:border-red-200 rounded-lg transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
    </div>
  );
};

export default Dashboard;