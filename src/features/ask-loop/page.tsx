import AskForm from "./components/AskForm";

export default function AskLoopPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          🤖 Ask LOOP AI
        </h1>

        <p className="text-slate-500 mt-2">
          Ask questions about customer feedback using natural language.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow border p-8">

        <h2 className="text-2xl font-bold mb-6">
          AI Assistant
        </h2>

        <AskForm />

      </div>

      <div className="bg-white rounded-xl shadow border p-8">

        <h2 className="text-xl font-bold mb-4">
          Example Questions
        </h2>

        <div className="grid md:grid-cols-2 gap-3">

          <div className="border rounded-lg p-4">
            How many negative feedbacks?
          </div>

          <div className="border rounded-lg p-4">
            Show positive feedback
          </div>

          <div className="border rounded-lg p-4">
            Any signup issues?
          </div>

          <div className="border rounded-lg p-4">
            Overall customer sentiment
          </div>

          <div className="border rounded-lg p-4">
            Feedback status
          </div>

          <div className="border rounded-lg p-4">
            Show latest feedback
          </div>

        </div>

      </div>

    </div>
  );
}