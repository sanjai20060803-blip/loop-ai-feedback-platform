import { createFeedback } from "../actions/create-feedback";

export default function FeedbackForm() {
  return (
    <form
      action={createFeedback}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Add Customer Feedback
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>

        <input
          name="title"
          required
          placeholder="Login Issue"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Customer Feedback
        </label>

        <textarea
          name="content"
          required
          rows={6}
          placeholder="Describe the customer's feedback..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Channel
          </label>

          <select
            name="channel"
            defaultValue="MANUAL"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          >
            <option value="MANUAL">Manual</option>
            <option value="EMAIL">Email</option>
            <option value="CSV">CSV Import</option>
            <option value="APP_STORE">App Store</option>
            <option value="NPS_SURVEY">NPS Survey</option>
            <option value="SUPPORT_TICKET">Support Ticket</option>
            <option value="COMMUNITY">Community</option>
            <option value="SALES_CALL">Sales Call</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Name
          </label>

          <input
            name="customerLabel"
            placeholder="John Doe"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg transition duration-200"
      >
        Add Feedback
      </button>
    </form>
  );
}