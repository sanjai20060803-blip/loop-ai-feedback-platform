import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const users = [
  {
    name: "Admin",
    email: "admin@loop.com",
    role: "ADMIN",
  },
  {
    name: "Analyst",
    email: "analyst@loop.com",
    role: "ANALYST",
  },
  {
    name: "Viewer",
    email: "viewer@loop.com",
    role: "VIEWER",
  },
];

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Users
        </h1>

        <p className="text-slate-500 mt-2">
          Manage workspace users and their roles.
        </p>
      </div>

      <div className="grid gap-6">
        {users.map((user) => (
          <Card key={user.email}>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
            </CardHeader>

            <CardContent className="flex justify-between items-center">
              <div>
                <p className="font-medium">{user.email}</p>
                <p className="text-sm text-slate-500">{user.role}</p>
              </div>

              <button className="rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700">
                View
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}