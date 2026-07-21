"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createNotification } from "@/features/notifications/actions/notification.actions";
import { PrismaClient } from "@/generated/prisma/client";
const prisma = new PrismaClient();

export async function createFeedback(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const channel = formData.get("channel") as string;
  const customerLabel = formData.get("customerLabel") as string;

  // Use the existing workspace
  const workspace = await db.workspace.findFirst();

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  await prisma.feedback.create({

    data: {
      title,
      content,
      channel: channel as any,
      customerLabel,
      workspaceId: workspace.id,
    },
  });

  // Create notification
  await createNotification(
    "📝 New Feedback Submitted",
    `${title || "Untitled Feedback"} has been submitted.`
  );

  // Refresh pages
  revalidatePath("/dashboard/feedback");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/admin/feedback");

  
}
