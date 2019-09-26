import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import ArrowDropdownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import DatabaseObjectGroupItem from "./DatabaseObjectGroupItem";

const DatabaseObjectGroupWrapper = styled.div`
  padding: 5px;
`;

const DatabaseObjectGroupHeader = styled.div`
  display: flex;
  font-size: 0.8em;
  font-weight: 500;
  align-items: center;
`;
type DatabaseObjectGroupProps = {
  header: string;
  items: string[];
  Icon: any;
  isSelected: (item: string) => boolean;
  onClick?: (item: string) => void;
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
          key={item}
          Icon={Icon}
          item={item}
          isSelected={isSelected}
          onClick={onClick}
        ></DatabaseObjectGroupItem>
      ))}
    </DatabaseObjectGroupWrapper>
  );
};

export default DatabaseObjectGroup;
