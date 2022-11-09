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

module.exports.addExtraction = ({
  materiaPrima,
  departamento,
  empleadoVenta,
  monotMinimo,
  notas,
}) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO EXTRACCION(id_materias_prima, departament_id, id_personal, precio, notas) VALUES (${materiaPrima}, ${departamento}, ${empleadoVenta}, ${monotMinimo}, '${notas}');`,
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
