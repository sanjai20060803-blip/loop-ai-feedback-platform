"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  positive: number;
  neutral: number;
  negative: number;
}

export default function SentimentChart({
  positive,
  neutral,
  negative,
}: Props) {
  const data = {
    labels: ["Positive", "Neutral", "Negative"],

    datasets: [
      {
        label: "Feedback Count",

        data: [
          positive,
          neutral,
          negative,
        ],

        backgroundColor: [
          "rgba(34,197,94,0.8)",
          "rgba(234,179,8,0.8)",
          "rgba(239,68,68,0.8)",
        ],

        borderColor: [
          "rgb(34,197,94)",
          "rgb(234,179,8)",
          "rgb(239,68,68)",
        ],

        borderWidth: 2,

        borderRadius: 10,

        maxBarThickness: 70,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "Customer Sentiment Distribution",
        font: {
          size: 18,
          weight: "bold" as const,
        },
      },

      tooltip: {
        enabled: true,
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          precision: 0,
          stepSize: 1,
        },

        title: {
          display: true,
          text: "Number of Feedback",
        },
      },

      x: {
        title: {
          display: true,
          text: "Sentiment",
        },
      },
    },
  };

  return (
    <div className="w-full h-[420px] bg-white rounded-xl">
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}