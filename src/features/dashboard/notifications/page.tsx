import { db } from "@/lib/db";
import NotificationItem from "../components/NotificationItem";

export default async function NotificationsPage() {

  const notifications =
    await db.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold">
        Notifications
      </h1>

      {notifications.length === 0 ? (

        <div className="text-slate-500">
          No notifications.
        </div>

      ) : (

        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
          />
        ))

      )}

    </div>
  );
}