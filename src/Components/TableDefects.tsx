import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

type TableDefectsProps = {
  stationDataDefects: Record<string, Record<string, number>> | null | undefined;
};

export default function TableDefects({
  stationDataDefects,
}: TableDefectsProps) {
  const turno1Total =
    (stationDataDefects?.["DRILL"]?.["1"] || 0) +
    (stationDataDefects?.["ENSAMBLE FINAL"]?.["1"] || 0) +
    (stationDataDefects?.["INSP. PINTURA"]?.["1"] || 0) +
    (stationDataDefects?.["D-FLASH"]?.["1"] || 0);

  const turno2Total =
    (stationDataDefects?.["DRILL"]?.["2"] || 0) +
    (stationDataDefects?.["ENSAMBLE FINAL"]?.["2"] || 0) +
    (stationDataDefects?.["INSP. PINTURA"]?.["2"] || 0) +
    (stationDataDefects?.["D-FLASH"]?.["2"] || 0);

  const turno3Total =
    (stationDataDefects?.["DRILL"]?.["3"] || 0) +
    (stationDataDefects?.["ENSAMBLE FINAL"]?.["3"] || 0) +
    (stationDataDefects?.["INSP. PINTURA"]?.["3"] || 0) +
    (stationDataDefects?.["D-FLASH"]?.["3"] || 0);

  return (
    <div className="w-full text-center">
      <h1 className="text-[#0068FF] text-2xl font-bold">Defects</h1>
      <Table
        isStriped
        shadow="none"
        aria-label="Example static collection table"
        className="w-full"
      >
        <TableHeader>
          <TableColumn className="text-center text-md">Shift</TableColumn>
          <TableColumn className="text-center text-md">Quantity</TableColumn>
          <TableColumn className="text-center text-md">Report</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell className="text-center text-md font-bold">1st</TableCell>
            <TableCell className="text-center text-md">{turno1Total}</TableCell>
            <TableCell className="text-center">
              <i className="bi bi-file-bar-graph text-lg text-[#0068FF] hover:cursor-pointer"></i>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell className="text-center text-md font-bold">2nd</TableCell>
            <TableCell className="text-center text-md">{turno2Total}</TableCell>
            <TableCell className="text-center">
              <i className="bi bi-file-bar-graph text-lg text-[#0068FF] hover:cursor-pointer"></i>
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell className="text-center text-md font-bold">3rd</TableCell>
            <TableCell className="text-center text-md">{turno3Total}</TableCell>
            <TableCell className="text-center">
              <i className="bi bi-file-bar-graph text-lg text-[#0068FF] hover:cursor-pointer"></i>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
