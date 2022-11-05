// const oracledb = require("oracledb");
const sql = require("../utils/mysql");
// const { pool } = require("../utils/oracle");

module.exports.getTruckBrands = () => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM TRUCKS_BRANDS`, function (err, result, fields) {
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

module.exports.getTruckTons = () => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM TRUCK_TONS`, function (err, result, fields) {
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

module.exports.getAllTrucks = () => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT TKB.truck_brand, TRUCK_UNIQUE_CODE FROM TRUCKS TK INNER JOIN TRUCKS_BRANDS TKB ON TK.truck_brand = TKB.truck_brand_id`,
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

module.exports.postTransportRental = ({
  idCamion,
  departamento,
  category,
  precioAlquiler,
  description,
}) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO ALQUILER_TRANSPORTE(truck_unique_code, id_deparamento, id_tipo_alquiler, precio, descripcion ) VALUES ("${idCamion}", ${departamento}, ${category}, ${precioAlquiler}, "${description}");`,
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
