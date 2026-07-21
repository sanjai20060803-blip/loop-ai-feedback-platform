"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(
    params.get("search") || ""
  );

  function handleSearch() {
    const query = new URLSearchParams(params.toString());

    if (search.trim()) {
      query.set("search", search);
    } else {
      query.delete("search");
    }

    router.push(
      `/dashboard/admin/feedback?${query.toString()}`
    );
  }

  return (
    <div className="flex gap-4 mb-6">

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search feedback..."
        className="border rounded-lg px-4 py-2 flex-1"
      />

      <button
        onClick={handleSearch}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 rounded-lg"
      >
        Search
      </button>

    </div>
  );
}