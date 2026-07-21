"use client";

import { useState, useTransition } from "react";
import { askAI } from "../actions/ask.actions";

export default function AskForm() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState<
    {
      role: "user" | "ai";
      text: string;
    }[]
  >([]);

  const [isPending, startTransition] = useTransition();

  const suggestions = [
    "Give me overall summary",
    "Show negative feedback",
    "Show positive feedback",
    "Show signup issues",
    "Show feedback status",
    "What are the latest feedbacks?",
  ];

  function handleAsk() {
    if (!question.trim()) return;

    const currentQuestion = question;

    setQuestion("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: currentQuestion,
      },
    ]);

    startTransition(async () => {
      const result = await askAI(currentQuestion);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: result,
        },
      ]);
    });
  }

  return (
    <div className="space-y-6">

      {/* Ask Box */}

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAsk();
          }
        }}
        placeholder="Ask Project LOOP AI..."
        rows={5}
        className="w-full rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {/* Suggested Questions */}

      <div className="flex flex-wrap gap-2">

        {suggestions.map((item) => (

          <button
            key={item}
            type="button"
            onClick={() => setQuestion(item)}
            className="rounded-full border px-4 py-2 text-sm hover:bg-cyan-600 hover:text-white transition"
          >
            {item}
          </button>

        ))}

      </div>

      {/* Ask Button */}

      <button
        onClick={handleAsk}
        disabled={isPending}
        className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 disabled:opacity-50"
      >
        {isPending ? "Thinking..." : "🚀 Ask LOOP AI"}
      </button>

      {/* AI Thinking */}

      {isPending && (

        <div className="bg-slate-100 rounded-xl p-4 mr-20 animate-pulse">

          <h3 className="font-bold mb-2">
            🤖 LOOP AI
          </h3>

          <p>Thinking...</p>

        </div>

      )}

      {/* Chat Messages */}

      <div className="space-y-4">

        {messages.map((message, index) => (

          <div
            key={index}
            className={
              message.role === "user"
                ? "bg-cyan-600 text-white rounded-xl p-4 ml-20 shadow"
                : "bg-slate-100 rounded-xl p-4 mr-20 shadow"
            }
          >

            <h3 className="font-bold mb-2">

              {message.role === "user"
                ? "🧑 You"
                : "🤖 LOOP AI"}

            </h3>

            <p className="whitespace-pre-wrap">
              {message.text}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}