import { db } from "@/lib/db";
import StatusSelector from "./components/StatusSelector";
import DeleteFeedbackButton from "./components/DeleteFeedbackButton";
import SearchBar from "./components/SearchBar";

interface Props {
  searchParams?: {
    search?: string;
  };
}

export default async function FeedbackManagementPage({
  searchParams,
}: Props) {
    const search = searchParams?.search ?? "";
  const feedbacks = await db.feedback.findMany({
  where: search
  ? {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    }
  : undefined,
    include: {
      workspace: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">

      <div>
  <h1 className="text-4xl font-bold">
    Feedback Management
  </h1>

  <p className="text-slate-500 mt-2">
    Review and moderate customer feedback.
  </p>
</div>

<SearchBar />

      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Title</th>

              <th className="text-left py-3">Channel</th>

              <th className="text-left py-3">Sentiment</th>

              <th className="text-left py-3">Status</th>

              <th className="text-left py-3">Created</th>

              <th className="text-left py-3">Actions</th>

            </tr>

          </thead>

          <tbody>

            {feedbacks.map((feedback) => (

              <tr
                key={feedback.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="py-4">
  <a
    href={`/dashboard/admin/feedback/${feedback.id}`}
    className="text-cyan-600 hover:underline font-medium"
  >
    {feedback.title ?? "Untitled"}
  </a>
</td>

                <td className="py-4">
                  {feedback.channel}
                </td>

                <td className="py-4">
                  {feedback.sentiment ?? "-"}
                </td>

                <td className="py-4">

                  <StatusSelector
                    feedbackId={feedback.id}
                    currentStatus={feedback.status}
                  />

                </td>

                <td className="py-4">
                  {feedback.createdAt.toLocaleDateString()}
                </td>

                <td className="py-4">

                  <DeleteFeedbackButton
                    feedbackId={feedback.id}
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}