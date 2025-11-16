import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import { DefectsReport } from "./DefectsReport";
import { pdf } from "@react-pdf/renderer";

type TableDefectsProps = {
  stationDataDefects:
    | {
        Defects: Record<string, Record<string, number>>;
        ReportData: Record<string, Record<string, Record<string, number>>>;
      }
    | null
    | undefined;
};

export default function TableDefects({
  stationDataDefects,
}: TableDefectsProps) {
  const turno1Total =
    (stationDataDefects?.Defects["DRILL"]?.["1"] || 0) +
    (stationDataDefects?.Defects["ENSAMBLE FINAL"]?.["1"] || 0) +
    (stationDataDefects?.Defects["INSP. PINTURA"]?.["1"] || 0) +
    (stationDataDefects?.Defects["D-FLASH"]?.["1"] || 0);

  const turno2Total =
    (stationDataDefects?.Defects["DRILL"]?.["2"] || 0) +
    (stationDataDefects?.Defects["ENSAMBLE FINAL"]?.["2"] || 0) +
    (stationDataDefects?.Defects["INSP. PINTURA"]?.["2"] || 0) +
    (stationDataDefects?.Defects["D-FLASH"]?.["2"] || 0);

  const turno3Total =
    (stationDataDefects?.Defects["DRILL"]?.["3"] || 0) +
    (stationDataDefects?.Defects["ENSAMBLE FINAL"]?.["3"] || 0) +
    (stationDataDefects?.Defects["INSP. PINTURA"]?.["3"] || 0) +
    (stationDataDefects?.Defects["D-FLASH"]?.["3"] || 0);

  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  const downloadReport = async (shift: string) => {
    // Operations
    if (stationDataDefects === null || stationDataDefects === undefined) return;
    const reportByStation: Record<string, Record<string, number>> = {};
    Object.entries(stationDataDefects.ReportData).forEach(
      ([station, turnos]) => {
        const defects = turnos[shift];
        if (defects) {
          reportByStation[station] = defects;
        } else {
          reportByStation[station] = {};
        }
      }
    );
    // Defectos de D-FLASH
    const totalDefectosDflash = Object.values(
      reportByStation["D-FLASH"]
    ).reduce((sum, cantidad) => sum + cantidad, 0);

    //Consulta de las estaciones
    const dflashDefects = reportByStation["D-FLASH"];
    const drillDefects = reportByStation["DRILL"];
    const eFinalDefects = reportByStation["ENSAMBLE FINAL"];
    const paintDefects = reportByStation["INSP. PINTURA"];

    const defectEntries = Object.entries(dflashDefects).map(
      ([defecto, cantidad]) => ({
        text: `>> ${capitalize(defecto)}: ${cantidad}`,
        style: "information",
        margin: [0, 10, 0, 0] as [number, number, number, number],
      })
    );

    // Defectos de DRILL
    const totalDefectosDrill = Object.values(reportByStation["DRILL"]).reduce(
      (sum, cantidad) => sum + cantidad,
      0
    );

    const defectEntriesDrill = Object.entries(drillDefects).map(
      ([defecto, cantidad]) => ({
        text: `>> ${capitalize(defecto)}: ${cantidad}`,
        style: "information",
        margin: [0, 10, 0, 0] as [number, number, number, number],
      })
    );

    // Defectos de ENSAMBLE FINAL
    const totalDefectosEfinal = Object.values(
      reportByStation["ENSAMBLE FINAL"]
    ).reduce((sum, cantidad) => sum + cantidad, 0);

    const defectEntriesEFinal = Object.entries(eFinalDefects).map(
      ([defecto, cantidad]) => ({
        text: `>> ${capitalize(defecto)}: ${cantidad}`,
        style: "information",
        margin: [0, 10, 0, 0] as [number, number, number, number],
      })
    );

    // Defectos de INSP. PINTURA
    const totalDefectosIpintura = Object.values(
      reportByStation["INSP. PINTURA"]
    ).reduce((sum, cantidad) => sum + cantidad, 0);

    const defectEntriesPaint = Object.entries(paintDefects).map(
      ([defecto, cantidad]) => ({
        text: `>> ${capitalize(defecto)}: ${cantidad}`,
        style: "information",
        margin: [0, 10, 0, 0] as [number, number, number, number],
      })
    );

    const blob = await pdf(<DefectsReport shift={shift} />).toBlob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Defects Report Shift ${shift}.pdf`;
    link.click();

    URL.revokeObjectURL(url); // Limpieza opcional
  };

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
              <i
                className="bi bi-file-bar-graph text-lg text-[#0068FF] hover:cursor-pointer"
                onClick={() => {
                  const shift = "1";
                  downloadReport(shift);
                }}
              ></i>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell className="text-center text-md font-bold">2nd</TableCell>
            <TableCell className="text-center text-md">{turno2Total}</TableCell>
            <TableCell className="text-center">
              <i
                className="bi bi-file-bar-graph text-lg text-[#0068FF] hover:cursor-pointer"
                onClick={() => {
                  const shift = "2";
                  downloadReport(shift);
                }}
              ></i>
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell className="text-center text-md font-bold">3rd</TableCell>
            <TableCell className="text-center text-md">{turno3Total}</TableCell>
            <TableCell className="text-center">
              <i
                className="bi bi-file-bar-graph text-lg text-[#0068FF] hover:cursor-pointer"
                onClick={() => {
                  const shift = "3";
                  downloadReport(shift);
                }}
              ></i>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
