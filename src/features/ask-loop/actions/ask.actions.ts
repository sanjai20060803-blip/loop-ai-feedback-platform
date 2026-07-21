"use server";

import { db } from "@/lib/db";

export async function askAI(question: string) {
  if (!question.trim()) {
    return "Please enter a question.";
  }

  const feedbacks = await db.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (feedbacks.length === 0) {
    return "No customer feedback available.";
  }

  const q = question.toLowerCase();

  const total = feedbacks.length;

  const positiveFeedback = feedbacks.filter(
    (f) => f.sentiment === "POSITIVE"
  );

  const neutralFeedback = feedbacks.filter(
    (f) => f.sentiment === "NEUTRAL"
  );

  const negativeFeedback = feedbacks.filter(
    (f) => f.sentiment === "NEGATIVE"
  );

  const positive = positiveFeedback.length;
  const neutral = neutralFeedback.length;
  const negative = negativeFeedback.length;

  // ------------------------
  // Negative Feedback
  // ------------------------

  if (
    q.includes("negative") ||
    q.includes("complaint") ||
    q.includes("problem")
  ) {
    return `
LOOP AI

Negative Feedback Report

Total Negative Feedback : ${negative}

${negativeFeedback.length === 0
  ? "No negative feedback found."
  : negativeFeedback
      .map(
        (item, index) =>
          `${index + 1}. ${item.title ?? "Untitled"} - ${item.content}`
      )
      .join("\n")}
`;
  }

  // ------------------------
  // Positive Feedback
  // ------------------------

  if (
    q.includes("positive") ||
    q.includes("good") ||
    q.includes("happy")
  ) {
    return `
LOOP AI

Positive Feedback Report

Total Positive Feedback : ${positive}

${positiveFeedback.length === 0
  ? "No positive feedback found."
  : positiveFeedback
      .map(
        (item, index) =>
          `${index + 1}. ${item.title ?? "Untitled"} - ${item.content}`
      )
      .join("\n")}
`;
  }

  // ------------------------
  // Neutral Feedback
  // ------------------------

  if (q.includes("neutral")) {
    return `
LOOP AI

Neutral Feedback Report

Total Neutral Feedback : ${neutral}

${neutralFeedback.length === 0
  ? "No neutral feedback found."
  : neutralFeedback
      .map(
        (item, index) =>
          `${index + 1}. ${item.title ?? "Untitled"} - ${item.content}`
      )
      .join("\n")}
`;
  }

  // ------------------------
  // Signup Issues
  // ------------------------

  if (q.includes("signup")) {
    const signupIssues = feedbacks.filter((f) =>
      f.content.toLowerCase().includes("signup")
    );

    return `
LOOP AI

Signup Issues

Total Signup Related Feedback : ${signupIssues.length}

${signupIssues.length === 0
  ? "No signup issues found."
  : signupIssues
      .map(
        (item, index) =>
          `${index + 1}. ${item.title ?? "Untitled"} - ${item.content}`
      )
      .join("\n")}
`;
  }

  // ------------------------
  // Status
  // ------------------------

  if (q.includes("status")) {
    const newCount = feedbacks.filter(
      (f) => f.status === "NEW"
    ).length;

    const reviewCount = feedbacks.filter(
      (f) => f.status === "IN_REVIEW"
    ).length;

    const resolvedCount = feedbacks.filter(
      (f) => f.status === "RESOLVED"
    ).length;

    return `
LOOP AI

Feedback Status Report

New : ${newCount}

In Review : ${reviewCount}

Resolved : ${resolvedCount}
`;
  }

  // ------------------------
  // Overall Summary
  // ------------------------

  let summary = "";

  if (positive > negative) {
    summary = "Overall customer satisfaction is positive.";
  } else if (negative > positive) {
    summary = "Customers are reporting several issues.";
  } else {
    summary = "Customer sentiment is balanced.";
  }

  return `
LOOP AI Analysis

Question

${question}

Summary

${summary}

Statistics

Total Feedback : ${total}

Positive : ${positive}

Neutral : ${neutral}

Negative : ${negative}

Latest Feedback

${feedbacks
  .slice(0, 5)
  .map(
    (item, index) =>
      `${index + 1}. ${item.title ?? "Untitled"} - ${item.content}`
  )
  .join("\n")}
`;
}