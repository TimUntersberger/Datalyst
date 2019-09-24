import * as MySql from "mysql";

export type DatabaseObject = object;
export type TableMetaData = {
  columns: any[];
  constraints: any[];
};

export interface ConnectionConfig extends MySql.ConnectionConfig {
  database: string;
}

export default interface ISqlManager {
  getDatabases(): Promise<string[]>;
  getObjects(): Promise<DatabaseObject[]>;
  getMetaDataOfTable(table: string): Promise<TableMetaData>;
  getDataOfTable(table: string): Promise<any[]>;
  close(): void;
}
