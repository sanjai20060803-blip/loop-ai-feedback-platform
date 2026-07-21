"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Props {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
  highPriority: number;
  urgent: number;
  reports: number;
  themes: number;
  users: number;
}

export default function GeneratePDFButton({
  total,
  positive,
  neutral,
  negative,
  highPriority,
  urgent,
  reports,
  themes,
  users,
}: Props) {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Project LOOP", 14, 20);

    doc.setFontSize(12);
    doc.text(
      "AI Customer Feedback Intelligence Report",
      14,
      30
    );

    autoTable(doc, {
      startY: 40,
      head: [["Metric", "Value"]],
      body: [
        ["Total Feedback", total],
        ["Positive", positive],
        ["Neutral", neutral],
        ["Negative", negative],
        ["High Priority", highPriority],
        ["Urgent", urgent],
        ["Reports", reports],
        ["Themes", themes],
        ["Users", users],
      ],
    });

    let summary = "";

    if (positive >= negative) {
      summary =
        "Overall customer sentiment is generally positive.";
    } else {
      summary =
        "Customer sentiment requires immediate attention.";
    }

    doc.text("AI Executive Summary", 14, 140);

    doc.setFontSize(11);

    doc.text(summary, 14, 150);

    if (urgent > 0) {
      doc.text(
        `${urgent} urgent issue(s) require immediate attention.`,
        14,
        160
      );
    } else {
      doc.text(
        "No urgent customer issues detected.",
        14,
        160
      );
    }

    doc.save("Project_LOOP_Report.pdf");
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg transition"
    >
      📄 Generate PDF
    </button>
  );
}