import ISqlManager from "../main/SqlManager/ISqlManager"

const ipc = window.require("electron").ipcRenderer

const publish = <T>(topic: string, args?: any): Promise<T> =>
  new Promise((resolve, reject) => {
    ipc.once(`${topic}/result`, (event, args) => resolve(args))
    ipc.send(topic, args)
  })

class SqlManager implements ISqlManager {
  close(): void {}
  connect(config: any) {
    ipc.sendSync("manager/connect", config)
  }
  getDatabases(): Promise<string[]> {
    return publish("manager/getDatabases")
  }
  getObjects(): Promise<object[]> {
    return publish("manager/getObjects")
  }
  getMetaDataOfTable(
    table: string
  ): Promise<import("../main/SqlManager/ISqlManager").TableMetaData> {
    return publish("manager/getMetaDataOfTable", table)
  }
  getDataOfTable(table: string): Promise<any[]> {
    return publish("manager/getDataOfTable", table)
  }
}

const manager = new SqlManager()

export default manager
