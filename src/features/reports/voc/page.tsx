import { db } from "@/lib/db";

export default async function VoiceOfCustomerPage() {
  const feedback = await db.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const positive = feedback.filter(
    (f) => f.sentiment === "POSITIVE"
  );

  const negative = feedback.filter(
    (f) => f.sentiment === "NEGATIVE"
  );

  const neutral = feedback.filter(
    (f) => f.sentiment === "NEUTRAL"
  );

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Voice of Customer Report
        </h1>

        <p className="text-slate-500 mt-2">
          AI-generated customer intelligence report.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-green-100 rounded-xl p-6">
          <h2 className="text-xl font-bold">
            Positive
          </h2>

          <p className="text-5xl mt-4">
            {positive.length}
          </p>
        </div>

        <div className="bg-yellow-100 rounded-xl p-6">
          <h2 className="text-xl font-bold">
            Neutral
          </h2>

          <p className="text-5xl mt-4">
            {neutral.length}
          </p>
        </div>

        <div className="bg-red-100 rounded-xl p-6">
          <h2 className="text-xl font-bold">
            Negative
          </h2>

          <p className="text-5xl mt-4">
            {negative.length}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl border shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          Executive Summary
        </h2>

        <p>
          Total Feedback : {feedback.length}
        </p>

        <p>
          Positive : {positive.length}
        </p>

        <p>
          Neutral : {neutral.length}
        </p>

        <p>
          Negative : {negative.length}
        </p>

      </div>

    </div>
  );
}