import {
  Button,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useState } from "react";
import TableDefects from "../Components/TableDefects";
import RealTimeProcess from "../Components/RealTimeProcess";
import ProcessTopDefect from "../Components/ProcessTopDefect";

type Pin = {
  id: string;
  x: number; // porcentaje
  y: number; // porcentaje
  label: string;
  description: string;
};

const pins: Pin[] = [
  {
    id: "1",
    x: 13,
    y: 17,
    label: "F.Assembly",
    description: "Rebaba moldeada: 12, Pintura: 5, Ensamble: 8",
  },
  { id: "2", x: 52, y: 11, label: "Drill", description: "Defects Data D" },
  { id: "3", x: 27, y: 10, label: "Paint", description: "Defects Data P" },
  {
    id: "4",
    x: 73,
    y: 30,
    label: "D-Flash",
    description: "Defects Data FA",
  },
];

export default function DefectsMap() {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

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
              <h4 className="font-bold">{selectedPin.label}</h4>
              <p>{selectedPin.description}</p>
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
