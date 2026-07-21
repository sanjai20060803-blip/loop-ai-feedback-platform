import { getFeedbacks } from "./actions/feedback.actions";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackTable from "./components/FeedbackTable";

export default async function FeedbackPage() {
  const feedbacks = await getFeedbacks();

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Customer Feedback
        </h1>

        <p className="text-slate-500 mt-2">
          Collect, organize and analyze customer feedback.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Feedback</h3>
          <p className="text-3xl font-bold mt-2">
            {feedbacks.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">New</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {
              feedbacks.filter(f=>f.status==="NEW").length
            }
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Positive</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {
              feedbacks.filter(f=>f.sentiment==="POSITIVE").length
            }
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Negative</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {
              feedbacks.filter(f=>f.sentiment==="NEGATIVE").length
            }
          </p>
        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-1">
          <FeedbackForm />
        </div>

        <div className="lg:col-span-2">
          <FeedbackTable feedbacks={feedbacks}/>
        </div>

      </div>

    </div>
  );
}