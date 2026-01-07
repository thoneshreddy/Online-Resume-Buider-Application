import t1 from "../../assets/templates/template1.png";
import t2 from "../../assets/templates/template2.png";
import t3 from "../../assets/templates/template3.png";

const templates = [
  { id: "template-one", label: "Classic", img: t1 },
  { id: "template-two", label: "Modern", img: t2 },
  { id: "template-three", label: "Two Column", img: t3 },
];

export default function TemplateSwitcher({ resume, setResume }) {
  return (
    <div>
      <h3>Select Template</h3>

      <div style={{ display: "flex", gap: 20 }}>
        {templates.map((t) => (
          <div
            key={t.id}
            onClick={() =>
              setResume({
                ...resume,
                template: {
                  ...resume.template,
                  name: t.id,
                },
              })
            }
            style={{
              border:
                resume.template?.name === t.id
                  ? "3px solid #2563eb"
                  : "1px solid #ccc",
              padding: 8,
              cursor: "pointer",
              borderRadius: 6,
              width: 160,
            }}
          >
            <img
              src={t.img}
              alt={t.label}
              style={{ width: "100%", borderRadius: 4 }}
            />
            <p style={{ textAlign: "center", marginTop: 6 }}>
              {t.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
