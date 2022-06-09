const oracledb = require("oracledb");
const { pool } = require("../utils/oracle");

module.exports.recordIncome = ({
  bankAccount,
  category,
  amount,
  description,
}) => {
  const bindings = {
    bankAccount: bankAccount,
    category: category,
    amount: amount,
    description: description,
    statusTransaction: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };

  const SQL_RECORD_INCOME = `
                            DECLARE
                              statusTransaction VARCHAR2(10);
                            BEGIN
                              :statusTransaction:=RECORD_INCOME(:bankAccount, :category, :amount, :description);	
                            END;`;

  return pool(SQL_RECORD_INCOME, bindings);
};

module.exports.recordExpense = ({
  bankAccount,
  category,
  amount,
  description,
}) => {
  const bindings = {
    bankAccount: bankAccount,
    category: category,
    amount: amount,
    description: description,
    statusTransaction: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };

  const SQL_RECORD_INCOME = `
                            DECLARE
                              statusTransaction VARCHAR2(10);
                            BEGIN
                              :statusTransaction:=RECORD_EXPENSE(:bankAccount, :category, :amount, :description);	
                            END;`;

  return pool(SQL_RECORD_INCOME, bindings);
};

/*
  https://github.com/oracle/node-oracledb/blob/main/examples/plsqlfunc.js#L73
  https://oracle.github.io/node-oracledb/
  https://github.com/oracle/node-oracledb/tree/main/examples
*/
