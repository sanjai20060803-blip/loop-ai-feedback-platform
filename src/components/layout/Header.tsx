import UserInfo from "./UserInfo";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Project LOOP
        </h1>

        <p className="text-sm text-slate-500">
          AI Customer Feedback Intelligence Platform
        </p>
      </div>

      <UserInfo />
    </header>
  );
}