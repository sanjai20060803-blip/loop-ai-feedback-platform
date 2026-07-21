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

interface Props {
  positive: number;
  neutral: number;
  negative: number;
}

export default function SentimentPieChart({
  positive,
  neutral,
  negative,
}: Props) {
  const data = {
    labels: [
      "Positive",
      "Neutral",
      "Negative",
    ],

    datasets: [
      {
        data: [
          positive,
          neutral,
          negative,
        ],

        backgroundColor: [
          "#22c55e",
          "#eab308",
          "#ef4444",
        ],

        borderColor: "#ffffff",

        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom" as const,
      },

      title: {
        display: true,
        text: "Feedback Distribution",
        font: {
          size: 18,
          weight: "bold" as const,
        },
      },
    },
  };

  return (
    <div className="h-[420px]">
      <Pie
        data={data}
        options={options}
      />
    </div>
  );
}