"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

interface Props {
  data: {
    channel: string;
    count: number;
  }[];
}

export default function ChannelChart({ data }: Props) {
  return (
    <Bar
      data={{
        labels: data.map((item) => item.channel),
        datasets: [
          {
            label: "Feedback",
            data: data.map((item) => item.count),
            backgroundColor: "#06b6d4",
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}