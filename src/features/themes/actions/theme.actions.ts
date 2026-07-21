"use server";

import { db } from "@/lib/db";

export async function detectThemes() {
  const feedbacks = await db.feedback.findMany();

  const themes = new Map<string, number>();

  feedbacks.forEach((feedback) => {
    const text = (
      (feedback.title ?? "") +
      " " +
      feedback.content
    ).toLowerCase();

    let theme = "General";

    if (
      text.includes("login") ||
      text.includes("signup") ||
      text.includes("password") ||
      text.includes("authentication")
    ) {
      theme = "Authentication";
    }

    else if (
      text.includes("dashboard") ||
      text.includes("ui") ||
      text.includes("design") ||
      text.includes("button")
    ) {
      theme = "UI / UX";
    }

    else if (
      text.includes("slow") ||
      text.includes("performance") ||
      text.includes("lag")
    ) {
      theme = "Performance";
    }

    else if (
      text.includes("crash") ||
      text.includes("bug") ||
      text.includes("error")
    ) {
      theme = "Stability";
    }

    else if (
      text.includes("search")
    ) {
      theme = "Search";
    }

    themes.set(theme, (themes.get(theme) ?? 0) + 1);
  });

  return Array.from(themes.entries()).map(([name, count]) => ({
    name,
    count,
  }));
}