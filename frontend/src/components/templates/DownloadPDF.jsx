// import html2pdf from "html2pdf.js";

// const DownloadPDF = () => {
//   const download = () => {
//     const element = document.getElementById("resume-preview");

//     html2pdf()
//       .set({
//         margin: 0.5,
//         filename: "resume.pdf",
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
//       })
//       .from(element)
//       .save();
//   };

//   return (
//     <button
//       onClick={download}
//       className="bg-primary text-white px-4 py-2 rounded"
//     >
//       Download PDF
//     </button>
//   );
// };

// export default DownloadPDF;
