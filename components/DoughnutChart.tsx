"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  cutout: "60%",
  plugins: {
    legend: {
      display: false,
    },
  },
};

const DoughnutChart = ({ accounts }: { accounts: Account[] }) => {
  const balances = accounts.map((account) => account.currentBalance);
  const accountNames = accounts.map((account) => account.institutionName);

  console.log({ accounts });
  const data = {
    labels: accountNames,
    datasets: [
      {
        label: "Banks",
        data: balances,
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
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
