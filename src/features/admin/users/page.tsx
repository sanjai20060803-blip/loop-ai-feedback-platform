import { db } from "@/lib/db";

import RoleSelector from "./components/RoleSelector";
import DeleteUserButton from "./components/DeleteUserButton";

export default async function UsersPage() {
  const users = await db.user.findMany({
    include: {
      workspace: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          User Management
        </h1>

        <p className="text-slate-500 mt-2">
          Manage users and their roles.
        </p>
      </div>

      {/* Users Table */}

      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

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

              <th className="text-left py-3">
                Workspace
              </th>

              <th className="text-left py-3">
                Created
              </th>

              <th className="text-left py-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  No users found.
                </td>

              </tr>

            ) : (

              users.map((user) => (

                <tr
                  key={user.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-4">
                    {user.name}
                  </td>

                  <td className="py-4">
                    {user.email}
                  </td>

                  <td className="py-4">

                    <RoleSelector
                      userId={user.id}
                      currentRole={user.role}
                    />

                  </td>

                  <td className="py-4">
                    {user.workspace.name}
                  </td>

                  <td className="py-4">
                    {user.createdAt.toLocaleDateString()}
                  </td>

                  <td className="py-4">

                    <DeleteUserButton
                      userId={user.id}
                    />

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}