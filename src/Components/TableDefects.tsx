import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

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

  const generateReport = (shift: string) => {
    if (!stationDataDefects?.ReportData) return;

    const reportByStation: Record<string, Record<string, number>> = {};

    Object.entries(stationDataDefects.ReportData).forEach(
      ([station, turnos]) => {
        const defects = turnos[shift];
        if (defects) {
          reportByStation[station] = defects;
        }
      }
    );

    const documentDefinition = {
      content: [{ text: `Defects Report - Shift ${shift}`, style: "header" }],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          color: "#0068FF",
          alignment: "center" as const,
        },
      },
    };

    pdfMake
      .createPdf(documentDefinition)
      .download(`Defects Report Shift ${shift}.pdf`);
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
