import * as Mysql from "mysql";
import ISqlManager, {
  DatabaseObject,
  TableMetaData,
  ConnectionConfig
} from "./ISqlManager";

export default class MySqlManager implements ISqlManager {
  private conn: Mysql.Connection;
  private db: string;

  constructor(config: ConnectionConfig) {
    this.conn = Mysql.createConnection(config);
    this.db = config.database || "";
  }

  getDatabases(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.conn.query("show databases", (err, result) => {
        if (err) reject(err);
        else resolve(result.map((x: any) => x.Database));
      });
    });
  }
  getObjects(): Promise<DatabaseObject[]> {
    return new Promise((resolve, reject) => {
      this.conn.query(
        `select table_name as name, 'table' as type from information_schema.tables where table_schema = '${this.db}'
         union select routine_name as name, 'routine' as type from information_schema.routines where routine_schema = '${this.db}'`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }
  getMetaDataOfTable(table: string): Promise<TableMetaData> {
    return new Promise((resolve, reject) => {
      this.conn.query(
        // c.column_name,
        // is_nullable,
        // c.ordinal_position,
        // column_default,
        // column_type
        // find out how to see the constraint type (check, forgein and that shit)
        `select 
          constraint_name
         from information_schema.columns c  
         join information_schema.key_column_usage k on k.column_name = c.column_name
         where c.table_schema = '${this.db}' and c.table_name = '${table}'
         `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }
  getDataOfTable(table: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.conn.query(`select * from ${this.db}.${table}`, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}
