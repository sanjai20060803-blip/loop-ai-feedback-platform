"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { FeedbackStatus } from "@/generated/prisma";

export async function updateFeedbackStatus(
  feedbackId: string,
  status: FeedbackStatus
) {
  await db.feedback.update({
    where: {
      id: feedbackId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/dashboard/admin/feedback");
}

export async function deleteFeedback(
  feedbackId: string
) {
  await db.feedback.delete({
    where: {
      id: feedbackId,
    },
  });

  revalidatePath("/dashboard/admin/feedback");
}