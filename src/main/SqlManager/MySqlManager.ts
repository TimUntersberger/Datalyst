import * as Mysql from "mysql";
import ISqlManager, {
  Database,
  DatabaseObject,
  TableMetaData
} from "./ISqlManager";

export default class MySqlManager implements ISqlManager {
  private conn: Mysql.Connection;

  constructor(config: Mysql.ConnectionConfig) {
    this.conn = Mysql.createConnection(config);
  }

  getDatabases(): Promise<Database[]> {
    return new Promise((resolve, reject) => {
      this.conn.query("", (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  getDatabaseObjects(db: string): Promise<DatabaseObject[]> {
    throw new Error("Method not implemented.");
  }
  getMetaDataOfTable(table: string): Promise<TableMetaData> {
    throw new Error("Method not implemented.");
  }
}
