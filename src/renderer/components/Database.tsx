import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import DatabaseIcon from "./DatabaseIcon";

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
  const [title, setTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    setTitle(
      textRef.current != null &&
        textRef.current.offsetWidth < textRef.current.scrollWidth
        ? db
        : undefined
    );
  }, [db]);

  return (
    <DatabaseWrapper isActive={isActive} onClick={onClick} title={title}>
      <DatabaseIcon height={24} width={24}></DatabaseIcon>
      <DatabaseName ref={textRef}>{db}</DatabaseName>
    </DatabaseWrapper>
  );
};

export default Database;
