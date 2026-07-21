interface Props {
  feedbacks: any[];
}

export default function FeedbackTable({ feedbacks }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

      <div className="px-6 py-5 border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          Feedback List
        </h2>
      </div>

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left px-6 py-4">Title</th>

            <th className="text-left px-6 py-4">Channel</th>

            <th className="text-left px-6 py-4">Status</th>

            <th className="text-left px-6 py-4">Sentiment</th>

          </tr>

        </thead>

        <tbody>

          {feedbacks.map((feedback) => (

            <tr
              key={feedback.id}
              className="border-t hover:bg-slate-50 transition"
            >

              <td className="px-6 py-4 font-medium">
                {feedback.title}
              </td>

              <td className="px-6 py-4">
                {feedback.channel}
              </td>

              <td className="px-6 py-4">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                  {feedback.status}

                </span>

              </td>

              <td className="px-6 py-4">

                {feedback.sentiment ?? "-"}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}