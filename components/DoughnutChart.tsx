"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  cutout: "70%",
};

const DoughnutChart = () => {
  const data = {
    datasets: [
      {
        label: "transaction",
        data: [12, 19, 7, 5, 3],
        backgroundColor: [
          "#F5FAFF",
          "#D1E9FF",
          "#2E90FA",
          "#1570EF",
          "#175CD3",
        ],
      },
    ],
  };
  return (
    <div className="size-full">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
