"use client";

import { useTransition } from "react";
import { deleteUser } from "../actions/user.actions";

export default function DeleteUserButton({
  userId,
}: {
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Delete this user?")) return;

    startTransition(async () => {
      try {
        await deleteUser(userId);
      } catch (error: any) {
        alert(error.message);
      }
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}