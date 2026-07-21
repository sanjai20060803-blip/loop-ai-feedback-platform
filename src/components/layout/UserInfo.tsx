import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function UserInfo() {
  const session = await getServerSession(authOptions);

  return (
    <div className="text-right">
      <p className="font-semibold">
        {session?.user?.name}
      </p>

      <p className="text-sm text-gray-500">
        {(session?.user as any)?.role}
      </p>
    </div>
  );
}