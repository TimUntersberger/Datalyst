import ISqlManager from "../main/SqlManager/ISqlManager";

const ipc = window.require("electron").ipcRenderer;

const publish = <T>(topic: string): Promise<T> =>
  new Promise((resolve, reject) => {
    ipc.once(`${topic}/result`, (event, args) => resolve(args));
    ipc.send(topic);
  });

class SqlManager implements ISqlManager {
  close(): void {}
  connect(config: any) {
    ipc.sendSync("manager/connect", config);
  }
  getDatabases(): Promise<string[]> {
    return publish("manager/getDatabases");
  }
  getObjects(): Promise<object[]> {
    return publish("manager/getObjects");
  }
  getMetaDataOfTable(
    table: string
  ): Promise<import("../main/SqlManager/ISqlManager").TableMetaData> {
    throw new Error("Method not implemented.");
  }
  getDataOfTable(table: string): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
}

const manager = new SqlManager();

export default manager;
