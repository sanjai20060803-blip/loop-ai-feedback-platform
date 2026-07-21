"use client";

import { useTransition, useState } from "react";
import { detectTheme } from "../actions/theme.actions";

interface Props {
  feedbackId: string;
}

export default function AnalyzeThemeButton({
  feedbackId,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [theme, setTheme] = useState("");

  function handleAnalyze() {
    startTransition(async () => {
      const result = await detectTheme(feedbackId);

      if (result) {
        setTheme(result);
      }
    });
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleAnalyze}
        disabled={isPending}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
      >
        {isPending ? "Analyzing..." : "Analyze AI"}
      </button>

      {theme && (
        <p className="text-green-600 font-semibold">
          Detected Theme: {theme}
        </p>
      )}
    </div>
  );
}