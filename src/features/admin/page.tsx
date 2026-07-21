import { db } from "@/lib/db";


export default async function AdminPage() {
  const totalUsers = await db.user.count();

  const totalFeedback = await db.feedback.count();

  const totalThemes = await db.theme.count();

  const totalReports = await db.report.count();

  const recentUsers = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Manage Project LOOP.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Users</p>
          <h2 className="text-4xl font-bold mt-2">
            {totalUsers}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Feedback</p>
          <h2 className="text-4xl font-bold mt-2">
            {totalFeedback}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Themes</p>
          <h2 className="text-4xl font-bold mt-2">
            {totalThemes}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Reports</p>
          <h2 className="text-4xl font-bold mt-2">
            {totalReports}
          </h2>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Recent Users
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Name
              </th>

              <th className="text-left py-3">
                Email
              </th>

              <th className="text-left py-3">
                Role
              </th>

            </tr>

          </thead>

          <tbody>

            {recentUsers.map((user) => (

              <tr
                key={user.id}
                className="border-b"
              >

                <td className="py-3">
                  {user.name}
                </td>

                <td className="py-3">
                  {user.email}
                </td>

                <td className="py-3">
                  {user.role}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}