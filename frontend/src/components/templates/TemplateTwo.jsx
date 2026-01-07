export default function TemplateTwo({ resume }) {
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
    template,
  } = resume;

  const primaryColor = template?.color || "#374151";

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
        width: "794px",
        minHeight: "1123px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        color: "#1f2937",
        boxSizing: "border-box",
      }}
    >
      {/* PROFILE IMAGE */}
      {profile?.profileImage && (
        <img
          src={profile.profileImage}
          alt="Profile"
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: 16,
            border: `3px solid ${primaryColor}`,
            padding: "3px",
          }}
        />
      )}

      {/* HEADER */}
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "800",
          marginBottom: 4,
          color: primaryColor,
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        {profile?.fullName || "Your Name"}
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#4b5563",
          marginBottom: 12,
          fontWeight: "500",
        }}
      >
        {profile?.designation || "Professional Designation"}
      </p>

      {/* CONTACT INFO */}
      <div
        style={{
          fontSize: "13px",
          color: "#6b7280",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        {contact?.email && <span>{contact.email}</span>}
        {contact?.phone && <span>• {contact.phone}</span>}
        {contact?.location && <span>• {contact.location}</span>}
      </div>

      <div
        style={{
          fontSize: "13px",
          color: primaryColor,
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "24px",
          fontWeight: "bold",
        }}
      >
        {contact?.linkedin && <span>LinkedIn</span>}
        {contact?.github && <span>GitHub</span>}
        {contact?.website && <span>Portfolio</span>}
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "2px solid #f3f4f6",
          marginBottom: "24px",
        }}
      />

      {/* CONTENT */}
      <div style={{ textAlign: "left" }}>
        {/* SUMMARY */}
        {profile?.summary && (
          <Section title="Professional Profile" primaryColor={primaryColor}>
            <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
              {profile.summary}
            </p>
          </Section>
        )}

        {/* EXPERIENCE */}
        {experience?.length > 0 && (
          <Section title="Experience" primaryColor={primaryColor}>
            {experience.map((e, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <strong style={{ fontSize: "15px" }}>{e.role}</strong>
                  <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                    {e.startDate} – {e.endDate}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: primaryColor,
                    fontWeight: "600",
                    marginBottom: 4,
                  }}
                >
                  {e.company}
                </div>
                <p style={{ fontSize: "13px", color: "#4b5563" }}>
                  {e.description}
                </p>
              </div>
            ))}
          </Section>
        )}

        {/* PROJECTS */}
        {projects?.length > 0 && (
          <Section title="Key Projects" primaryColor={primaryColor}>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <strong style={{ fontSize: "14px" }}>{p.title}</strong>
                <p style={{ fontSize: "13px", margin: "2px 0" }}>
                  {p.description}
                </p>
                {p.technologies?.length > 0 && (
                  <small style={{ color: primaryColor, fontWeight: "bold" }}>
                    Tech: {p.technologies.join(", ")}
                  </small>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* TWO COLUMN GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          {/* EDUCATION */}
          {education?.length > 0 && (
            <Section title="Education" primaryColor={primaryColor}>
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {e.degree}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    {e.institution}
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* SKILLS */}
          {skills?.length > 0 && (
            <Section title="Core Skills" primaryColor={primaryColor}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {skills.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "11px",
                      backgroundColor: "#f3f4f6",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontWeight: "600",
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* BOTTOM GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
            marginTop: "10px",
          }}
        >
          {/* CERTIFICATIONS */}
          {certifications?.length > 0 && (
            <Section title="Certifications" primaryColor={primaryColor}>
              {certifications.map((c, i) => (
                <div key={i} style={{ fontSize: "13px", marginBottom: "6px" }}>
                  <strong>{c.name}</strong>
                  {c.issuer && ` — ${c.issuer}`}
                  {c.year && (
                    <span style={{ color: "#9ca3af" }}> ({c.year})</span>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* LANGUAGES & INTERESTS */}
          <div>
            {languages?.length > 0 && (
              <Section title="Languages" primaryColor={primaryColor}>
                <p style={{ fontSize: "13px" }}>
                  {languages.map((l) => l.name).join(" • ")}
                </p>
              </Section>
            )}

            {interests?.length > 0 && (
              <Section title="Interests" primaryColor={primaryColor}>
                <p style={{ fontSize: "13px" }}>
                  {interests.join(" • ")}
                </p>
              </Section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- SECTION ---------- */
function Section({ title, children, primaryColor }) {
  return (
    <section style={{ marginBottom: 20 }}>
      <h3
        style={{
          fontSize: "13px",
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: primaryColor,
          borderBottom: "2px solid #f3f4f6",
          paddingBottom: 4,
          marginBottom: 10,
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}
