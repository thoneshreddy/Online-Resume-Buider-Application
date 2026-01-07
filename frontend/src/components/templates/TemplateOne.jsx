export default function TemplateOne({ resume }) {
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
        padding: "40px",
        backgroundColor: "#ffffff",
        color: "#1f2937",
        fontFamily: "Arial, sans-serif",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          marginBottom: "30px",
          borderBottom: "3px solid #000000",
          paddingBottom: "20px",
        }}
      >
        {/* Profile Image */}
        {profile?.profileImage && (
          <img
            src={profile.profileImage}
            alt="Profile"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />
        )}

        <h1
          style={{
            fontSize: "36px",
            fontWeight: "900",
            margin: "0",
            textTransform: "uppercase",
          }}
        >
          {profile?.fullName || "Your Name"}
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#4b5563",
            fontWeight: "600",
            margin: "6px 0 10px",
          }}
        >
          {profile?.designation || "Professional Title"}
        </p>

        {/* CONTACT */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            fontSize: "12px",
            color: "#374151",
          }}
        >
          {contact?.email && <span>{contact.email}</span>}
          {contact?.phone && <span>• {contact.phone}</span>}
          {contact?.location && <span>• {contact.location}</span>}
          {contact?.linkedin && <span>• LinkedIn</span>}
          {contact?.github && <span>• GitHub</span>}
          {contact?.website && <span>• Portfolio</span>}
        </div>
      </header>

      {/* SUMMARY */}
      {profile?.summary && (
        <Section title="Professional Summary">
          <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
            {profile.summary}
          </p>
        </Section>
      )}

      {/* EXPERIENCE */}
      {experience?.length > 0 && (
        <Section title="Experience">
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                <span>{e.role} · {e.company}</span>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>
                  {e.startDate} – {e.endDate}
                </span>
              </div>
              <p style={{ fontSize: "13px", marginTop: "4px" }}>
                {e.description}
              </p>
            </div>
          ))}
        </Section>
      )}

      {/* PROJECTS */}
      {projects?.length > 0 && (
        <Section title="Projects">
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <strong>{p.title}</strong>
              <p style={{ fontSize: "13px", marginTop: "4px" }}>
                {p.description}
              </p>
              {p.technologies?.length > 0 && (
                <div style={{ fontSize: "11px", color: "#4b5563" }}>
                  Tech: {p.technologies.join(", ")}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* TWO COLUMN GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        <div>
          {/* EDUCATION */}
          {education?.length > 0 && (
            <Section title="Education">
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: "10px", fontSize: "13px" }}>
                  <strong>{e.degree}</strong>
                  <div>{e.institution}</div>
                  <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                    {e.startYear} – {e.endYear}
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* CERTIFICATIONS */}
          {certifications?.length > 0 && (
            <Section title="Certifications">
              {certifications.map((c, i) => (
                <div key={i} style={{ fontSize: "13px", marginBottom: "5px" }}>
                  <strong>{c.name}</strong> — {c.issuer}{" "}
                  <span style={{ color: "#9ca3af" }}>({c.year})</span>
                </div>
              ))}
            </Section>
          )}

          {/* LANGUAGES */}
          {languages?.length > 0 && (
            <Section title="Languages">
              <p style={{ fontSize: "13px" }}>
                {languages.map(l => l.name).join(" • ")}
              </p>
            </Section>
          )}
        </div>

        <div>
          {/* SKILLS */}
          {skills?.length > 0 && (
            <Section title="Skills">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {skills.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "4px 10px",
                      backgroundColor: "#f3f4f6",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: "bold",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* INTERESTS */}
          {interests?.length > 0 && (
            <Section title="Interests">
              <p style={{ fontSize: "13px" }}>
                {interests.join(" • ")}
              </p>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- SECTION ---------- */
function Section({ title, children }) {
  return (
    <section style={{ marginBottom: "22px" }}>
      <h2
        style={{
          fontSize: "13px",
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          borderBottom: "2px solid #000000",
          paddingBottom: "4px",
          marginBottom: "10px",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
