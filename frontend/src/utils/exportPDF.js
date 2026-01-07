import html2pdf from "html2pdf.js";

export const exportPDF = async (
  title = "resume",
  elementId = "resume-export-root"
) => {
  const element = document.getElementById(elementId);

  if (!element) {
    throw new Error("Export root not found in DOM");
  }

  // 🔑 Force browser to finish layout
  await new Promise((r) => requestAnimationFrame(r));
  await new Promise((r) => setTimeout(r, 200));

  const options = {
    margin: 0,
    filename: `${title.replace(/\s+/g, "_")}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    },
    jsPDF: {
      unit: "px",
      format: [794, 1123],
      orientation: "portrait",
    },
  };

  return html2pdf().set(options).from(element).save();
};
