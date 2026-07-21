interface Props {
  total: number;
  positive: number;
  negative: number;
  urgent: number;
  highPriority: number;
}

export default function AIInsights({
  total,
  positive,
  negative,
  urgent,
  highPriority,
}: Props) {
  const insights: string[] = [];

  if (positive >= negative) {
    insights.push(
      "✅ Overall customer satisfaction is healthy."
    );
  } else {
    insights.push(
      "⚠ Customer satisfaction is declining."
    );
  }

  if (urgent > 0) {
    insights.push(
      `🚨 ${urgent} urgent feedback item(s) require immediate attention.`
    );
  }

  if (highPriority > 0) {
    insights.push(
      `🔥 ${highPriority} high-priority issue(s) should be reviewed today.`
    );
  }

  if (negative > positive) {
    insights.push(
      "📉 Negative feedback exceeds positive feedback."
    );
  }

  if (total === 0) {
    insights.push(
      "ℹ No feedback has been collected yet."
    );
  }

  return (
    <div className="bg-white rounded-xl border shadow p-8">
      <h2 className="text-2xl font-bold mb-6">
        🤖 AI Business Insights
      </h2>

      <div className="space-y-4">
        {insights.map((item, index) => (
          <div
            key={index}
            className="rounded-lg bg-slate-50 p-4 border"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}