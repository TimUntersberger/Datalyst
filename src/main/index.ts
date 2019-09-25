import { format } from "url"
import { BrowserWindow, app, ipcMain as ipc } from "electron"
import isDev from "electron-is-dev"
import { resolve } from "app-root-path"
import ISqlManager from "./SqlManager/ISqlManager"
import MySqlManager from "./SqlManager/MySqlManager"

let manager: ISqlManager

app.on("ready", async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
    if (isDev) {
      mainWindow.webContents.openDevTools()
    }
  })

  const devPath = "http://localhost:1234"
  const prodPath = format({
    pathname: resolve("app/renderer/.parcel/production/index.html"),
    protocol: "file:",
    slashes: true
  })
  const url = isDev ? devPath : prodPath

  mainWindow.setMenu(null)
  mainWindow.loadURL(url)
})

app.on("window-all-closed", app.quit)

ipc.on("manager/connect", (event, args) => {
  if (manager) {
    manager.close()
  }
  manager = new MySqlManager({
    host: args.host,
    port: args.port,
    user: args.username,
    password: args.password,
    database: args.database
  })
  event.returnValue = true
})

ipc.on("manager/getDatabases", (event, args) => {
  manager.getDatabases().then(result => {
    event.reply("manager/getDatabases/result", result)
  })
})

ipc.on("manager/getObjects", (event, args) => {
  manager.getObjects().then(result => {
    event.reply("manager/getObjects/result", result)
  })
})

ipc.on("manager/getDataOfTable", (event, args) => {
  manager.getDataOfTable(args).then(result => {
    event.reply("manager/getDataOfTable/result", result)
  })
})

ipc.on("manager/getMetaDataOfTable", (event, args) => {
  manager.getMetaDataOfTable(args).then(result => {
    event.reply("manager/getMetaDataOfTable/result", result)
  })
})
