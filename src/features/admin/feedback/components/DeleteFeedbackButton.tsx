"use client";

import { useTransition } from "react";
import { deleteFeedback } from "../actions/feedback.actions";

interface Props {
  feedbackId: string;
}

export default function DeleteFeedbackButton({
  feedbackId,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Delete this feedback?")) return;

    startTransition(async () => {
      await deleteFeedback(feedbackId);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}