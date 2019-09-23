export type Database = string;
export type Table = string;
export type DatabaseObject = object;
export type TableMetaData = object;

export default interface ISqlManager {
  getDatabases(): Promise<Database[]>;
  getDatabaseObjects(db: Database): Promise<DatabaseObject[]>;
  getMetaDataOfTable(table: Table): Promise<TableMetaData>;
}
