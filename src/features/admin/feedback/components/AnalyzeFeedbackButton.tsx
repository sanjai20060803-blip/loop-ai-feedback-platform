"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { analyzeFeedback } from "../actions/analyzeFeedback.actions";

interface Props {
  feedbackId: string;
}

export default function AnalyzeFeedbackButton({
  feedbackId,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleAnalyze() {
    startTransition(async () => {
      await analyzeFeedback(feedbackId);
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleAnalyze}
      disabled={isPending}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
    >
      {isPending ? "Analyzing..." : "Analyze Feedback"}
    </button>
  );
}