import { useQuery } from "@tanstack/react-query";
import { fetchStationData } from "../Services/DataService";
import CardChart from "../Components/CardChart";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: StationData } = useQuery({
    queryKey: ["SearchStationData"],
    queryFn: () => fetchStationData(),
  });

  const handleNavigation = () => {
    navigate("/csp/inspectBox");
  };

  return (
    <>
      <div className="flex gap-4 items-center w-full p-2">
        <div className="bg-[#F8F9FA] rounded-xl w-14 h-14 flex justify-center items-center">
          <i className="bi bi-activity text-[#0068FF] text-3xl p-2"></i>
        </div>
        <div className="flex flex-wrap justify-between w-full gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-4xl font-bold">Estadístico de defectos</p>
          </div>
          <div>
            <Button
              className="rounded-full font-bold"
              color="primary"
              onPress={handleNavigation}
            >
              <i className="bi bi-funnel"></i> Búsqueda avanzada
            </Button>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 justify-between items-center w-full p-2 gap-4">
        {StationData ? (
          Object.entries(StationData).map(([stationName, defects]) => (
            <CardChart
              key={stationName}
              title={stationName}
              dataDefects={defects}
            />
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
            <h1 className="font-bold text-4xl text-[#0068FF]">
              No se han registrado datos el día de hoy ...
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
