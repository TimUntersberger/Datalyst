import * as Mysql from "mysql"
import ISqlManager, {
  DatabaseObject,
  TableMetaData,
  ConnectionConfig
} from "./ISqlManager"

export default class MySqlManager implements ISqlManager {
  private conn: Mysql.Connection
  private db: string

  constructor(config: ConnectionConfig) {
    this.conn = Mysql.createConnection(config)
    this.db = config.database || ""
  }

  getDatabases(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.conn.query("show databases", (err, result) => {
        if (err) reject(err)
        else resolve(result.map((x: any) => x.Database))
      })
    })
  }
  getObjects(): Promise<DatabaseObject[]> {
    return new Promise((resolve, reject) => {
      this.conn.query(
        `select table_name as name, 'table' as type from information_schema.tables where table_schema = '${this.db}'
         union select routine_name as name, 'routine' as type from information_schema.routines where routine_schema = '${this.db}'`,
        (err, result) => {
          if (err) reject(err)
          else resolve(result)
        }
      )
    })
  }
  getMetaDataOfTable(table: string): Promise<TableMetaData> {
    return new Promise((resolve, reject) => {
      this.conn.query(
        `
        SELECT
          col.table_name "tableName",
          col.column_name "columnName",
          column_type "columnType",
          is_nullable "isNullable",
          column_default "columnDefault",
          col.ORDINAL_POSITION "columnOrdinalPosition",
          k.constraint_name "constraintName",
          constraint_type "constraintType",
          k.ordinal_position "constraintOrdinalPosition"
        FROM
          information_schema.columns col
          LEFT JOIN information_schema.KEY_COLUMN_USAGE k ON k.column_name = col.column_name
          LEFT JOIN information_schema.TABLE_CONSTRAINTS const ON const.constraint_name = k.constraint_name
        WHERE
          col.TABLE_SCHEMA = '${this.db}'
          AND col.table_name = '${table}'
        GROUP BY
          col.column_name,
          k.constraint_name,
          constraint_type,
          col.column_name,
          column_default,
          col.ORDINAL_POSITION,
          is_nullable,
          column_type,
          k.ordinal_position
        ORDER BY
          col.ordinal_position, k.ordinal_position;
        `,
        (err, result) => {
          if (err) reject(err)
          else {
            const metaData: TableMetaData = {
              columns: [],
              constraints: []
            }

            result.forEach(x => {
              if (!metaData.columns.some(col => col.name === x.columnName))
                metaData.columns.push({
                  name: x.columnName,
                  type: x.columnType,
                  isNullable: x.isNullable === "YES",
                  default: x.columnDefault
                })
              if (!metaData.constraints.some(c => c.name === x.constraintName))
                metaData.constraints.push({
                  name: x.constraintName,
                  type: x.constraintType
                })
            })

            resolve(metaData)
          }
        }
      )
    })
  }
  getDataOfTable(table: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.conn.query(`select * from ${this.db}.${table}`, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}
