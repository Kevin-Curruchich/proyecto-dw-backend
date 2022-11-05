const mysql = require("mysql");
const dbConfig = require("../config/config");

var con = mysql.createConnection({
  host: dbConfig.db.host,
  user: dbConfig.db.user,
  password: dbConfig.db.password,
  database: dbConfig.db.database,
});

module.exports = con;
