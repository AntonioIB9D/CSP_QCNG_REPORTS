import { useQuery } from "@tanstack/react-query";
import { fetchStationData } from "../Services/DataService";
import CardChart from "../Components/CardChart";

export default function Dashboard() {
  const { data: StationData } = useQuery({
    queryKey: ["SearchStationData"],
    queryFn: () => fetchStationData(),
  });

  return (
    <>
      <div className="flex gap-4 items-center w-full p-2">
        <div className="bg-[#F8F9FA] rounded-xl w-14 h-14 flex justify-center items-center">
          <i className="bi bi-activity text-[#0068FF] text-3xl p-2"></i>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">Monitoreo de producción</h1>
            <p className="italic text-[#868E96]">Estadistico de defectos</p>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 justify-between items-center w-full p-2 gap-4">
        {StationData &&
          Object.entries(StationData).map(([stationName, defects]) => (
            <CardChart
              key={stationName}
              title={stationName}
              dataDefects={defects}
            />
          ))}
      </div>
    </>
  );
}
