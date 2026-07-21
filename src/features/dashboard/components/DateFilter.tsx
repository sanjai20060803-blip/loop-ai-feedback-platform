"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  {
    label: "Today",
    value: "today",
  },
  {
    label: "7 Days",
    value: "7",
  },
  {
    label: "30 Days",
    value: "30",
  },
  {
    label: "90 Days",
    value: "90",
  },
  {
    label: "All",
    value: "all",
  },
];

export default function DateFilter() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const current =
    searchParams.get("range") ?? "all";

  function change(value: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("range", value);

    router.push(
      `/dashboard?${params.toString()}`
    );
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {options.map((item) => (
        <button
          key={item.value}
          onClick={() => change(item.value)}
          className={`px-4 py-2 rounded-lg border transition ${
            current === item.value
              ? "bg-cyan-600 text-white"
              : "bg-white hover:bg-slate-100"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}