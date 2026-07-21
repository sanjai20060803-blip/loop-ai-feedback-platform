"use client";

import { useTransition } from "react";
import { FeedbackStatus } from "@/generated/prisma/enums";
import { updateFeedbackStatus } from "../actions/feedback.actions";

interface Props {
  feedbackId: string;
  currentStatus: FeedbackStatus;
}

export default function StatusSelector({
  feedbackId,
  currentStatus,
}: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={currentStatus}
      disabled={isPending}
      className="border rounded-lg px-3 py-2"
      onChange={(e) => {
        startTransition(async () => {
          await updateFeedbackStatus(
            feedbackId,
            e.target.value as FeedbackStatus
          );
        });
      }}
    >
      <option value="NEW">NEW</option>
      <option value="IN_REVIEW">IN REVIEW</option>
      <option value="RESOLVED">RESOLVED</option>
      <option value="ARCHIVED">ARCHIVED</option>
    </select>
  );
}