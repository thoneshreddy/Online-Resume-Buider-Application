import TemplateOne from "../templates/TemplateOne";
import TemplateTwo from "../templates/TemplateTwo";
import TemplateThree from "../templates/TemplateThree";

export default function ResumePreview({ resume }) {

  // ✅ ALWAYS RENDER A PLACEHOLDER (VERY IMPORTANT)
  if (!resume) {
    return (
      <div
        style={{
          width: "794px",
          minHeight: "1123px",
          backgroundColor: "#ffffff",
        }}
      />
    );
  }

  const templateName = resume.template?.name || "template-one";

  switch (templateName) {
    case "template-two":
      return <TemplateTwo resume={resume} />;

    case "template-three":
      return <TemplateThree resume={resume} />;

    case "template-one":
    default:
      return <TemplateOne resume={resume} />;
  }
}
