// const oracledb = require("oracledb");
const sql = require("../utils/mysql");
// const { pool } = require("../utils/oracle");

module.exports.getAllDepartments = () => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM DEPARTAMENTOS`, function (err, result, fields) {
      if (err) {
        reject(err);
        throw err;
      } else {
        console.log({ result });
        resolve(result);
      }
    });
  });
};

module.exports.getAllTransportRentalTypes = () => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT * FROM TIPO_ALQUILER_TRANSPORTE`,
      function (err, result, fields) {
        if (err) {
          reject(err);
          throw err;
        } else {
          console.log({ result });
          resolve(result);
        }
      }
    );
  });
};
