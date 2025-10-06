import { Image } from "@heroui/react";

export default function Dashboard() {
  return (
    <>
      <div className="flex gap-4 items-center w-full p-2">
        <div className="bg-[#F8F9FA] rounded-xl w-14 h-14 flex justify-center items-center">
          <i className="bi bi-activity text-[#0068FF] text-3xl p-2"></i>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Monitoreo de producción</h1>
          <p className="italic text-[#868E96]">Estadistico de defectos</p>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-between items-center w-full p-2 gap-4">
        <div className="rounded-2xl bg-[#F8F9FA] p-4">
          {/* Header */}
          <div className="flex justify-between">
            <div className="flex gap-6">
              <div className="bg-[#EAF0FE] rounded-xl w-14 h-14 flex justify-center items-center">
                <Image
                  alt="Drill Icon"
                  src="/drill-perforator-tool-svgrepo-com.svg"
                  width={50}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">Drill Line</span>
                <span className="text-[#868E96] flex gap-2 justify-center items-center">
                  <div className="w-4 h-4 bg-[#28A745] rounded-full"></div>
                  Estación activa
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="font-bold text-3xl">28</span>
              <span className="text-[#868E96]">Defectos</span>
            </div>
          </div>
          {/* Chart */}

          <div className="flex justify-center items-center">Chart</div>
          {/* Additional Info */}
        </div>
      </div>
    </>
  );
}
