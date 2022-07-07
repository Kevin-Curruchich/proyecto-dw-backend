const oracledb = require("oracledb");
const path = require("path");
const { oracleConfig } = require("../config/config");

//const oracleClient = path.join("C:", "Oracle", "bin");

//oracledb.initOracleClient({ libDir: oracleClient });

//abrimos la base de datos
module.exports.start = async () => {
  await oracledb.createPool(oracleConfig);
};

//cerramos la DB
module.exports.close = async () => {
  await oracledb.getPool().close(0);
};

module.exports.pool = async (statement, binds = [], opts = {}) => {
  let conn;
  let result = [];
  //formate en el que manejamos los responses, nos responde con un objeto
  opts.outFormat = oracledb.OBJECT;
  try {
    //nos conectamos
    conn = await oracledb.getConnection();
    //ejecute las instruccion con los binds y opts
    result = await conn.execute(statement, binds, opts);
    //retorne el resultado de la instruccion
    return result;
  } catch (error) {
    console.error(error);
    throw error;
    //siempre termina cerrando la coneccion
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
};
