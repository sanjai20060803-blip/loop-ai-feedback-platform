import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stringify } from "csv-stringify/sync";

export async function GET() {
  const feedbacks = await db.feedback.findMany({
    include: {
      workspace: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const csv = stringify(
    feedbacks.map((item) => ({
      Title: item.title ?? "",
      Content: item.content,
      Channel: item.channel,
      Sentiment: item.sentiment ?? "",
      Status: item.status,
      Priority: item.priority ?? "",
      Urgency: item.urgency ?? "",
      Workspace: item.workspace.name,
      Created: item.createdAt.toISOString(),
    })),
    {
      header: true,
    }
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition":
        'attachment; filename="feedback.csv"',
    },
  });
}