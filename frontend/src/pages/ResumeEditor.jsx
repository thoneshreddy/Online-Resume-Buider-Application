import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/api";
import ResumePreview from "../components/preview/ResumePreview";
import TemplateSwitcher from "../components/editor/TemplateSwitcher";
import { exportPDF } from "../utils/exportPDF";

export default function ResumeEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState({
    title: "My Professional Resume",
    profile: { fullName: "", designation: "", summary: "" },
    contact: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    skills: [],
    interests: [],
    template: { name: "template-one", color: "#000000" },
  });

  const [creating, setCreating] = useState(false);

  /* CREATE if /editor/new */
  useEffect(() => {
    if (id !== "new") return;

    const create = async () => {
      if (creating) return;
      setCreating(true);

      const t = toast.loading("Creating resume...");
      try {
        const res = await API.post("/resume", { title: "Untitled Resume" });
        const newId = res?.data?._id || res?.data?.id;

        if (!newId) {
          toast.error("Created, but id not returned", { id: t });
          setCreating(false);
          return;
        }

        toast.success("Resume created!", { id: t });
        navigate(`/editor/${newId}`, { replace: true });
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to create resume", {
          id: t,
        });
        setCreating(false);
      }
    };

    create();
  }, [id, navigate, creating]);

  /* LOAD existing */
  useEffect(() => {
    if (!id || id === "new") return;

    (async () => {
      try {
        const res = await API.get(`/resume/${id}`);
        setResume((p) => ({ ...p, ...res.data }));
      } catch {
        toast.error("Failed to load resume");
      }
    })();
  }, [id]);

  /* SAVE */
  const saveResume = async () => {
    if (!id || id === "new") return;
    const t = toast.loading("Saving...");
    try {
      await API.put(`/resume/${id}`, resume);
      toast.success("Saved", { id: t });
    } catch {
      toast.error("Save failed", { id: t });
    }
  };

  /* EXPORT */
  const handleExport = async () => {
    const t = toast.loading("Generating PDF...");
    try {
      await exportPDF(resume.title, "resume-export-root");
      toast.success("Downloaded", { id: t });
    } catch {
      toast.error("Export failed", { id: t });
    }
  };

  if (id === "new") {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-indigo-600" />
          <p className="text-slate-700 font-semibold">Creating resume...</p>
          <p className="text-slate-500 text-sm mt-1">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-animated-gradient overflow-hidden">
      <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
        {/* LEFT – EDITOR */}
        <div className="w-1/2 bg-white border-r flex flex-col">
          {/* ✅ IMPROVED HEADER ONLY */}
          <header
            className="px-8 py-4 flex justify-between items-center
            bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500
            text-white border-b border-indigo-500/20 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-white/80 hover:text-white text-lg font-bold transition"
                title="Back to Dashboard"
              >
                ←
              </Link>

              <input
                className="
                  bg-transparent border-b border-white/40
                  focus:border-white outline-none
                  font-extrabold text-lg tracking-tight
                  placeholder-white/60
                "
                value={resume.title}
                onChange={(e) =>
                  setResume({ ...resume, title: e.target.value })
                }
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={saveResume}
                className="
                  px-4 py-2 rounded-xl text-sm font-bold
                  bg-white/15 hover:bg-white/25
                  border border-white/20
                  transition backdrop-blur
                "
              >
                💾 Save
              </button>

              <button
                onClick={handleExport}
                className="
                  px-5 py-2 rounded-xl text-sm font-bold
                  bg-slate-900 hover:bg-black
                  transition shadow-md
                "
              >
                ⬇ Export PDF
              </button>
            </div>
          </header>

          {/* FORM (UNCHANGED) */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {/* PERSONAL */}
            <Section title="Personal">
              <input
                className="input"
                placeholder="Full Name"
                value={resume.profile.fullName}
                onChange={(e) =>
                  setResume({
                    ...resume,
                    profile: { ...resume.profile, fullName: e.target.value },
                  })
                }
              />
              <input
                className="input"
                placeholder="Designation"
                value={resume.profile.designation}
                onChange={(e) =>
                  setResume({
                    ...resume,
                    profile: {
                      ...resume.profile,
                      designation: e.target.value,
                    },
                  })
                }
              />
              <textarea
                className="input"
                placeholder="Summary"
                value={resume.profile.summary}
                onChange={(e) =>
                  setResume({
                    ...resume,
                    profile: { ...resume.profile, summary: e.target.value },
                  })
                }
              />
            </Section>

            {/* CONTACT */}
            <Section title="Contact">
              {Object.keys(resume.contact).map((k) => (
                <input
                  key={k}
                  className="input"
                  placeholder={k}
                  value={resume.contact[k]}
                  onChange={(e) =>
                    setResume({
                      ...resume,
                      contact: { ...resume.contact, [k]: e.target.value },
                    })
                  }
                />
              ))}
            </Section>

            {/* EXPERIENCE */}
            <RepeatableSection
              title="Experience"
              add={() =>
                setResume({
                  ...resume,
                  experience: [
                    ...resume.experience,
                    { role: "", company: "", description: "" },
                  ],
                })
              }
              items={resume.experience}
              remove={(i) =>
                setResume({
                  ...resume,
                  experience: resume.experience.filter((_, idx) => idx !== i),
                })
              }
            >
              {(exp, i) => (
                <>
                  <input
                    className="input"
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) =>
                      updateArray(
                        resume,
                        setResume,
                        "experience",
                        i,
                        "role",
                        e.target.value
                      )
                    }
                  />
                  <input
                    className="input"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) =>
                      updateArray(
                        resume,
                        setResume,
                        "experience",
                        i,
                        "company",
                        e.target.value
                      )
                    }
                  />
                  <textarea
                    className="input"
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) =>
                      updateArray(
                        resume,
                        setResume,
                        "experience",
                        i,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </>
              )}
            </RepeatableSection>

            {/* EDUCATION */}
            <RepeatableSection
              title="Education"
              add={() =>
                setResume({
                  ...resume,
                  education: [
                    ...resume.education,
                    { degree: "", institution: "" },
                  ],
                })
              }
              items={resume.education}
              remove={(i) =>
                setResume({
                  ...resume,
                  education: resume.education.filter((_, idx) => idx !== i),
                })
              }
            >
              {(edu, i) => (
                <>
                  <input
                    className="input"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) =>
                      updateArray(
                        resume,
                        setResume,
                        "education",
                        i,
                        "degree",
                        e.target.value
                      )
                    }
                  />
                  <input
                    className="input"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) =>
                      updateArray(
                        resume,
                        setResume,
                        "education",
                        i,
                        "institution",
                        e.target.value
                      )
                    }
                  />
                </>
              )}
            </RepeatableSection>

            {/* PROJECTS */}
            <RepeatableSection
              title="Projects"
              add={() =>
                setResume({
                  ...resume,
                  projects: [
                    ...resume.projects,
                    { title: "", description: "" },
                  ],
                })
              }
              items={resume.projects}
              remove={(i) =>
                setResume({
                  ...resume,
                  projects: resume.projects.filter((_, idx) => idx !== i),
                })
              }
            >
              {(p, i) => (
                <>
                  <input
                    className="input"
                    placeholder="Title"
                    value={p.title}
                    onChange={(e) =>
                      updateArray(
                        resume,
                        setResume,
                        "projects",
                        i,
                        "title",
                        e.target.value
                      )
                    }
                  />
                  <textarea
                    className="input"
                    placeholder="Description"
                    value={p.description}
                    onChange={(e) =>
                      updateArray(
                        resume,
                        setResume,
                        "projects",
                        i,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </>
              )}
            </RepeatableSection>

            {/* CERTIFICATIONS */}
            <RepeatableSection
              title="Certifications"
              add={() =>
                setResume({
                  ...resume,
                  certifications: [
                    ...resume.certifications,
                    { name: "" },
                  ],
                })
              }
              items={resume.certifications}
              remove={(i) =>
                setResume({
                  ...resume,
                  certifications: resume.certifications.filter(
                    (_, idx) => idx !== i
                  ),
                })
              }
            >
              {(c, i) => (
                <input
                  className="input"
                  placeholder="Certification"
                  value={c.name}
                  onChange={(e) =>
                    updateArray(
                      resume,
                      setResume,
                      "certifications",
                      i,
                      "name",
                      e.target.value
                    )
                  }
                />
              )}
            </RepeatableSection>

            {/* SKILLS */}
            <RepeatableSection
              title="Skills"
              add={() =>
                setResume({
                  ...resume,
                  skills: [...resume.skills, { name: "" }],
                })
              }
              items={resume.skills}
              remove={(i) =>
                setResume({
                  ...resume,
                  skills: resume.skills.filter((_, idx) => idx !== i),
                })
              }
            >
              {(s, i) => (
                <input
                  className="input"
                  placeholder="Skill"
                  value={s.name}
                  onChange={(e) =>
                    updateArray(
                      resume,
                      setResume,
                      "skills",
                      i,
                      "name",
                      e.target.value
                    )
                  }
                />
              )}
            </RepeatableSection>

            {/* INTERESTS */}
            <RepeatableSection
              title="Interests"
              add={() =>
                setResume({ ...resume, interests: [...resume.interests, ""] })
              }
              items={resume.interests}
              remove={(i) =>
                setResume({
                  ...resume,
                  interests: resume.interests.filter((_, idx) => idx !== i),
                })
              }
            >
              {(v, i) => (
                <input
                  className="input"
                  placeholder="Interest"
                  value={v}
                  onChange={(e) => {
                    const u = [...resume.interests];
                    u[i] = e.target.value;
                    setResume({ ...resume, interests: u });
                  }}
                />
              )}
            </RepeatableSection>

            <TemplateSwitcher resume={resume} setResume={setResume} />
          </div>
        </div>

        {/* RIGHT – PREVIEW */}
        <div className="w-1/2 bg-slate-200 flex justify-center p-10 overflow-y-auto">
          <div className="scale-[0.65] origin-top">
            <div
              id="resume-export-root"
              style={{ width: "794px", minHeight: "1123px", background: "#fff" }}
            >
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function Section({ title, children }) {
  return (
    <section className="space-y-3 p-5 rounded-xl bg-gradient-to-br from-white to-slate-100 border shadow">
      <h3 className="text-sm font-black uppercase bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
        {title}
      </h3>
      {children}
    </section>
  );
}

function RepeatableSection({ title, add, items, remove, children }) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-black uppercase bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          {title}
        </h3>
        <button onClick={add} className="text-indigo-600 text-xs font-bold">
          + ADD
        </button>
      </div>

      {items.map((item, i) => (
        <div
          key={i}
          className="relative p-5 rounded-xl bg-gradient-to-br from-white to-slate-100 border shadow"
        >
          <button
            className="absolute top-2 right-2 text-red-400 hover:text-red-600"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              remove(i);
            }}
            type="button"
          >
            ×
          </button>
          {children(item, i)}
        </div>
      ))}
    </section>
  );
}

function updateArray(resume, setResume, key, index, field, value) {
  const u = [...resume[key]];
  u[index][field] = value;
  setResume({ ...resume, [key]: u });
}
