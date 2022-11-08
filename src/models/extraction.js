// const oracledb = require("oracledb");
const sql = require("../utils/mysql");

module.exports.getRawMaterialFloor = () => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT id_materias_prima, materia_prima_label FROM MATERIAS_PRIMA WHERE id_tipo_materia_prima = 2;`,
      function (err, result, fields) {
        if (err) {
          reject(err);
          throw err;
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports.getRawMaterialBlock = () => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT id_materias_prima, materia_prima_label FROM MATERIAS_PRIMA WHERE id_tipo_materia_prima = 1;`,
      function (err, result, fields) {
        if (err) {
          reject(err);
          throw err;
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports.postNewTruck = ({ truckBrand, code, tons }) => {
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
