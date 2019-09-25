import React, { useState, useEffect, useRef } from "react";
import SqlManager from "../sqlManager";
import DatabaseIcon from "./DatabaseIcon";
import styled from "styled-components";
import ArrowDropdownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TableIcon from "./TableIcon";
import FunctionIcon from "./FunctionIcon";

const DatabaseWrapper = styled.a<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background-color: ${props => (props.isActive ? "#eeeeee" : "white")};
`;

const DatabaseName = styled.span`
  font-size: 0.8em;
  margin-top: 5px;
  font-weight: lighter;
  color: black;
  text-align: center;
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
`;

type DatabaseProps = {
  db: string;
  isActive: boolean;
  onClick: (event: any) => void;
};

const Database: React.FC<DatabaseProps> = ({ db, isActive, onClick }) => {
  const textRef = useRef<HTMLSpanElement>(null);

  const title =
    textRef.current != null &&
    textRef.current.offsetWidth < textRef.current.scrollWidth
      ? db
      : undefined;

  return (
    <DatabaseWrapper isActive={isActive} onClick={onClick} title={title}>
      <DatabaseIcon height={24} width={24}></DatabaseIcon>
      <DatabaseName ref={textRef}>{db}</DatabaseName>
    </DatabaseWrapper>
  );
};

const DatabasesSidebar = styled.div`
  width: 70px;
  height: 100vh;
  border-right: 1px solid lightgrey;
`;

const AppWrapper = styled.div`
  display: flex;
`;

const DatabaseObjectsSidebarWrapper = styled.div`
  min-width: 250px;
  max-width: 250px;
  border-right: 1px solid lightgrey;
`;

const DatabaseObjectGroupWrapper = styled.div`
  padding: 5px;
`;

const DatabaseObjectGroupHeader = styled.div`
  display: flex;
  font-size: 0.8em;
  font-weight: 500;
  align-items: center;
`;

const DatabaseObjectGroupItemWrapper = styled.div`
  display: flex;
  margin-left: 40px;
`;

const DatabaseObjectGroupItemName = styled.a<{ isActive: boolean }>`
  font-size: 0.8em;
  margin-left: 5px;
  text-overflow: ellipsis;
  cursor: pointer;
  overflow: hidden;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  white-space: nowrap;
  width: 100%;
`;

type DatabaseObjectGroupProps = {
  header: string;
  items: string[];
  Icon: any;
  isSelected: (item: string) => boolean;
  onClick?: (item: string) => void;
};

type DatabaseObjectGroupItemProps = {
  item: string;
  Icon: any;
  onClick: (item: string) => void;
  isSelected: (item: string) => boolean;
};
const DatabaseObjectGroupItem: React.FC<DatabaseObjectGroupItemProps> = ({
  Icon,
  item,
  onClick,
  isSelected
}) => {
  const textRef = useRef<HTMLAnchorElement>(null);

  const title =
    textRef.current != null &&
    textRef.current.offsetWidth < textRef.current.scrollWidth
      ? item
      : undefined;

  return (
    <DatabaseObjectGroupItemWrapper key={item}>
      <Icon width={14} height={14}></Icon>
      <DatabaseObjectGroupItemName
        ref={textRef}
        title={title}
        onClick={() => {
          onClick && onClick(item);
        }}
        isActive={isSelected(item)}
      >
        {item}
      </DatabaseObjectGroupItemName>
    </DatabaseObjectGroupItemWrapper>
  );
};

const DatabaseObjectGroup: React.FC<DatabaseObjectGroupProps> = ({
  header,
  items,
  Icon,
  isSelected,
  onClick
}) => {
  return (
    <DatabaseObjectGroupWrapper>
      <DatabaseObjectGroupHeader>
        <ArrowDropdownIcon></ArrowDropdownIcon>
        {header}
      </DatabaseObjectGroupHeader>
      {items.map(item => (
        <DatabaseObjectGroupItem
          Icon={Icon}
          item={item}
          isSelected={isSelected}
          onClick={onClick}
        ></DatabaseObjectGroupItem>
      ))}
    </DatabaseObjectGroupWrapper>
  );
};

type DatabaseObjectsSidebarProps = {
  objects: any[];
  selectedTable: string;
  setSelectedTable: (item: string) => void;
};
const DatabaseObjectsSidebar: React.FC<DatabaseObjectsSidebarProps> = ({
  objects,
  selectedTable,
  setSelectedTable
}) => {
  const tables: string[] = [];
  const functions: string[] = [];

  if (objects)
    objects.forEach(o => {
      if (o.type === "table") tables.push(o.name);
      else if (o.type === "function") functions.push(o.name);
    });
  return (
    <DatabaseObjectsSidebarWrapper>
      <DatabaseObjectGroup
        header="Tables"
        onClick={item => setSelectedTable(item)}
        isSelected={item => item == selectedTable}
        items={tables}
        Icon={TableIcon}
      ></DatabaseObjectGroup>
      <DatabaseObjectGroup
        header="Functions"
        isSelected={item => false}
        items={functions}
        Icon={FunctionIcon}
      ></DatabaseObjectGroup>
    </DatabaseObjectsSidebarWrapper>
  );
};

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
  height: 100%;
  border-spacing: 0;
`;

type TableProps = {
  columns: string[];
  data: any[];
};
const TableData: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <Table>
      <thead>
        <tr>
          {columns.map(col => (
            <TableHeader key={col}>{col}</TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {Object.keys(row).map((col, i) => (
              <TableRowData key={i}>{row[col]}</TableRowData>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default function App() {
  const [selectedDatabase, setSelectedDatabase] = useState("test");
  const [selectedTable, setSelectedTable] = useState("account");
  const [databases, setDatabases] = useState([]);
  const [objects, setObjects] = useState([]);
  const [data, setData] = useState([]);
  const [metaData, setMetaData] = useState({
    columns: [] as any[],
    constraints: [] as any[]
  });

  useEffect(() => {
    SqlManager.connect({
      host: "localhost",
      port: 3306,
      username: "root",
      password: "teamtengu1",
      database: selectedDatabase
    });

    setSelectedTable("");

    SqlManager.getDatabases().then(x => setDatabases(x as any));
    SqlManager.getObjects().then(x => setObjects(x as any));
  }, [selectedDatabase]);

  useEffect(() => {
    setMetaData({
      columns: [],
      constraints: []
    });
    setData([]);
    if (selectedTable !== "") {
      SqlManager.getMetaDataOfTable(selectedTable).then(x =>
        setMetaData(x as any)
      );
      SqlManager.getDataOfTable(selectedTable).then(x => setData(x as any));
    }
  }, [selectedTable]);

  return (
    <AppWrapper>
      <DatabasesSidebar>
        {databases.map(db => (
          <Database
            key={db}
            db={db}
            onClick={() => setSelectedDatabase(db)}
            isActive={db === selectedDatabase}
          ></Database>
        ))}
      </DatabasesSidebar>
      <DatabaseObjectsSidebar
        objects={objects}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
      ></DatabaseObjectsSidebar>
      <TableData
        data={data}
        columns={metaData.columns.map(x => x.name)}
      ></TableData>
    </AppWrapper>
  );
}
