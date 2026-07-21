"use client";

import { useState } from "react";

interface Props {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
  urgent: number;
  highPriority: number;
}

export default function EmailReportButton({
  total,
  positive,
  neutral,
  negative,
  urgent,
  highPriority,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function send() {
    const email = prompt("Recipient email");

    if (!email) return;

    setLoading(true);

    await fetch("/api/email/report", {
      method: "POST",
      body: JSON.stringify({
        email,
        total,
        positive,
        neutral,
        negative,
        urgent,
        highPriority,
      }),
    });

    setLoading(false);

    alert("Report sent.");
  }

  return (
    <button
      onClick={send}
      disabled={loading}
      className="px-5 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
    >
      {loading ? "Sending..." : "📧 Email Report"}
    </button>
  );
}