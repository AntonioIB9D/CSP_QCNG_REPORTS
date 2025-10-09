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

type DefectTopListProps = {
  DefectsByModel: defectData[] | [];
  BoxSelected: string;
  viewBox: string;
};

export default function DefectTopList({
  DefectsByModel,
  BoxSelected,
  viewBox,
}: DefectTopListProps) {
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

  /* Obtención del Top 5 */
  const sortedDefects = Object.values(groupedData)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    .map(({ defecto, zona, folio, total }) => ({
      defecto,
      zona,
      folio,
      count: total,
    }));

  return (
    <div className="flex flex-col w-full bg-[#F8F9FA] p-4 rounded-2xl">
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#EAF0FE] rounded-xl w-12 h-12 flex justify-center items-center">
              <i className="bi bi-clipboard2-x text-3xl text-[#0068FF]"></i>
            </div>
            <p className="text-xl font-bold">Defect Top List</p>
          </div>
          <div className="overflow-auto scrollbar-hide max-h-[19rem] w-full bg-[#F8F9FA] rounded-3xl">
            <Table
              className="max-w-[20rem] lg:max-w-[23rem]"
              aria-label="Employee information table"
            >
              <TableHeader>
                <TableColumn className="font-bold text-black">Zone</TableColumn>
                <TableColumn className="font-bold text-black">
                  Defect Name
                </TableColumn>
                <TableColumn className="font-bold text-black">
                  Incidence cases
                </TableColumn>
              </TableHeader>
              <TableBody>
                {sortedDefects.map((group, index) => (
                  <TableRow key={`${group.defecto}-${group.zona}-${index}`}>
                    <TableCell className="text-pretty">
                      <Chip
                        className={`custom-chip-${group.zona
                          .replace(/\s+/g, "")
                          .toLocaleLowerCase()}-${selectedModelL}-${selectedZoneL.toLocaleLowerCase()}`}
                      >
                        {group.zona}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      {group.defecto
                        ? `${group.defecto}`
                        : "DEFECTO NO DEFINIDO"}
                    </TableCell>
                    <TableCell className="text-center">{group.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
