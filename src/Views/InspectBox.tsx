import { Button, Checkbox, Select, SelectItem } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { fetchDefectsByModel } from "../Services/DataService";

type formDataType = {
  BoxSelected: string;
  viewBox: string;
  startDate: string;
  endDate: string;
};

const availableView = [
  {
    key: "Top_Left_View",
    value: "Top Left View",
  },
  {
    key: "Top_Right_View",
    value: "Top Right View",
  },
  {
    key: "Back_View",
    value: "Back View",
  },
  {
    key: "Left_View",
    value: "Left View",
  },
  {
    key: "Right_View",
    value: "Right View",
  },
  {
    key: "Bottom_View",
    value: "Bottom View",
  },
  {
    key: "Corner_View",
    value: "Corner View",
  },
];

export default function InspectBox() {
  const [BoxSelected, setBoxSelected] = useState("");
  const [viewBox, setViewBox] = useState("");
  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      BoxSelected: "SD", // ← Esto activa el checkbox de CA por defecto
      viewBox: "",
      startDate: "",
      endDate: "",
    },
  });

  //UseQuery para obtener la data SD/LD con View Box
  const { data: getDefectsByModel } = useQuery({
    queryKey: ["defectsByModel", BoxSelected, viewBox],
    queryFn: () => fetchDefectsByModel(BoxSelected, viewBox),
  });

  const checkData = async (data: formDataType) => {
    if (data.BoxSelected === "SD") {
      console.log("Se seleccionó Short Deck");
      console.log(data.BoxSelected);
      console.log(data.viewBox);
      setBoxSelected(data.BoxSelected);
      setViewBox(data.viewBox);
    } else {
      console.log("Se seleccionó Long Deck");
    }
  };

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="flex flex-col w-full bg-[#F8F9FA] p-4 rounded-2xl">
        <label
          htmlFor="filter"
          className="text-sm font-bold flex items-center gap-2"
        >
          <div className="bg-[#EAF0FE] rounded-xl w-12 h-12 flex justify-center items-center">
            <i className="bi bi-funnel text-3xl text-[#0068FF]"></i>
          </div>
          <p className="text-xl">Search Filters</p>
        </label>
        <form noValidate onSubmit={handleSubmit(checkData)}>
          <div className="flex flex-col flex-wrap gap-4 w-full mt-4">
            <p className="italic text-[#868E96] font-bold">Select Box Model:</p>
            <Controller
              name="BoxSelected"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="flex gap-4">
                  <Checkbox
                    color="success"
                    defaultSelected
                    isSelected={field.value === "SD"}
                    onChange={() => field.onChange("SD")}
                  >
                    920B - Short Deck
                  </Checkbox>
                  <Checkbox
                    color="warning"
                    isSelected={field.value === "LD"}
                    onChange={() => field.onChange("LD")}
                  >
                    920B - Long Deck
                  </Checkbox>
                </div>
              )}
            />
          </div>
          <div className="border-b-3 border-[#E0E0E0] border-dashed mt-3" />
          <div className="flex flex-col flex-wrap gap-4 w-full mt-4">
            <p className="italic text-[#868E96] font-bold">Select Box View:</p>
            <Controller
              name="viewBox"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  label="Select a view box to inspect"
                  size="sm"
                  className="rounded-3xl"
                  selectedKeys={field.value ? [String(field.value)] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0];
                    field.onChange(selected);
                  }}
                >
                  {(availableView ?? []).map((data) => (
                    <SelectItem key={data.key}>{data.value}</SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <div className="border-b-3 border-[#E0E0E0] border-dashed mt-3" />

          <div className="flex flex-col flex-wrap gap-4 w-full mt-4">
            <div className="flex flex-col flex-wrap gap-4 w-full mt-4">
              <p className="italic text-[#868E96] font-bold">Date range:</p>
              <div className="flex items-center gap-4">
                <label htmlFor="startDate">Start:</label>
                <input
                  id="startDate"
                  className="w-full h-10 rounded-full p-4 border border-[#E0E0E0] bg-white"
                  placeholder="MM/DD/YYYY"
                  type="text"
                  {...register("startDate")}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-wrap gap-4 w-full mt-4">
            <div className="flex flex-col flex-wrap gap-4 w-full mt-4">
              <div className="flex items-center gap-4">
                <label htmlFor="startDate">End:</label>
                <input
                  id="startDate"
                  className="w-full h-10 rounded-full p-4 border border-[#E0E0E0] bg-white"
                  placeholder="MM/DD/YYYY"
                  type="text"
                  {...register("endDate")}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-4">
            <Button
              color="primary"
              type="submit"
              className="rounded-full font-bold w-32"
            >
              <span className="flex gap-4 justify-center items-center">
                <i className="bi bi-search"></i> Search
              </span>
            </Button>
          </div>
        </form>
      </div>
      <div className="flex flex-col w-full bg-[#F8F9FA] p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="bg-[#EAF0FE] rounded-xl w-12 h-12 flex justify-center items-center">
            <i className="bi bi-search text-3xl text-[#0068FF]"></i>
          </div>
          <p className="text-xl font-bold">View Box</p>
        </div>
      </div>
      <div className="flex flex-col w-full bg-[#F8F9FA] p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="bg-[#EAF0FE] rounded-xl w-12 h-12 flex justify-center items-center">
            <i className="bi bi-eye text-3xl text-[#0068FF]"></i>
          </div>
          <p className="text-xl font-bold">Defects by View</p>
          {JSON.stringify(getDefectsByModel)}
        </div>
      </div>
      <div className="flex flex-col w-full bg-[#F8F9FA] p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="bg-[#EAF0FE] rounded-xl w-12 h-12 flex justify-center items-center">
            <i className="bi bi-clipboard2-x text-3xl text-[#0068FF]"></i>
          </div>
          <p className="text-xl font-bold">Defect Top List</p>
        </div>
      </div>
    </div>
  );
}
