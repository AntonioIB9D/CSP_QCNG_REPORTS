import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { table } from "console";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Configurar las fuentes virtuales de pdfMake
pdfMake.vfs = pdfFonts.vfs;

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

  const generateReport = (shift: string) => {
    if (!stationDataDefects?.ReportData) return;

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

    const dflashDefects = reportByStation["D-FLASH"];

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

    const drillDefects = reportByStation["DRILL"];

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

    const eFinalDefects = reportByStation["ENSAMBLE FINAL"];

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

    const paintDefects = reportByStation["INSP. PINTURA"];

    const defectEntriesPaint = Object.entries(paintDefects).map(
      ([defecto, cantidad]) => ({
        text: `>> ${capitalize(defecto)}: ${cantidad}`,
        style: "information",
        margin: [0, 10, 0, 0] as [number, number, number, number],
      })
    );

    const documentDefinition = {
      content: [
        {
          text: "Defects Report",
          style: "header",
        },
        {
          table: {
            headerRows: 1,
            widths: [35, 75],
            body: [
              [
                {
                  text: `Shift - ${shift}`,
                  fontSize: 10,
                  fillColor: "#CFA011",
                },
              ],
            ],
          },
          layout: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
          },
          margin: [0, -1, 0, 0] as [number, number, number, number],
        },
        {
          text: "D-FLASH STATION",
          style: "chartTitle",
          alignment: "center" as const,
          margin: [0, 20, 0, 0] as [number, number, number, number],
        },
        {
          text: `Total defects reported: ${totalDefectosDflash ?? 0}`,
          style: "information",
          margin: [0, 10, 0, 0] as [number, number, number, number],
        },
        ...defectEntries,
        {
          text: "DRILL STATION",
          style: "chartTitle",
          alignment: "center" as const,
          margin: [0, 20, 0, 0] as [number, number, number, number],
        },
        {
          text: `Total defects reported: ${totalDefectosDrill ?? 0}`,
          style: "information",
          margin: [0, 10, 0, 0] as [number, number, number, number],
        },
        ...defectEntriesDrill,
        {
          text: "PAINT STATION",
          style: "chartTitle",
          alignment: "center" as const,
          margin: [0, 20, 0, 0] as [number, number, number, number],
        },
        {
          text: `Total defects reported: ${totalDefectosIpintura ?? 0}`,
          style: "information",
          margin: [0, 10, 0, 0] as [number, number, number, number],
        },
        ...defectEntriesPaint,

        {
          text: "FINAL ASSEMBLY STATION",
          style: "chartTitle",
          alignment: "center" as const,
          margin: [0, 20, 0, 0] as [number, number, number, number],
        },

        {
          text: `Total defects reported: ${totalDefectosEfinal ?? 0}`,
          style: "information",
          margin: [0, 10, 0, 0] as [number, number, number, number],
        },
        ...defectEntriesEFinal,
      ],

      styles: {
        header: {
          fontSize: 24,
          bold: true,
          color: "#0068FF",
          margin: [0, 0, 0, 0] as [number, number, number, number],
        },
        subheader: {
          fontSize: 10,
          color: "#7A7E83",
          margin: [0, 0, 0, 10] as [number, number, number, number],
        },
        chartTitle: {
          fontSize: 16,
          bold: true,
          color: "#28A745",
        },
      },
    };

    pdfMake
      .createPdf(documentDefinition)
      .open(/* `Defects Report Shift ${shift}.pdf` */);
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
                onClick={() => generateReport("1")}
              ></i>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell className="text-center text-md font-bold">2nd</TableCell>
            <TableCell className="text-center text-md">{turno2Total}</TableCell>
            <TableCell className="text-center">
              <i
                className="bi bi-file-bar-graph text-lg text-[#0068FF] hover:cursor-pointer"
                onClick={() => generateReport("2")}
              ></i>
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell className="text-center text-md font-bold">3rd</TableCell>
            <TableCell className="text-center text-md">{turno3Total}</TableCell>
            <TableCell className="text-center">
              <i
                className="bi bi-file-bar-graph text-lg text-[#0068FF] hover:cursor-pointer"
                onClick={() => generateReport("3")}
              ></i>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
