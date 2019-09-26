import React, { useState, useEffect, useRef } from "react";
import SqlManager from "../sqlManager";
import styled from "styled-components";
import TableData from "./TableData";
import Database from "./Database";
import DatabaseObjectsSidebar from "./DatabaseObjectsSidebar";

const DatabasesSidebar = styled.div`
  width: 70px;
  height: 100vh;
  border-right: 1px solid lightgrey;
`;

const AppWrapper = styled.div`
  display: flex;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
`;

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
