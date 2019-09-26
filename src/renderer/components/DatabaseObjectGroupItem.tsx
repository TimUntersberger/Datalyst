import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const DatabaseObjectGroupItemWrapper = styled.div`
  display: flex;
  margin-left: 40px;
`;

const DatabaseObjectGroupItemName = styled.a<{ isActive: boolean }>`
  padding: 0 5px;
  font-size: 0.8em;
  margin-left: 5px;
  text-overflow: ellipsis;
  cursor: pointer;
  overflow: hidden;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  white-space: nowrap;
  width: 100%;
`;
type DatabaseObjectGroupItemProps = {
  item: string;
  Icon: any;
  onClick?: (item: string) => void;
  isSelected: (item: string) => boolean;
};
const DatabaseObjectGroupItem: React.FC<DatabaseObjectGroupItemProps> = ({
  Icon,
  item,
  onClick,
  isSelected
}) => {
  const textRef = useRef<HTMLAnchorElement>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    setTitle(
      textRef.current != null &&
        textRef.current.offsetWidth < textRef.current.scrollWidth
        ? item
        : undefined
    );
  }, [item]);

  return (
    <DatabaseObjectGroupItemWrapper>
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

export default DatabaseObjectGroupItem;
