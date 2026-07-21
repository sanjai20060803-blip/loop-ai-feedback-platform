"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Props {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
  theme: string;
}

export default function ExportButtons({
  total,
  positive,
  neutral,
  negative,
  theme,
}: Props) {
  function exportPDF() {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Project LOOP Report", 20, 20);

    autoTable(doc, {
      startY: 35,
      head: [["Metric", "Value"]],
      body: [
        ["Total Feedback", total],
        ["Positive", positive],
        ["Neutral", neutral],
        ["Negative", negative],
        ["Top Theme", theme],
      ],
    });

    doc.save("loop-report.pdf");
  }

  function exportCSV() {
    const csv = [
      ["Metric", "Value"],
      ["Total Feedback", total],
      ["Positive", positive],
      ["Neutral", neutral],
      ["Negative", negative],
      ["Top Theme", theme],
    ];

    const content = csv.map((row) => row.join(",")).join("\n");

    const blob = new Blob([content], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "loop-report.csv";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={exportPDF}
        className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700"
      >
        Export PDF
      </button>

      <button
        onClick={exportCSV}
        className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
      >
        Export CSV
      </button>
    </div>
  );
}