"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  labels: string[];
  values: number[];
}

export default function FeedbackTrendChart({
  labels,
  values,
}: Props) {
  const data = {
    labels,
    datasets: [
      {
        label: "Feedback",
        data: values,
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6,182,212,0.2)",
        fill: true,
        tension: 0.35,
        pointRadius: 5,
        pointHoverRadius: 7,
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
        text: "Monthly Feedback Trend",
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="h-[420px]">
      <Line
        data={data}
        options={options}
      />
    </div>
  );
}