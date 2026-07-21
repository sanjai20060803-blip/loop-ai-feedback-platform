"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

interface Props {
  labels: string[];
  values: number[];
}

export default function ThemeChart({
  labels,
  values,
}: Props) {
  const data = {
    labels,
    datasets: [
      {
        label: "Feedback Count",
        data: values,
        backgroundColor: "rgba(14,165,233,0.8)",
        borderColor: "rgb(14,165,233)",
        borderWidth: 2,
        borderRadius: 8,
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
        text: "Top Feedback Themes",
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
      <Bar data={data} options={options} />
    </div>
  );
}