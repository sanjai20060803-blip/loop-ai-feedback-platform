interface Props {
  role: "user" | "assistant";
  message: string;
}

export default function ChatMessage({
  role,
  message,
}: Props) {
  return (
    <div
      className={`rounded-xl p-4 ${
        role === "user"
          ? "bg-cyan-600 text-white"
          : "bg-slate-100"
      }`}
    >
      <strong>
        {role === "user" ? "You" : "LOOP AI"}
      </strong>

      <p className="mt-2 whitespace-pre-wrap">
        {message}
      </p>
    </div>
  );
}