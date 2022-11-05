// const oracledb = require("oracledb");
const sql = require("../utils/mysql");
const bycript = require("bcryptjs");
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

module.exports.addBankAccount = ({
  bankAccount,
  bankName,
  personAccount,
  amount,
  currencie,
}) => {
  const bindings = {
    bankAccount: bankAccount,
    bankName: bankName,
    personAccount: personAccount,
    amount: amount,
    currencie: currencie,
    addDate: { type: oracledb.DATE, dir: oracledb.BIND_OUT },
  };

  const SQL_ADDBANKACCOUNT = `INSERT INTO BANK_ACCOUNT(BANK_ACCOUNT, BANK_NAME, PERSON_ACCOUNT, AMOUNT, CURRENCIE, ADD_DATE, MOD_DATE)
                              VALUES (:bankAccount, :bankName, :personAccount, :amount, :currencie, SYSDATE, SYSDATE)
                              RETURNING ADD_DATE INTO :addDate`;

  // return pool(SQL_ADDBANKACCOUNT, bindings, { autoCommit: true });
};
