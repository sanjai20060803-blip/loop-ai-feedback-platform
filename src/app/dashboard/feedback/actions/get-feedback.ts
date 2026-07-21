"use server";

import { db } from "@/lib/db";

export async function getFeedback() {
  return await db.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}