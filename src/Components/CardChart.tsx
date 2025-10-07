import { Image } from "@heroui/react";
import BarChart from "./Chart";

type CardChartProps = {
  title: string;
  dataDefects: {
    defecto: string;
    cantidad: number;
  }[];
};

export default function CardChart({ title, dataDefects }: CardChartProps) {
  const labels = dataDefects.map((item) => item.defecto);

  const data = dataDefects.map((item) => item.cantidad);

  const defectsQuantity = data.reduce((acc, val) => acc + val, 0);

  return (
    <div className="rounded-2xl bg-[#F8F9FA] p-4">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-6">
          <div className="bg-[#EAF0FE] rounded-xl w-14 h-14 flex justify-center items-center text-[#0068FF]">
            {title === "DRILL" ? (
              <Image alt="Drill Icon" src="/drill-svgrepo-com.svg" width={40} />
            ) : title === "INSP. PINTURA" ? (
              <Image
                alt="Drill Icon"
                src="/paint-brush-broad-thin-svgrepo-com.svg"
                width={40}
              />
            ) : title === "ENSAMBLE FINAL" ? (
              <Image
                alt="Drill Icon"
                src="/wrench-svgrepo-com.svg"
                className="text-[#0068FF]"
                width={40}
              />
            ) : (
              <i className="bi bi-clipboard2-check text-4xl"></i>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold">{title}</span>
            <span className="text-[#868E96] flex gap-2 items-center">
              <div className="w-2 h-2 bg-[#28A745] rounded-full"></div>
              Estación activa
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold text-3xl">
            {defectsQuantity.toString()}
          </span>
          <span className="text-[#868E96]">Defectos</span>
        </div>
      </div>
      {/* Chart */}
      <BarChart labels={labels} data={data} title="Defectos registrados" />
      <div className="flex justify-center items-center"></div>
      {/* Additional Info */}
    </div>
  );
}
