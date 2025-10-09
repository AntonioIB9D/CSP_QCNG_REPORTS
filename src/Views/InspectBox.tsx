import { Button, Checkbox, DateInput, Select, SelectItem } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { fetchDefectsByModel } from "../Services/DataService";
import DefectsView from "../Components/DefectsView";
import DefectTopList from "../Components/DefectTopList";
import ViewBox from "../Components/ViewBox";
import type { formDataType } from "../Types/types";
import { availableView } from "../Data/data";
import { CalendarDate } from "@internationalized/date";

export default function InspectBox() {
  const [BoxSelected, setBoxSelected] = useState("");
  const [viewBox, setViewBox] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const { handleSubmit, control } = useForm({
    defaultValues: {
      BoxSelected: "SD", // ← Esto activa el checkbox de CA por defecto
      viewBox: "",
      startDate: "", // Use string format for defaultValue
      endDate: "",
    },
  });

  //UseQuery para obtener la data SD/LD con View Box
  const { data: getDefectsByModel } = useQuery({
    queryKey: ["defectsByModel", BoxSelected, viewBox, startDate, endDate],
    queryFn: () =>
      fetchDefectsByModel(BoxSelected, viewBox, startDate, endDate),
  });

  const checkData = async (data: formDataType) => {
    if (data.BoxSelected === "SD") {
      setBoxSelected(data.BoxSelected);
      setViewBox(data.viewBox);
      setStartDate(data.startDate ?? "");
      setendDate(data.endDate ?? "");
    } else {
      setBoxSelected(data.BoxSelected);
      setViewBox(data.viewBox);
      setStartDate(data.startDate ?? "");
      setendDate(data.endDate ?? "");
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

          <div className="flex flex-col flex-wrap gap-4 w-full">
            <div className="flex flex-col flex-wrap gap-4 w-full mt-4">
              <p className="italic text-[#868E96] font-bold">Date range:</p>
              <div className="flex items-center gap-4">
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <DateInput
                        className="max-w-sm"
                        label="Start:"
                        labelPlacement="outside-left"
                        onChange={(date) => field.onChange(date?.toString())}
                        value={
                          field.value
                            ? new CalendarDate(
                                Number(field.value.split("-")[0]),
                                Number(field.value.split("-")[1]),
                                Number(field.value.split("-")[2])
                              )
                            : new CalendarDate(2025, 9, 10)
                        }
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-wrap gap-4 w-full">
            <div className="flex flex-col flex-wrap gap-4 w-full mt-4">
              <div className="flex items-center gap-4">
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <DateInput
                        className="max-w-sm"
                        label="End:"
                        labelPlacement="outside-left"
                        placeholderValue={new CalendarDate(2025, 9, 10)}
                        onChange={(date) => field.onChange(date?.toString())}
                        value={
                          field.value
                            ? new CalendarDate(
                                Number(field.value.split("-")[0]),
                                Number(field.value.split("-")[1]),
                                Number(field.value.split("-")[2])
                              )
                            : new CalendarDate(2025, 9, 10)
                        }
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-4 w-full">
            <Button
              color="primary"
              type="submit"
              className="rounded-full font-bold w-full"
            >
              <span className="flex gap-4 justify-center items-center">
                Search
              </span>
            </Button>
          </div>
        </form>
      </div>

      <ViewBox />

      <DefectsView
        DefectsByModel={
          getDefectsByModel
            ? getDefectsByModel.map((defect) => ({
                ...defect,
                defecto: defect.defecto ?? "",
              }))
            : []
        }
        BoxSelected={BoxSelected}
        viewBox={viewBox}
      />

      <DefectTopList
        DefectsByModel={
          getDefectsByModel
            ? getDefectsByModel.map((defect) => ({
                ...defect,
                defecto: defect.defecto ?? "",
              }))
            : []
        }
        BoxSelected={BoxSelected}
        viewBox={viewBox}
      />
    </div>
  );
}
