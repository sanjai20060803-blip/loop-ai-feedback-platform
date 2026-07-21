"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUserRole(
  userId: string,
  role: "ADMIN" | "ANALYST" | "VIEWER"
) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  // Prevent removing the last ADMIN
  if (user.role === "ADMIN" && role !== "ADMIN") {
    const adminCount = await db.user.count({
      where: {
        role: "ADMIN",
      },
    });

    if (adminCount <= 1) {
      throw new Error(
        "Cannot change the role of the last ADMIN."
      );
    }
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      role,
    },
  });

  revalidatePath("/dashboard/admin/users");
}

export async function deleteUser(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  // Prevent deleting the last ADMIN
  if (user.role === "ADMIN") {
    const adminCount = await db.user.count({
      where: {
        role: "ADMIN",
      },
    });

    if (adminCount <= 1) {
      throw new Error(
        "Cannot delete the last ADMIN."
      );
    }
  }

  await db.user.delete({
    where: {
      id: userId,
    },
  });

  revalidatePath("/dashboard/admin/users");
}