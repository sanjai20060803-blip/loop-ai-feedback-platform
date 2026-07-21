"use server";

import { db } from "@/lib/db";

export async function getFeedbacks() {
  return await db.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      workspace: true,
      themes: {
        include: {
          theme: true,
        },
      },
    },
  });
}