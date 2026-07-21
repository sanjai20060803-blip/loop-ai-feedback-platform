"use server";

import { db } from "@/lib/db";
import { ai } from "@/lib/gemini";
import { revalidatePath } from "next/cache";

export async function detectTheme(feedbackId: string) {
  const feedback = await db.feedback.findUnique({
    where: {
      id: feedbackId,
    },
  });

  if (!feedback) {
    return null;
  }

  const prompt = `
You are an AI Theme Detection system.

Your task is to classify customer feedback into EXACTLY ONE theme.

Rules:

signup, signin, login, authentication, password, account access → Login

payment, card, transaction, checkout → Payment

refund, money back → Refund

slow, lag, performance → Performance

bug, error, crash → Bug

UI, design, interface → UI

feature request, suggestion → Feature Request

pricing, subscription → Pricing

support, service → Customer Support

If none match, return:
General

Return ONLY ONE WORD OR PHRASE.

Feedback Title:
${feedback.title ?? ""}

Feedback:
${feedback.content}
`;

  let themeName = "General";

  try {
    // Try Gemini AI first
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    themeName =
      response.text?.trim().replace(/["']/g, "") || "General";

    console.log("Gemini detected theme:", themeName);
  } catch (error) {
    console.log("Gemini unavailable. Using local AI...");

    const text = (
      (feedback.title ?? "") +
      " " +
      feedback.content
    ).toLowerCase();

    if (
      text.includes("login") ||
      text.includes("signin") ||
      text.includes("signup") ||
      text.includes("authentication") ||
      text.includes("password") ||
      text.includes("account")
    ) {
      themeName = "Login";
    } else if (
      text.includes("payment") ||
      text.includes("card") ||
      text.includes("checkout") ||
      text.includes("transaction")
    ) {
      themeName = "Payment";
    } else if (
      text.includes("refund") ||
      text.includes("money back")
    ) {
      themeName = "Refund";
    } else if (
      text.includes("slow") ||
      text.includes("performance") ||
      text.includes("lag")
    ) {
      themeName = "Performance";
    } else if (
      text.includes("bug") ||
      text.includes("error") ||
      text.includes("crash")
    ) {
      themeName = "Bug";
    } else if (
      text.includes("ui") ||
      text.includes("design") ||
      text.includes("interface")
    ) {
      themeName = "UI";
    } else if (
      text.includes("feature") ||
      text.includes("suggestion") ||
      text.includes("request")
    ) {
      themeName = "Feature Request";
    } else if (
      text.includes("pricing") ||
      text.includes("subscription") ||
      text.includes("price")
    ) {
      themeName = "Pricing";
    } else if (
      text.includes("support") ||
      text.includes("service") ||
      text.includes("help")
    ) {
      themeName = "Customer Support";
    } else {
      themeName = "General";
    }

    console.log("Local AI detected theme:", themeName);
  }

  let theme = await db.theme.findFirst({
    where: {
      workspaceId: feedback.workspaceId,
      name: themeName,
    },
  });

  if (!theme) {
    theme = await db.theme.create({
      data: {
        name: themeName,
        workspaceId: feedback.workspaceId,
      },
    });
  }

  const exists = await db.feedbackTheme.findUnique({
    where: {
      feedbackId_themeId: {
        feedbackId,
        themeId: theme.id,
      },
    },
  });

  if (!exists) {
    await db.feedbackTheme.create({
      data: {
        feedbackId,
        themeId: theme.id,
      },
    });
  }

  revalidatePath(`/dashboard/admin/feedback/${feedbackId}`);

  return themeName;
}