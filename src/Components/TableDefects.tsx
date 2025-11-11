import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

export default function TableDefects() {
  return (
    <div className="w-full text-center">
      <h1 className="text-[#0068FF] text-2xl font-bold">Defects</h1>
      <Table
        hideHeader
        isStriped
        shadow="none"
        aria-label="Example static collection table"
        className="w-full"
      >
        <TableHeader>
          <TableColumn>Shift</TableColumn>
          <TableColumn>Quantity</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell className="text-center">1st</TableCell>
            <TableCell className="text-center">40</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell className="text-center">2nd</TableCell>
            <TableCell className="text-center">34</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell className="text-center">3rd</TableCell>
            <TableCell className="text-center">60</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
