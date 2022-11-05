// const dotenv = require("dotenv");

// dotenv.config();

// module.exports = {
//   server: {
//     port: process.env.SERVER_PORT,
//   },
//   oracleConfig: {
//     user: process.env.ORACLE_USER,
//     password: process.env.ORACLE_PASS,
//     connectString: process.env.ORACLE_CONNSTR,
//     poolMin: 10,
//     poolMax: 10,
//     poolIncrement: 0,
//   },
//   api_exchange: {
//     api_key: process.env.API_KEY_EXCHANGE,
//   },
// };

const config = {
  db: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "dw22",
  },
  server: {
    port: 8500,
  },
  listPerPage: 10,
};
module.exports = config;
