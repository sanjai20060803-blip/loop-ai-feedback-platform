import { db } from "@/lib/db";

import ChannelChart from "./components/ChannelChart";
import SentimentChart from "./components/SentimentChart";
import TrendChart from "./components/TrendChart";

export default async function AnalyticsPage() {
  // Total Feedback
  const total = await db.feedback.count();

  // Channel Analytics
  const channels = await db.feedback.groupBy({
    by: ["channel"],
    _count: true,
  });

  // Status Analytics
  const status = await db.feedback.groupBy({
    by: ["status"],
    _count: true,
  });

  // Sentiment Counts
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

  const csat =
  total === 0
    ? 0
    : Math.round((positive / total) * 100);


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


  const channelData = channels.map((c) => ({
    channel: c.channel,
    count: c._count,
  }));

  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Analytics
        </h1>

        <p className="text-slate-500 mt-2">
          Customer feedback insights and trends.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 xl:grid-cols-6 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Total Feedback
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {total}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Positive
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {positive}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Neutral
          </p>

          <h2 className="text-4xl font-bold text-yellow-500 mt-2">
            {neutral}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Negative
          </p>

          <h2 className="text-4xl font-bold text-red-600 mt-2">
            {negative}
          </h2>
        </div>

      </div>


      <div className="bg-white rounded-xl shadow p-6">

  <p className="text-gray-500">
    High Priority
  </p>

  <h2 className="text-4xl font-bold text-orange-600 mt-2">
    {highPriority}
  </h2>

</div>

<div className="bg-white rounded-xl shadow p-6">

  <p className="text-gray-500">
    Urgent
  </p>

  <h2 className="text-4xl font-bold text-red-700 mt-2">
    {urgent}
  </h2>

</div>


<div className="bg-white rounded-xl shadow p-6">

  <p className="text-gray-500">
    Customer Satisfaction
  </p>

  <h2 className="text-4xl font-bold text-cyan-600 mt-2">
    {csat}%
  </h2>

</div>

      {/* Channel Chart */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-6">
          Feedback by Channel
        </h2>

        <ChannelChart data={channelData} />

      </div>

      {/* Status Table */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Feedback Status
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Status
              </th>

              <th className="text-right py-3">
                Count
              </th>

            </tr>

          </thead>

          <tbody>

            {status.map((item) => (

              <tr
                key={item.status}
                className="border-b"
              >

                <td className="py-3">
                  {item.status}
                </td>

                <td className="py-3 text-right font-semibold">
                  {item._count}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Sentiment Distribution
          </h2>

          <SentimentChart
            positive={positive}
            neutral={neutral}
            negative={negative}
          />

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Monthly Trend
          </h2>

          <TrendChart />

        </div>

      </div>
        <div className="bg-white rounded-xl shadow p-8">

  <h2 className="text-2xl font-bold mb-6">
    🤖 AI Insights
  </h2>

  <div className="space-y-3">

    <p>

      Overall customer satisfaction is

      <strong>

        {csat >= 70
          ? " Excellent"
          : csat >= 50
          ? " Moderate"
          : " Needs Improvement"}

      </strong>

    </p>

    <p>

      Positive Feedback:
      <strong> {positive}</strong>

    </p>

    <p>

      Negative Feedback:
      <strong> {negative}</strong>

    </p>

    <p>

      High Priority Issues:
      <strong> {highPriority}</strong>

    </p>

    <p>

      Urgent Cases:
      <strong> {urgent}</strong>

    </p>

    <hr />

    <p>

      {negative > positive
        ? "Customers are experiencing more issues than positive experiences. Immediate action is recommended."
        : "Customer sentiment is healthy. Continue monitoring trends and resolving high-priority issues."}

    </p>

  </div>

</div>
    </div>
  );
}