"use client";

import {
  markNotificationRead,
  deleteNotification,
} from "@/features/notifications/actions/notification.actions";

interface Props {
  notification: {
    id: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: Date;
  };
}

export default function NotificationItem({
  notification,
}: Props) {
  return (
    <div
      className={`border rounded-lg p-4 ${
        notification.read
          ? "bg-white"
          : "bg-cyan-50"
      }`}
    >
      <div className="flex justify-between">

        <div>

          <h3 className="font-semibold">
            {notification.title}
          </h3>

          <p className="text-sm text-slate-600 mt-1">
            {notification.message}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            {notification.createdAt.toLocaleString()}
          </p>

        </div>

        <div className="flex gap-2">

          {!notification.read && (
            <button
              onClick={() =>
                markNotificationRead(
                  notification.id
                )
              }
              className="text-cyan-600 text-sm"
            >
              Read
            </button>
          )}

          <button
            onClick={() =>
              deleteNotification(
                notification.id
              )
            }
            className="text-red-600 text-sm"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}