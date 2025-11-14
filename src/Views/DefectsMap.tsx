import { Button, Divider, Image } from "@heroui/react";
import { useEffect, useState } from "react";
import TableDefects from "../Components/TableDefects";
import RealTimeProcess from "../Components/RealTimeProcess";
import ProcessTopDefect from "../Components/ProcessTopDefect";
import { useQuery } from "@tanstack/react-query";
import { fetchTotalDefectsByStations } from "../Services/DataService";

type Pin = {
  id: string;
  x: number; // porcentaje
  y: number; // porcentaje
  label: string;
};

const pins: Pin[] = [
  {
    id: "1",
    x: 13,
    y: 17,
    label: "F.Assembly",
  },
  { id: "2", x: 52, y: 11, label: "Drill" },
  { id: "3", x: 27, y: 10, label: "Paint" },
  {
    id: "4",
    x: 73,
    y: 30,
    label: "D-Flash",
  },
];

export default function DefectsMap() {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [actualValue, setActualValue] = useState<Record<string, number> | null>(
    null
  );

  const { data: stationDataDefects } = useQuery({
    queryKey: ["TotalDefectsByStations"],
    queryFn: () => fetchTotalDefectsByStations(),
    refetchInterval: 10000,
  });

  console.log(stationDataDefects);

  useEffect(() => {
    if (!stationDataDefects) return;

    if (selectedPin?.label === "Drill") {
      setActualValue(stationDataDefects?.Defects["DRILL"] ?? null);
    } else if (selectedPin?.label === "D-Flash") {
      setActualValue(stationDataDefects?.Defects["D-FLASH"] ?? null);
    } else if (selectedPin?.label === "Paint") {
      setActualValue(stationDataDefects?.Defects["INSP. PINTURA"] ?? null);
    } else if (selectedPin?.label === "F.Assembly") {
      setActualValue(stationDataDefects?.Defects["ENSAMBLE FINAL"] ?? null);
    } else {
      setActualValue(null);
    }
  }, [selectedPin, stationDataDefects]);

  return (
    <div className="grid grid-cols-3 p-4 gap-8 justify-center items-center">
      <div className="relative w-full max-w-4xl mx-auto grid col-span-2">
        <div className="flex justify-center gap-4 mb-4">
          <h1 className="text-3xl font-bold text-[#0068FF]">
            Process Map Layout 920B <i className="bi bi-geo-fill"></i>
          </h1>
        </div>

        <div className="relative w-full">
          <Image
            alt="Layout Actualizado 920"
            src="/Map.png"
            className="w-full"
          />

          {pins.map((pin) => (
            <Button
              key={pin.id}
              className="absolute rounded-full h-6 p-2 hover:scale-125 transition z-20"
              color="primary"
              style={{
                left: `${pin.x}%`,
                top: `${pin.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onPress={() => setSelectedPin(pin)}
            >
              <p className="font-semibold">{pin.label}</p>
            </Button>
          ))}

          {selectedPin && (
            <div
              className="absolute bg-white border p-3 rounded-2xl shadow-lg z-30"
              style={{
                left: `${selectedPin.x}%`,
                top: `${selectedPin.y}%`,
                transform: "translate(-50%, -120%)",
              }}
            >
              <div className="flex gap-2 text-center justify-center items-center ">
                <h4 className="font-bold">{selectedPin.label}</h4>{" "}
                <i className="bi bi-person text-2xl"></i>
              </div>
              <Divider className="mb-2" />
              <div className="flex flex-col gap-2">
                <span className="flex gap-2">
                  {actualValue?.["1"] ? (
                    <i className="bi bi-check-circle text-[#28A745]"></i>
                  ) : (
                    <i className="bi bi-clock-history"></i>
                  )}
                  <b>
                    1<b className="text-sm">st</b> Shift:{" "}
                  </b>{" "}
                  {actualValue?.["1"] ?? "No data"}
                </span>
                <span className="flex gap-2">
                  {actualValue?.["2"] ? (
                    <i className="bi bi-check-circle text-[#28A745]"></i>
                  ) : (
                    <i className="bi bi-clock-history"></i>
                  )}{" "}
                  <b>
                    2<b className="text-sm">nd</b> Shift:{" "}
                  </b>{" "}
                  {actualValue?.["2"] ?? "No data"}
                </span>
                <span className="flex gap-2">
                  {actualValue?.["3"] ? (
                    <i className="bi bi-check-circle text-[#28A745]"></i>
                  ) : (
                    <i className="bi bi-clock-history"></i>
                  )}{" "}
                  <b>
                    3<b className="text-sm">rd</b> Shift:{" "}
                  </b>{" "}
                  {actualValue?.["3"] ?? "No data"}
                </span>
              </div>
              <div className="w-full flex justify-center">
                <Button
                  onPress={() => setSelectedPin(null)}
                  className="mt-2 hover:cursor-pointer rounded-3xl h-8 text-md"
                  color="danger"
                >
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <TableDefects stationDataDefects={stationDataDefects} />
        <RealTimeProcess />
      </div>
    </div>
  );
}
