// const oracledb = require("oracledb");
const sql = require("../utils/mysql");

module.exports.postSales = ({
  extraccionMateriaPrima,
  empleadoVenta,
  monotMinimo,
  notas,
}) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO ALL_SALES(id_extraccion,id_personal, precio, notas ) VALUES (${extraccionMateriaPrima}, ${empleadoVenta}, ${monotMinimo} ,'${notas}');`,
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

module.exports.getExtractionMaterialBlock = () => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT EX.notas, EX.id_extraccion, EX.precio, MP.id_materias_prima, MP.materia_prima_label 
       FROM EXTRACCION EX INNER JOIN MATERIAS_PRIMA MP ON EX.id_materias_prima = MP.id_materias_prima 
       WHERE MP.id_tipo_materia_prima = 1;`,
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

module.exports.getExtractionMaterialPiso = () => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT EX.notas, EX.id_extraccion, EX.precio, MP.id_materias_prima, MP.materia_prima_label 
       FROM EXTRACCION EX INNER JOIN MATERIAS_PRIMA MP ON EX.id_materias_prima = MP.id_materias_prima 
       WHERE MP.id_tipo_materia_prima = 2;`,
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

module.exports.getAllSales = () => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT ALS.id_sale, ALS.notas, ALS.precio, MP.materia_prima_label, TMP.tipo_matera_prima_label, TMP.id_tipo_materia_prima
      FROM ALL_SALES ALS INNER JOIN EXTRACCION EX ON ALS.id_extraccion = EX.id_extraccion 
      INNER JOIN MATERIAS_PRIMA MP ON EX.id_materias_prima = MP.id_materias_prima 
      INNER JOIN TIPOS_MATERIA_PRIMA TMP ON TMP.id_tipo_materia_prima = MP.id_tipo_materia_prima;`,
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
