"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchFeedback() {
  const router = useRouter();
  const params = useSearchParams();

  const [value, setValue] = useState(
    params.get("search") ?? ""
  );

  function submit() {
    const query = new URLSearchParams(
      params.toString()
    );

    if (value)
      query.set("search", value);
    else
      query.delete("search");

    router.push(
      `/dashboard?${query.toString()}`
    );
  }

  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) =>
          setValue(e.target.value)
        }
        placeholder="Search feedback..."
        className="border rounded-lg px-4 py-2 w-72"
      />

      <button
        onClick={submit}
        className="bg-cyan-600 text-white px-4 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}