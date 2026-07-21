"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function SentimentChart({
  positive,
  neutral,
  negative,
}: {
  positive: number;
  neutral: number;
  negative: number;
}) {
  return (
    <Pie
      data={{
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [
          {
            data: [positive, neutral, negative],
            backgroundColor: [
              "#22c55e",
              "#facc15",
              "#ef4444",
            ],
          },
        ],
      }}
    />
  );
}