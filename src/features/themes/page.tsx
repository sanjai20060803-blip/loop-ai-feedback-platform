import { detectThemes } from "./actions/theme.actions";

export default async function ThemesPage() {
  const themes = await detectThemes();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          AI Theme Detection
        </h1>

        <p className="text-slate-500 mt-2">
          Automatically grouped customer feedback themes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <div
            key={theme.name}
            className="bg-white rounded-xl shadow p-6"
          >
            <h2 className="text-xl font-bold text-cyan-700">
              {theme.name}
            </h2>

            <p className="text-gray-500 mt-2">
              Related Feedback
            </p>

            <p className="text-4xl font-bold mt-4">
              {theme.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}