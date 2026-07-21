"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  return db.notification.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createNotification(
  title: string,
  message: string
) {
  return db.notification.create({
    data: {
      title,
      message,
    },
  });
}

export async function markNotificationRead(
  id: string
) {
  await db.notification.update({
    where: {
      id,
    },
    data: {
      read: true,
    },
  });

  revalidatePath("/dashboard");
}

export async function deleteNotification(
  id: string
) {
  await db.notification.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard");
}