"use client";

import { useTransition } from "react";
import { updateUserRole } from "../actions/user.actions";

interface Props {
  userId: string;
  currentRole: "ADMIN" | "ANALYST" | "VIEWER";
}

export default function RoleSelector({
  userId,
  currentRole,
}: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={currentRole}
      disabled={isPending}
      className="border rounded-lg px-3 py-2"
      onChange={(e) => {
        const role = e.target.value as
          | "ADMIN"
          | "ANALYST"
          | "VIEWER";

        startTransition(async () => {
          try {
            await updateUserRole(userId, role);
          } catch (error: any) {
            alert(error.message);
          }
        });
      }}
    >
      <option value="ADMIN">ADMIN</option>
      <option value="ANALYST">ANALYST</option>
      <option value="VIEWER">VIEWER</option>
    </select>
  );
}