import { useQuery } from "@tanstack/react-query";
import { fetchLastRegisterDefect } from "../Services/DataService";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Chip, Image } from "@heroui/react";
import { useEffect, useState } from "react";

export default function RealTimeProcess() {
  const [boxType, setBoxType] = useState("");

  const { data: lastDefectRegister } = useQuery({
    queryKey: ["lastDefectRegister"],
    queryFn: () => fetchLastRegisterDefect(),
    refetchInterval: 10000,
  });

  useEffect(() => {
    if (lastDefectRegister?.producto.includes("SD")) {
      setBoxType("SD");
    } else {
      setBoxType("LD");
    }
  }, [lastDefectRegister]);

  console.log("Box Type: ", boxType);

  return (
    <div className="w-full text-center">
      <span className="flex gap-2 justify-center items-center">
        <h1 className="text-[#0068FF] text-2xl font-bold">Real Time Process</h1>{" "}
        <p className="text-[#868E96]">(Experimental)</p>{" "}
        <i className="bi bi-exclamation-triangle text-[#868E96]"></i>
      </span>
      <div className="bg-[#F8F9FA] rounded-2xl p-2 flex flex-col gap-2">
        <div className="flex justify-end">
          <Chip
            color={
              lastDefectRegister?.estatus === "ACEPTADO"
                ? "success"
                : lastDefectRegister?.estatus === "RECHAZADO"
                ? "danger"
                : lastDefectRegister?.estatus === "RETRABAJO"
                ? "warning"
                : "primary"
            }
          >
            <b>{lastDefectRegister?.estatus}</b>
          </Chip>
        </div>
        <div className="flex justify-center items-center p-2">
          <TransformWrapper>
            <TransformComponent>
              <Image
                alt="View Box Image"
                src={
                  boxType === "SD"
                    ? "/Top_Right_View_SD.webp"
                    : "/Top_Right_View_LD.webp"
                }
                width={200}
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
        <div className="flex justify-center items-center">
          <h2 className="font-bold text-2xl text-[#707070]">
            {lastDefectRegister?.producto}
          </h2>
        </div>
        <div className="w-full grid grid-cols-3 gap-2 ">
          <div className="flex flex-col bg-[#ecedee] p-2 rounded-lg">
            <i className="bi bi-fingerprint text-2xl text-[#0068FF]"></i>{" "}
            <b>Serie</b> {lastDefectRegister?.serie}
          </div>
          <div className="flex flex-col bg-[#ecedee] p-2 rounded-lg">
            <i className="bi bi-card-text text-2xl"></i> <b>Folio</b>{" "}
            {lastDefectRegister?.folio}
          </div>
          <div className="flex flex-col bg-[#ecedee] p-2 rounded-lg">
            <i className="bi  bi-file-earmark-text text-2xl text-[#17A2B8]"></i>{" "}
            <b>Defecto</b> {lastDefectRegister?.defecto}
          </div>
          <div className="flex flex-col bg-[#ecedee] p-2 rounded-lg">
            <i className="bi bi-gear text-2xl text-[#DC3545]"></i> <b>Prensa</b>{" "}
            {lastDefectRegister?.prensa}
          </div>
          <div className="flex flex-col bg-[#ecedee] p-2 rounded-lg">
            <i className="bi bi-aspect-ratio text-2xl text-[#CFA011]"></i>{" "}
            <b>Cavidad</b> {lastDefectRegister?.cavidad}
          </div>
          <div className="flex flex-col bg-[#ecedee] p-2 rounded-lg">
            <i className="bi bi-suitcase-lg text-2xl text-[#6A4928]"></i>{" "}
            <b>Proceso</b> {lastDefectRegister?.proceso}
          </div>
          <div className="flex flex-col bg-[#ecedee] p-2 rounded-lg">
            <i className="bi  bi-search text-2xl text-[#B8860B]"></i>{" "}
            <b>Zona</b> {lastDefectRegister?.zona}
          </div>
          <div className="flex flex-col bg-[#ecedee] p-2 rounded-lg">
            <i className="bi  bi-people text-2xl text-[#28A745]"></i>{" "}
            <b>Usuario</b> {lastDefectRegister?.usuario_alta}
          </div>
        </div>
      </div>
    </div>
  );
}
