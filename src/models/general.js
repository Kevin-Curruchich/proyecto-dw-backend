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

module.exports.getAllTransportRental = () => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT AP.precio, AP.descripcion, AP.truck_unique_code, TA.tipo_alquiler_label FROM ALQUILER_TRANSPORTE AP INNER JOIN TIPO_ALQUILER_TRANSPORTE TA ON AP.id_tipo_alquiler = TA.id_tipo_alquiler;`,
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

module.exports.getBudget = () => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT P.id_prespuesto, C.C_descrpcion, P.presupuesto FROM PRESUPUESTOS P INNER JOIN COMPANIAS C ON P.id_compania = C.id_compania;`,
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

module.exports.getEmployees = () => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT id_personal, P_nombre, P_apellido, P_DPI FROM PERSONAL;`,
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
