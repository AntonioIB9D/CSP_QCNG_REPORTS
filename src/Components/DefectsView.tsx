import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import type { defectData, GroupedZoneData } from "../Types/types";
import "./chipColors.css";

type DefectsViewProps = {
  DefectsByModel: defectData[] | [];
  BoxSelected: string;
  viewBox: string;
};

export default function DefectsView({
  DefectsByModel,
  BoxSelected,
  viewBox,
}: DefectsViewProps) {
  const selectedModelL = BoxSelected === "LD" ? "ldModel" : "sdModel";
  const selectedZoneL = viewBox.toLocaleLowerCase();

  /* Get data by defecto-zona */
  const groupedData = DefectsByModel?.reduce<Record<string, GroupedZoneData>>(
    (acc, data) => {
      const key = `${data.defecto}-${data.zona}`;
      if (!acc[key]) {
        acc[key] = {
          defecto: data.defecto,
          zona: data.zona,
          folio: data.folio,
          total: 0,
        };
      }
      acc[key].total += 1;
      return acc;
    },
    {}
  );

  const allDefect = Object.values(groupedData || {});

  return (
    <div className="flex flex-col w-full bg-[#F8F9FA] p-4 rounded-2xl gap-4">
      <div className="flex items-center gap-2">
        <div className="bg-[#EAF0FE] rounded-xl w-12 h-12 flex justify-center items-center">
          <i className="bi bi-eye text-3xl text-[#0068FF]"></i>
        </div>
        <p className="text-xl font-bold">Defects by View</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div className="flex flex-col gap-4">
          <div className="overflow-auto scrollbar-hide max-h-[19rem] w-full bg-[#F8F9FA] rounded-3xl">
            {allDefect.length === 0 ? (
              <>
                <p className="text-[#868E96] font-bold italic">
                  Search to display defects by view
                </p>
              </>
            ) : (
              <Table
                className="max-w-[20rem] lg:max-w-[23rem]"
                aria-label="Employee information table"
              >
                <TableHeader>
                  <TableColumn className="font-bold text-black">
                    Zone
                  </TableColumn>
                  <TableColumn className="font-bold text-black">
                    Defect Name
                  </TableColumn>
                  <TableColumn className="font-bold text-black">
                    Incidence cases
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {allDefect.map((group, index) => (
                    <TableRow key={`${group.defecto}-${group.zona}-${index}`}>
                      <TableCell className="text-pretty">
                        <Chip
                          className={`custom-chip-${group.zona
                            .replace(/\s+/g, "")
                            .toLocaleLowerCase()}-${selectedModelL}-${selectedZoneL.toLocaleLowerCase()} `}
                        >
                          <b>{group.zona}</b>
                        </Chip>
                      </TableCell>
                      <TableCell>
                        {group.defecto
                          ? `${group.defecto}`
                          : "DEFECTO NO DEFINIDO"}
                      </TableCell>
                      <TableCell className="text-center">
                        {group.total}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
