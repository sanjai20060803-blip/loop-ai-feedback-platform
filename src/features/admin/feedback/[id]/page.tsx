import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import AnalyzeThemeButton from "../components/AnalyzeThemeButton";
import AnalyzeFeedbackButton from "../components/AnalyzeFeedbackButton";

interface Props {
  params: {
    id: string;
  };
}

export default async function FeedbackDetailsPage({
  params,
}: Props) {
  const feedback = await db.feedback.findUnique({
    where: {
      id: params.id,
    },
    include: {
      workspace: true,
      themes: {
        include: {
          theme: true,
        },
      },
    },
  });

  if (!feedback) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          Feedback Details
        </h1>

        <p className="text-slate-500 mt-2">
          View complete customer feedback.
        </p>
      </div>

      {/* Feedback Card */}
      <div className="bg-white rounded-xl shadow p-8 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">
            Title
          </h2>

          <p className="mt-2">
            {feedback.title ?? "Untitled"}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            Content
          </h2>

          <p className="mt-2 whitespace-pre-wrap">
            {feedback.content}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold">
              Sentiment
            </h3>

            <p>{feedback.sentiment ?? "-"}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Status
            </h3>

            <p>{feedback.status}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Channel
            </h3>

            <p>{feedback.channel}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Workspace
            </h3>

            <p>{feedback.workspace.name}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Created
            </h3>

            <p>
              {feedback.createdAt.toLocaleString()}
            </p>
          </div>
        </div>

        {/* AI Buttons */}
        <div className="flex gap-4">
          <AnalyzeThemeButton
            feedbackId={feedback.id}
          />

          <AnalyzeFeedbackButton
            feedbackId={feedback.id}
          />
        </div>

        {/* Themes */}
        <div>
          <h3 className="font-semibold mb-3">
            Themes
          </h3>

          <div className="flex flex-wrap gap-2">
            {feedback.themes.length === 0 ? (
              <span className="text-slate-500">
                No themes assigned
              </span>
            ) : (
              feedback.themes.map((item) => (
                <span
                  key={item.theme.id}
                  className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full"
                >
                  {item.theme.name}
                </span>
              ))
            )}
          </div>
        </div>

        {/* AI Feedback Analysis */}
        <div className="bg-slate-50 rounded-xl p-6 space-y-5 border">
          <h2 className="text-2xl font-bold text-slate-800">
            🤖 AI Feedback Analysis
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold">
                Sentiment
              </p>

              <p className="mt-1">
                {feedback.sentiment ?? "-"}
              </p>
            </div>

            <div>
              <p className="font-semibold">
                Priority
              </p>

              <p className="mt-1">
                {feedback.priority ?? "-"}
              </p>
            </div>

            <div>
              <p className="font-semibold">
                Urgency
              </p>

              <p className="mt-1">
                {feedback.urgency ?? "-"}
              </p>
            </div>
          </div>

          <div>
            <p className="font-semibold">
              AI Summary
            </p>

            <p className="mt-2 text-slate-700 whitespace-pre-wrap">
              {feedback.summary ??
                "No AI summary generated yet."}
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Suggested Response
            </p>

            <p className="mt-2 text-slate-700 whitespace-pre-wrap">
              {feedback.suggestedResponse ??
                "No suggested response generated yet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}