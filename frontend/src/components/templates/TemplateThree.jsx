export default function TemplateThree({ resume }) {
  const {
    profile,
    contact,
    experience,
    education,
    projects,
    skills,
    certifications,
    languages,
    interests,
  } = resume;

  return (
    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        display: "flex",
        backgroundColor: "#ffffff",
        margin: "0 auto",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
        color: "#334155",
      }}
    >
      {/* ================= SIDEBAR ================= */}
      <aside
        style={{
          width: "35%",
          backgroundColor: "#000000",
          color: "#ffffff",
          padding: "40px 25px",
          boxSizing: "border-box",
        }}
      >
        {/* Name */}
        <h2 style={{ fontSize: "24px", fontWeight: "900", marginBottom: "4px" }}>
          {profile?.fullName || "Your Name"}
        </h2>

        <p
          style={{
            fontSize: "14px",
            color: "#d1d5db",
            marginBottom: "25px",
          }}
        >
          {profile?.designation || "Professional Title"}
        </p>

        {/* CONTACT */}
        <SidebarSection title="Contact">
          {contact?.email && <p>{contact.email}</p>}
          {contact?.phone && <p>{contact.phone}</p>}
          {contact?.location && <p>{contact.location}</p>}
          {contact?.linkedin && <p>LinkedIn</p>}
          {contact?.github && <p>GitHub</p>}
          {contact?.website && <p>Portfolio</p>}
        </SidebarSection>

        {/* SKILLS */}
        {skills?.length > 0 && (
          <SidebarSection title="Skills">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {skills.map((s, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "11px",
                    border: "1px solid #ffffff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </SidebarSection>
        )}

        {/* LANGUAGES */}
        {languages?.length > 0 && (
          <SidebarSection title="Languages">
            <p style={{ fontSize: "12px" }}>
              {languages.map((l) => l.name).join(" • ")}
            </p>
          </SidebarSection>
        )}

        {/* INTERESTS */}
        {interests?.length > 0 && (
          <SidebarSection title="Interests">
            <p style={{ fontSize: "12px" }}>
              {interests.join(" • ")}
            </p>
          </SidebarSection>
        )}
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main
        style={{
          width: "65%",
          padding: "40px 30px",
          boxSizing: "border-box",
        }}
      >
        {/* SUMMARY */}
        {profile?.summary && (
          <MainSection title="Professional Summary">
            <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
              {profile.summary}
            </p>
          </MainSection>
        )}

        {/* EXPERIENCE */}
        {experience?.length > 0 && (
          <MainSection title="Work History">
            {experience.map((e, i) => (
              <div key={i} style={{ marginBottom: "18px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  <span>{e.role}</span>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>
                    {e.startDate} – {e.endDate}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    marginBottom: "4px",
                  }}
                >
                  {e.company}
                </div>

                <p style={{ fontSize: "13px", color: "#475569", margin: 0 }}>
                  {e.description}
                </p>
              </div>
            ))}
          </MainSection>
        )}

        {/* PROJECTS */}
        {projects?.length > 0 && (
          <MainSection title="Projects">
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: "14px" }}>
                <strong>{p.title}</strong>
                <p style={{ fontSize: "13px", marginTop: "4px" }}>
                  {p.description}
                </p>
                {p.technologies?.length > 0 && (
                  <small style={{ color: "#64748b" }}>
                    Tech: {p.technologies.join(", ")}
                  </small>
                )}
              </div>
            ))}
          </MainSection>
        )}

        {/* EDUCATION */}
        {education?.length > 0 && (
          <MainSection title="Education">
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: "10px", fontSize: "13px" }}>
                <strong>{e.degree}</strong>
                <div>{e.institution}</div>
                <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                  {e.startYear} – {e.endYear}
                </div>
              </div>
            ))}
          </MainSection>
        )}

        {/* CERTIFICATIONS */}
        {certifications?.length > 0 && (
          <MainSection title="Certifications">
            {certifications.map((c, i) => (
              <div key={i} style={{ fontSize: "13px", marginBottom: "6px" }}>
                <strong>{c.name}</strong>
                {c.issuer && ` — ${c.issuer}`}
                {c.year && (
                  <span style={{ color: "#9ca3af" }}> ({c.year})</span>
                )}
              </div>
            ))}
          </MainSection>
        )}
      </main>
    </div>
  );
}

/* ---------- SIDEBAR SECTION ---------- */
function SidebarSection({ title, children }) {
  return (
    <div style={{ marginBottom: "26px" }}>
      <h4
        style={{
          fontSize: "12px",
          fontWeight: "900",
          textTransform: "uppercase",
          borderBottom: "1px solid #4b5563",
          paddingBottom: "5px",
          marginBottom: "12px",
        }}
      >
        {title}
      </h4>
      <div style={{ fontSize: "12px", lineHeight: "1.5" }}>{children}</div>
    </div>
  );
}

/* ---------- MAIN SECTION ---------- */
function MainSection({ title, children }) {
  return (
    <section style={{ marginBottom: "26px" }}>
      <h3
        style={{
          fontSize: "15px",
          fontWeight: "900",
          textTransform: "uppercase",
          borderBottom: "2px solid #000000",
          paddingBottom: "5px",
          marginBottom: "14px",
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}
