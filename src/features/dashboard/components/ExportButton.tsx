"use client";

export default function ExportButton() {
  return (
    <a
      href="/api/export/feedback"
      className="px-5 py-3 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition"
    >
      ⬇ Export CSV
    </a>
  );
}