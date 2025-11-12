import { Button, Image } from "@heroui/react";
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
  });

  console.log(stationDataDefects);

  useEffect(() => {
    if (selectedPin?.label === "Drill") {
      setActualValue(stationDataDefects?.["DRILL"] ?? null);
    } else if (selectedPin?.label === "D-Flash") {
      setActualValue(stationDataDefects?.["D-FLASH"] ?? null);
    } else if (selectedPin?.label === "Paint") {
      setActualValue(stationDataDefects?.["INSP. PINTURA"] ?? null);
    } else if (selectedPin?.label === "F.Assembly") {
      setActualValue(stationDataDefects?.["ENSAMBLE FINAL"] ?? null);
    } else {
      setActualValue(null);
    }
  }, [selectedPin, stationDataDefects]);

  return (
    <div className="grid grid-cols-3 gap-6 p-2">
      <div className="relative w-full max-w-4xl mx-auto grid col-span-2">
        <div className="flex justify-center gap-4 mb-4">
          <div>Estaciones actuales:</div>
          <p>DFlash</p>
          <p>Drill</p>
          <p>Paint</p>
          <p>Final Assembly</p>
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
              className="absolute bg-white border p-4 rounded shadow-lg z-30"
              style={{
                left: `${selectedPin.x}%`,
                top: `${selectedPin.y}%`,
                transform: "translate(-50%, -120%)",
              }}
            >
              <div className="flex gap-2 text-center justify-center items-center bg-[#CFA011]">
                <h4 className="font-bold">{selectedPin.label}</h4>{" "}
              </div>
              <div className="flex flex-col">
                <p>
                  <b>Turno 1:</b> {actualValue?.["1"] ?? "Sin registros"}
                </p>
                <p>
                  <b>Turno 2:</b> {actualValue?.["2"] ?? "Sin registros"}
                </p>
                <p>
                  <b>Turno 3:</b> {actualValue?.["3"] ?? "Sin registros"}
                </p>
              </div>
              <Button
                onPress={() => setSelectedPin(null)}
                className="mt-2 hover:cursor-pointer rounded-3xl h-8 text-md"
                color="danger"
              >
                Cerrar
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <TableDefects />
        <RealTimeProcess />
        <ProcessTopDefect />
      </div>
    </div>
  );
}
