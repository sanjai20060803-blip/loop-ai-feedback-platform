"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function TrendChart() {
  return (
    <Line
      data={{
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Feedback",
            data: [2, 5, 8, 6, 10, 12],
            borderColor: "#0ea5e9",
            backgroundColor: "#0ea5e9",
          },
        ],
      }}
    />
  );
}