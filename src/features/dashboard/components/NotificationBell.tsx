"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Notification {
  id: string;
  title: string;
  message: string;
}

interface Props {
  notifications: Notification[];
}

export default function NotificationBell({
  notifications,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-lg border p-3 bg-white hover:bg-slate-100"
      >
        <Bell size={22} />

        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl border rounded-xl z-50">
          <div className="p-4 border-b font-bold">
            Notifications
          </div>

          <div className="max-h-80 overflow-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-slate-500">
                No notifications
              </p>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-b"
                >
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600">
                    {item.message}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="border-t p-3 text-center">
            <Link
              href="/dashboard/notifications"
              className="text-cyan-600 hover:text-cyan-700 font-medium"
            >
              View All Notifications →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}