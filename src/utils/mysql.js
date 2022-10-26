const mysql = require("mysql");
const dbConfig = require("../config/config");

var con = mysql.createConnection({
  host: dbConfig.db.host,
  user: dbConfig.db.user,
  password: dbConfig.db.password,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Conenected!");
});
