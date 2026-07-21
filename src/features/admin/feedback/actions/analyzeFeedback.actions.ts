"use server";

import { db } from "@/lib/db";
import { ai } from "@/lib/gemini";
import { Sentiment } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";

export async function analyzeFeedback(feedbackId: string) {
  const feedback = await db.feedback.findUnique({
    where: {
      id: feedbackId,
    },
    include: {
      themes: {
        include: {
          theme: true,
        },
      },
    },
  });

  if (!feedback) {
    return null;
  }

  const text = `${feedback.title ?? ""} ${feedback.content}`;

  let result = {
    theme:
      feedback.themes[0]?.theme.name ?? "General",
    sentiment: "NEUTRAL",
    priority: "Medium",
    urgency: "Medium",
    summary: "",
    suggestedResponse: "",
  };

  try {
    const prompt = `
You are an AI customer feedback analyst.

Analyze the feedback below.

Return ONLY valid JSON.

{
  "theme":"",
  "sentiment":"",
  "priority":"",
  "urgency":"",
  "summary":"",
  "suggestedResponse":""
}

Feedback:
${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const json = response.text
      ?.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    if (json) {
      result = JSON.parse(json);
    }
  } catch {
    // Local fallback

    const lower = text.toLowerCase();

    if (
      lower.includes("login") ||
      lower.includes("signup") ||
      lower.includes("signin")
    ) {
      result.theme = "Login";
    }

    if (
      lower.includes("error") ||
      lower.includes("bug") ||
      lower.includes("problem") ||
      lower.includes("failed")
    ) {
      result.sentiment = "NEGATIVE";
      result.priority = "High";
      result.urgency = "High";
    } else {
      result.sentiment = "POSITIVE";
      result.priority = "Low";
      result.urgency = "Low";
    }

    result.summary =
      "AI fallback analysis generated because Gemini was unavailable.";

    result.suggestedResponse =
      "Thank you for your feedback. Our support team will investigate this issue.";
  }

  await db.feedback.update({
    where: {
      id: feedbackId,
    },
    data: {
      sentiment:
        result.sentiment as Sentiment,

      priority: result.priority,

      urgency: result.urgency,

      summary: result.summary,

      suggestedResponse:
        result.suggestedResponse,
    },
  });

  revalidatePath(
    `/dashboard/admin/feedback/${feedbackId}`
  );

  return result;
}