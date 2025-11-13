import { useQuery } from "@tanstack/react-query";
import { fetchLastRegisterDefect } from "../Services/DataService";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Image } from "@heroui/react";
import { useEffect, useEffectEvent, useState } from "react";

export default function RealTimeProcess() {
  const [boxType, setBoxType] = useState<string>("");

  const { data: lastDefectRegister } = useQuery({
    queryKey: ["lastDefectRegister"],
    queryFn: () => fetchLastRegisterDefect(),
  });

  console.log(lastDefectRegister);

  useEffect(() => {
    if (lastDefectRegister?.producto.includes("SD")) {
      setBoxType("SD");
    } else {
      setBoxType("LD");
    }
  }, []);

  console.log(boxType);

  return (
    <div className="w-full text-center">
      <span className="flex gap-2 justify-center items-center">
        <h1 className="text-[#0068FF] text-2xl font-bold">Real Time process</h1>{" "}
        <p className="text-[#868E96]">(Experimental)</p>{" "}
        <i className="bi bi-exclamation-triangle text-[#868E96]"></i>
      </span>
      <div className="bg-[#F8F9FA] rounded-2xl p-2 flex flex-col gap-2">
        <div className="flex justify-center items-center p-4">
          <TransformWrapper>
            <TransformComponent>
              <Image
                alt="View Box Image"
                src="/Top_Right_View_LD.webp"
                width={200}
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
        <p>
          <b>Code:</b> 178294
        </p>
        <p>
          <b>Failure:</b> Hi-Low Drill
        </p>
        <p>
          {" "}
          <b>Time stopped:</b> 25s
        </p>
        <p>
          {" "}
          <b>Status:</b> Running
        </p>
      </div>
    </div>
  );
}
