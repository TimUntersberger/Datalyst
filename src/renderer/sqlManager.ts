import ISqlManager from "../main/SqlManager/ISqlManager"

const ipc = window.require("electron").ipcRenderer

class SqlManager implements ISqlManager {
  connect(config: any) {
    ipc.sendSync("manager/connect", config)
  }
  getDatabases(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      ipc.send("manager/getDatabases")
      ipc.once("manager/getDatabases/result", (event, args) => resolve(args))
    })
  }
  getObjects(): Promise<object[]> {
    throw new Error("Method not implemented.")
  }
  getMetaDataOfTable(
    table: string
  ): Promise<import("../main/SqlManager/ISqlManager").TableMetaData> {
    throw new Error("Method not implemented.")
  }
  getDataOfTable(table: string): Promise<any[]> {
    throw new Error("Method not implemented.")
  }
}

const manager = new SqlManager()

export default manager
