import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useWindowSize } from "the-platform";

const TableHeader = styled.th`
  padding: 5px 20px;
  font-size: 0.8em;
  border: 1px solid lightgrey;
  border-top: 0;
  border-left: 0;

  &:last-child {
    border-right: none;
  }
`;

const TableRow = styled.tr`
  min-height: 25px;
  height: 25px;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableRowData = styled.td`
  padding: 5px 20px;
  font-size: 0.8em;
  border-right: 1px solid lightgrey;

  &:last-child {
    border-right: none;
  }
`;

const Table = styled.table`
  width: 100%;
  height: 100vh;
  border-spacing: 0;
`;

const TableBody = styled.tbody`
  overflow-y: hidden;
  height: 100%;
`;

type TableProps = {
  columns: string[];
  data: any[];
};
const TableData: React.FC<TableProps> = ({ columns, data }) => {
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  const [dummyRows, setDummyRows] = useState<any[]>([]);
  const windowSize = useWindowSize();

  useEffect(() => {
    const temp = [] as any[];
    const height = tbodyRef.current!.offsetHeight;
    const dummyRowCount = Math.ceil((height - data.length * 25) / 25);

    console.log("calc");

    for (let i = 0; i < dummyRowCount; i++) {
      temp.push(
        <TableRow key={i}>
          {columns.map((_, i) => (
            <TableRowData key={i}></TableRowData>
          ))}
        </TableRow>
      );
    }
    setDummyRows(temp);
  }, [data, windowSize]);

  return (
    <Table>
      <thead>
        <tr>
          {columns.map(col => (
            <TableHeader key={col}>{col}</TableHeader>
          ))}
        </tr>
      </thead>
      <TableBody ref={tbodyRef}>
        {data.map((row, i) => (
          <TableRow key={i}>
            {columns.map((col, i) => (
              <TableRowData key={i}>{row[col]}</TableRowData>
            ))}
          </TableRow>
        ))}
        {dummyRows}
      </TableBody>
    </Table>
  );
};

export default TableData;
