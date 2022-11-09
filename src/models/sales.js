// const oracledb = require("oracledb");
const sql = require("../utils/mysql");

module.exports.postSales = ({ truckBrand, code, tons }) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO TRUCKS(truck_brand,truck_ton, truck_unique_code ) VALUES (${truckBrand}, ${tons}, '${code}');`,
      function (err, result, fields) {
        if (err) {
          reject(err);
          throw err;
        } else {
          const rows = result["affectedRows"];
          console.log({ rows });
          resolve({ rows });
        }
      }
    );
  });
};
