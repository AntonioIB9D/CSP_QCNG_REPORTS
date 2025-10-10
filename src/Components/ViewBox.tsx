import { Image } from "@heroui/react";
import { ldData, sdData } from "../Data/ImageData";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

type ViewBoxProps = {
  BoxSelected: string;
  viewBox: string;
};

export default function ViewBox({ BoxSelected, viewBox }: ViewBoxProps) {
  const getImagePath = (key: string, model: string) => {
    if (model === "sdModel") {
      const item = sdData.find((data) => data.key === key);
      return item ? item.value : "";
    }

    const item = ldData.find((data) => data.key === key);
    return item ? item.value : "";
  };

  const selectedModelL = BoxSelected === "LD" ? "ldModel" : "sdModel";
  const selectedZoneL = viewBox;

  const imagePath = getImagePath(selectedZoneL, selectedModelL);

  return (
    <div className="flex flex-col justify-between w-full bg-[#F8F9FA] p-4 rounded-2xl">
      <div className="flex items-center gap-2">
        <div className="bg-[#EAF0FE] rounded-xl w-12 h-12 flex justify-center items-center">
          <i className="bi bi-search text-3xl text-[#0068FF]"></i>
        </div>
        <p className="text-xl font-bold">View Box</p>
      </div>
      <div className="flex flex-col gap-4 sm:mb-8 md:mb-18 lg:mb-18 ">
        <div className="overflow-auto scrollbar-hide max-h-[19rem] w-full bg-[#F8F9FA] rounded-3xl">
          {imagePath ? (
            <div className="flex justify-center items-center p-4">
              <TransformWrapper>
                <TransformComponent>
                  <Image alt="View Box Image" src={imagePath} width={400} />
                </TransformComponent>
              </TransformWrapper>
            </div>
          ) : (
            <div className="flex justify-center items-center p-4">
              <p className="text-[#868E96] font-bold italic">
                Search to display box view
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
