import { db } from "@/lib/db";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ExportButtons from "./components/ExportButtons";
import Link from "next/link";

export default async function ReportsPage() {
  // Statistics
  const total = await db.feedback.count();

  const positive = await db.feedback.count({
    where: {
      sentiment: "POSITIVE",
    },
  });

  const neutral = await db.feedback.count({
    where: {
      sentiment: "NEUTRAL",
    },
  });

  const negative = await db.feedback.count({
    where: {
      sentiment: "NEGATIVE",
    },
  });

  const highPriority = await db.feedback.count({
  where: {
    priority: "High",
  },
});

const urgent = await db.feedback.count({
  where: {
    urgency: "High",
  },
});

  // Top Theme
  const themes = await db.theme.findMany({
  include: {
    feedbacks: true,
  },
  orderBy: {
    name: "asc",
  },
});

const topTheme = themes[0];

  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Reports
        </h1>

        <p className="text-slate-500 mt-2">
          AI-generated customer intelligence reports.
        </p>
      </div>

      {/* Export Buttons */}

      <ExportButtons
        total={total}
        positive={positive}
        neutral={neutral}
        negative={negative}
        theme={topTheme?.name ?? "None"}
      />

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-3">

        <Card>
          <CardHeader>
            <CardTitle>Total Feedback</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">
              {total}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Positive Feedback</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold text-green-600">
              {positive}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Negative Feedback</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold text-red-600">
              {negative}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Executive Summary */}

      <Card>

        <CardHeader>
          <CardTitle>
            Executive Summary
          </CardTitle>
        </CardHeader>

        <CardContent>

          <p className="mb-3">
            <strong>Total Feedback:</strong> {total}
          </p>

          <p className="mb-3">
            <strong>Positive:</strong> {positive}
          </p>

          <p className="mb-3">
            <strong>Neutral:</strong> {neutral}
          </p>

          <p className="mb-3">
            <strong>Negative:</strong> {negative}
          </p>

          <p className="mb-3">
            <strong>Top Theme:</strong>{" "}
            {topTheme?.name ?? "No theme detected"}
          </p>

        </CardContent>

      </Card>


      <Card>

  <CardHeader>
    <CardTitle>
      🗣 Voice of Customer
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">

    <p>
      Customers submitted
      <strong> {total}</strong>
      feedback records.
    </p>

    <p>
      😊 Positive:
      <strong> {positive}</strong>
    </p>

    <p>
      😐 Neutral:
      <strong> {neutral}</strong>
    </p>

    <p>
      😞 Negative:
      <strong> {negative}</strong>
    </p>

    <p>
      🔥 High Priority:
      <strong> {highPriority}</strong>
    </p>

    <p>
      🚨 Urgent Issues:
      <strong> {urgent}</strong>
    </p>

    <p>
      ⭐ Top Theme:
      <strong> {topTheme?.name ?? "None"}</strong>
    </p>

    <hr />

    <p className="text-slate-600">

      {positive >= negative
        ? "Overall customer satisfaction is positive. Continue improving successful areas while monitoring high-priority issues."
        : "Customer satisfaction needs attention. Focus on urgent issues and recurring complaints to improve the overall experience."}

    </p>

  </CardContent>

</Card>

  


    <Card>

  <CardHeader>
    <CardTitle>
      🤖 AI Recommendations
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-3">

    <p>
      {negative > positive
        ? "Customer satisfaction requires immediate attention."
        : "Customer sentiment is healthy overall."}
    </p>

    <p>
      {urgent > 0
        ? `Resolve ${urgent} urgent issue(s) immediately.`
        : "No urgent issues detected."}
    </p>

    <p>
      Continue monitoring customer feedback trends and recurring themes.
    </p>

  </CardContent>

</Card>

    <Card>

  <CardHeader>
    <CardTitle>
      🔥 Theme Summary
    </CardTitle>
  </CardHeader>

  <CardContent>

    <div className="space-y-4">

      {themes.map((theme) => (

        <div
          key={theme.id}
          className="flex justify-between border-b pb-2"
        >

          <span>{theme.name}</span>

          <span className="font-semibold">
            {theme.feedbacks.length}
          </span>

        </div>

      ))}

    </div>

  </CardContent>

</Card>

    </div>
  );
}