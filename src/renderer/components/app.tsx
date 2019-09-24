import React from "react"
import SqlManager from "../sqlManager"

SqlManager.connect({
  host: "localhost",
  port: 3306,
  username: "root",
  password: "teamtengu1",
  database: "test"
})

SqlManager.getDatabases().then(console.log)

export default function App() {
  return <div>Hello World</div>
}
