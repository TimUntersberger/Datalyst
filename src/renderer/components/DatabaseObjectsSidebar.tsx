import styled from "styled-components";
import { ScrollbarCSS } from "../globalCss";
import DatabaseObjectGroup from "./DatabaseObjectGroup";
import TableIcon from "./TableIcon";
import FunctionIcon from "./FunctionIcon";
import React from "react";

const DatabaseObjectsSidebarWrapper = styled.div`
  min-width: 250px;
  max-width: 250px;
  height: 100vh;
  padding-right: 10px;
  overflow-y: scroll;
  border-right: 1px solid lightgrey;

  ${ScrollbarCSS}
`;

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

export default DatabaseObjectsSidebar;
