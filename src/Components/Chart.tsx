// components/BarChart.tsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ScriptableContext,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  labels: string[];
  data: number[];
  title?: string;
}

const BarChart: React.FC<BarChartProps> = ({ labels, data, title }) => {
  const isMobile = window.innerWidth < 640;

  const chartData = {
    labels,
    datasets: [
      {
        label: title || "Datos",
        data,
        backgroundColor: "rgba(59, 130, 246, 0.6)", // Tailwind blue-500
      },
    ],
  };

  let delayed: boolean;

  const options = {
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context: ScriptableContext<"bar">) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: { display: false },
      title: {
        display: !!title,
        text: title,
        font: {
          family: "Raleway",
          size: 18,
          weight: 700,
        },
      },
      tooltip: {
        enabled: true, // Muestra tooltips al pasar el cursor
        bodyFont: {
          family: "Raleway",
          size: 14,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
        ticks: {
          font: {
            family: "Raleway",
            size: isMobile ? 10 : 14,
            weight: 700,
          },
        },
      },
      x: {
        stacked: true,
        ticks: {
          font: {
            family: "Raleway",
            size: isMobile ? 10 : 14,
            weight: 700,
          },
        },
      },
    },
  };

  return (
    <div className="relative h-[300px] sm:h-[400px] bg-white p-4 rounded-lg shadow-md w-full max-w-xl mx-auto mt-2">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
