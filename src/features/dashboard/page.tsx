import { db } from "@/lib/db";


import SentimentChart from "./components/SentimentChart";
import SentimentPieChart from "./components/SentimentPieChart";
import FeedbackTrendChart from "./components/FeedbackTrendChart";
import ThemeChart from "./components/ThemeChart";
import AIInsights from "./components/AIInsights";
import DateFilter from "./components/DateFilter";
import ExportButton from "./components/ExportButton";
import GeneratePDFButton from "./components/GeneratePDFButton";
import EmailReportButton from "./components/EmailReportButton";
import NotificationBell from "./components/NotificationBell";
import SearchFeedback from "./components/SearchFeedback";

interface Props {
  searchParams?: {
    range?: string;
    search?: string;
  };
}

export default async function DashboardPage({
  searchParams,
}: Props) {
  const range = searchParams?.range ?? "all";
  const search = searchParams?.search ?? "";

  let fromDate: Date | undefined;

  const now = new Date();

  switch (range) {
    case "today":
      fromDate = new Date();
      fromDate.setHours(0, 0, 0, 0);
      break;

    case "7":
      fromDate = new Date();
      fromDate.setDate(now.getDate() - 7);
      break;

    case "30":
      fromDate = new Date();
      fromDate.setDate(now.getDate() - 30);
      break;

    case "90":
      fromDate = new Date();
      fromDate.setDate(now.getDate() - 90);
      break;

    default:
      fromDate = undefined;
  }

  const where: any = {};

if (fromDate) {
  where.createdAt = {
    gte: fromDate,
  };
}

if (search) {
  where.OR = [
    {
      title: {
        contains: search,
      },
    },
    {
      content: {
        contains: search,
      },
    },
  ];
}

 const [
  totalFeedback,
  positive,
  neutral,
  negative,
  reports,
  themes,
  users,
  highPriority,
  urgent,
  feedbackDates,
  themeData,
  recentFeedback,
  notifications,
] = await Promise.all([
    db.feedback.count({
      where,
    }),

    db.feedback.count({
      where: {
        ...where,
        sentiment: "POSITIVE",
      },
    }),

    db.feedback.count({
      where: {
        ...where,
        sentiment: "NEUTRAL",
      },
    }),

    db.feedback.count({
      where: {
        ...where,
        sentiment: "NEGATIVE",
      },
    }),

    db.report.count(),

    db.theme.count(),

    db.user.count(),

    db.feedback.count({
      where: {
        ...where,
        priority: "High",
      },
    }),

    db.feedback.count({
      where: {
        ...where,
        urgency: "High",
      },
    }),

    db.feedback.findMany({
      where,

      select: {
        createdAt: true,
      },

      orderBy: {
        createdAt: "asc",
      },
    }),

    db.theme.findMany({
      include: {
        feedbacks: true,
      },

      orderBy: {
        name: "asc",
      },
    }),

   
db.feedback.findMany({
  take: 5,
  orderBy: {
    createdAt: "desc",
  },
  select: {
    id: true,
    title: true,
    sentiment: true,
    priority: true,
    urgency: true,
    createdAt: true,
  },
}),

db.notification.findMany({
  orderBy: {
    createdAt: "desc",
  },
  take: 10,
}),
  ]);

  // ===========================
  // Monthly Trend
  // ===========================

  const monthlyMap = new Map<string, number>();

  feedbackDates.forEach((item) => {
    const month = item.createdAt.toLocaleString("default", {
      month: "short",
      year: "2-digit",
    });

    monthlyMap.set(
      month,
      (monthlyMap.get(month) ?? 0) + 1
    );
  });

  const trendLabels = Array.from(monthlyMap.keys());

  const trendValues = Array.from(monthlyMap.values());

  // ===========================
  // Theme Analytics
  // ===========================

  const themeLabels = themeData.map(
    (theme) => theme.name
  );

  const themeValues = themeData.map(
    (theme) => theme.feedbacks.length
  );

  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome to Project LOOP – AI Customer Feedback Intelligence Platform
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
           <SearchFeedback />
          <DateFilter />
          <ExportButton />
          <GeneratePDFButton
            total={totalFeedback}
            positive={positive}
            neutral={neutral}
            negative={negative}
            highPriority={highPriority}
            urgent={urgent}
            reports={reports}
            themes={themes}
            users={users}
          />

           <EmailReportButton
    total={totalFeedback}
    positive={positive}
    neutral={neutral}
    negative={negative}
    urgent={urgent}
    highPriority={highPriority}
  />

     <NotificationBell notifications={notifications} />
        </div>

      </div>

      {/* KPI Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">

        <Card
          title="Total Feedback"
          value={totalFeedback}
        />

        <Card
          title="Positive Feedback"
          value={positive}
        />

        <Card
          title="Neutral Feedback"
          value={neutral}
        />

        <Card
          title="Negative Feedback"
          value={negative}
        />

        <Card
          title="Themes"
          value={themes}
        />

        <Card
          title="Reports"
          value={reports}
        />

        <Card
          title="Users"
          value={users}
        />

        <Card
          title="High Priority"
          value={highPriority}
        />

        <Card
          title="Urgent Issues"
          value={urgent}
        />

      </div>

            {/* Executive Summary */}

      <div className="bg-white rounded-xl shadow border p-8">

        <h2 className="text-2xl font-bold mb-4">
          🤖 AI Executive Summary
        </h2>

        <div className="space-y-3 text-slate-700">

          <p>
            <strong>Total Feedback:</strong> {totalFeedback}
          </p>

          <p>
            <strong>Positive:</strong> {positive}
          </p>

          <p>
            <strong>Neutral:</strong> {neutral}
          </p>

          <p>
            <strong>Negative:</strong> {negative}
          </p>

          <p>
            <strong>High Priority:</strong> {highPriority}
          </p>

          <p>
            <strong>Urgent Issues:</strong> {urgent}
          </p>

          <hr />

          <p>
            Overall customer sentiment is{" "}
            <strong>
              {positive >= negative
                ? "generally positive"
                : "needs attention"}
            </strong>.
          </p>

          <p>
            {urgent > 0
              ? `There are ${urgent} urgent feedback item(s) requiring immediate attention.`
              : "No urgent customer issues detected."}
          </p>

        </div>

      </div>

      {/* Sentiment Charts */}

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-xl shadow border p-8">

          <h2 className="text-2xl font-bold mb-6">
            📊 Sentiment Analytics
          </h2>

          <SentimentChart
            positive={positive}
            neutral={neutral}
            negative={negative}
          />

        </div>

        <div className="bg-white rounded-xl shadow border p-8">

          <h2 className="text-2xl font-bold mb-6">
            🥧 Feedback Distribution
          </h2>

          <SentimentPieChart
            positive={positive}
            neutral={neutral}
            negative={negative}
          />

        </div>

      </div>

      {/* Monthly Trend */}

      <div className="bg-white rounded-xl shadow border p-8">

        <h2 className="text-2xl font-bold mb-6">
          📈 Monthly Feedback Trend
        </h2>

        <FeedbackTrendChart
          labels={trendLabels}
          values={trendValues}
        />

      </div>

      {/* Theme Analytics */}

<div className="bg-white rounded-xl shadow border p-8">
  <h2 className="text-2xl font-bold mb-6">
    🔥 Top Feedback Themes
  </h2>

  <ThemeChart
    labels={themeLabels}
    values={themeValues}
  />
</div>

{/* AI Insights */}

<AIInsights
  total={totalFeedback}
  positive={positive}
  negative={negative}
  urgent={urgent}
  highPriority={highPriority}
/>

{/* Recent Feedback */}

<div className="bg-white rounded-xl shadow border p-8">
  <h2 className="text-2xl font-bold mb-6">
    🕒 Recent Feedback
  </h2>

  <div className="space-y-4">
    {recentFeedback.length === 0 ? (
      <p className="text-slate-500">
        No feedback available.
      </p>
    ) : (
      recentFeedback.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">
              {item.title ?? "Untitled"}
            </h3>

            <p className="text-sm text-slate-500">
              {item.createdAt.toLocaleDateString()}
            </p>
          </div>

          <div className="text-right text-sm">
            <p>
              <strong>Sentiment:</strong>{" "}
              {item.sentiment ?? "-"}
            </p>

            <p>
              <strong>Priority:</strong>{" "}
              {item.priority ?? "-"}
            </p>

            <p>
              <strong>Urgency:</strong>{" "}
              {item.urgency ?? "-"}
            </p>
          </div>
        </div>
      ))
    )}
  </div>
</div>

</div>
);
}

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-xl border shadow p-6 hover:shadow-lg transition">
      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3 text-cyan-600">
        {value}
      </h2>
    </div>
  );
}