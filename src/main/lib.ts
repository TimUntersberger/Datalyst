import MySqlManager from "./SqlManager/MySqlManager";

let sqlManager = new MySqlManager({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "teamtengu1",
  database: "test"
});
