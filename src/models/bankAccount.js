// const oracledb = require("oracledb");
// const { pool } = require("../utils/oracle");

//Select de las cuentas que tiene el usuario mediante el token
module.exports.getBankAccounts = ({ cookietoken }) => {
  const bindings = {
    token: cookietoken,
  };

  const SQL_GET_BANK_ACCOUNTS = `SELECT BANK_ACCOUNT, B.BANK_NAME, CURRENCIE_SYMBOL AS CURRENCIE, PERSON_ACCOUNT, AMOUNT 
                                FROM BANK_ACCOUNT BA 
                                INNER JOIN PERSON P ON BA.PERSON_ACCOUNT = P.PERSON 
                                INNER JOIN CURRENCIE C ON BA.CURRENCIE = C.CURRENCIE
                                INNER JOIN BANK B ON BA.BANK_NAME  = B.BANK  
                                WHERE P.PERSON_TOKEN=:token`;

  return pool(SQL_GET_BANK_ACCOUNTS, bindings);
};

//Data de la base de datos
module.exports.getBankAccountData = ({ bankAccount }) => {
  const bindings = {
    bankAccount: bankAccount,
  };

  const SQL_GET_BANK_ACCOUNT = `SELECT * FROM BANK_ACCOUNT  WHERE BANK_ACCOUNT = :bankAccount`;

  return pool(SQL_GET_BANK_ACCOUNT, bindings);
};

//registro un nuevo ingreso
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

  //Ejecuto una funcion y le paso la cantidad del dinero
  const SQL_RECORD_INCOME = `
                            DECLARE
                              statusTransaction VARCHAR2(10);
                            BEGIN
                              :statusTransaction:=RECORD_INCOME(:bankAccount, :category, :amount, :description);	
                            END;`;

  return pool(SQL_RECORD_INCOME, bindings);
};

//registro un nuevo egreso
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

  //ejecuto la funcion de registrar egreso, me resta el dinero de la cuenta
  const SQL_RECORD_INCOME = `
                            DECLARE
                              statusTransaction VARCHAR2(10);
                            BEGIN
                              :statusTransaction:=RECORD_EXPENSE(:bankAccount, :category, :amount, :description);	
                            END;`;

  return pool(SQL_RECORD_INCOME, bindings);
};

//transferencia de dinero entre cuentas
module.exports.transferMoney = ({
  bankAccountOut,
  bankAccountIn,
  amountOut,
  amountIn,
  description,
}) => {
  const bindings = {
    bankAccountOut: bankAccountOut,
    bankAccountIn: bankAccountIn,
    amountOut: amountOut,
    amountIn: amountIn,
    description: description,
    statusTransaction: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };

  //Ejecuto funcion mandandole a que cuenta le quito y a que cuenta le sumo
  //Enviando las cantidades ya con el cambio de dinero correspondiente
  const SQL_TRANFER_MONEY = `
                              DECLARE
                                statusTransaction VARCHAR2(10);
                              BEGIN
                                :statusTransaction:=TRANSFER_MONEY(:bankAccountOut, :bankAccountIn, :amountOut, :amountIn, :description);	
                              END;
                              `;

  return pool(SQL_TRANFER_MONEY, bindings);
};

//Consulta del simbolo de la moneda que tiene la cuenta, para hacer el cambio
module.exports.getCurrencieSymbol = ({ bankAccount }) => {
  const bindings = {
    bankAccount: bankAccount,
  };

  const SQL_CURRENCIE_SYMBOL = `SELECT CURRENCIE_SYMBOL FROM CURRENCIE 
                                WHERE CURRENCIE = (SELECT CURRENCIE FROM BANK_ACCOUNT WHERE BANK_ACCOUNT = :bankAccount)`;

  return pool(SQL_CURRENCIE_SYMBOL, bindings);
};

module.exports.getBankNames = () => {
  const SQL_BET_BANK_NAMES = `SELECT BANK AS VALUE, BANK_NAME AS TEXT FROM BANK`;

  return pool(SQL_BET_BANK_NAMES, {});
};

module.exports.getCurrencies = () => {
  SQL_GET_CURRENCIES = `SELECT CURRENCIE AS VALUE, CURRENCIE_SYMBOL AS TEXT FROM CURRENCIE`;
  return pool(SQL_GET_CURRENCIES, {});
};

module.exports.getRecordTypes = () => {
  SQL_GET_RECORD_TYPES = `SELECT RECORD_TYPE AS VALUE, RECORD_TYPE_NAME AS TEXT FROM RECORD_TYPE`;
  return pool(SQL_GET_RECORD_TYPES, {});
};

module.exports.getCategoriesByType = ({ categoryType }) => {
  const bindings = { categoryType: categoryType };
  SQL_CATEGORY_BY_TYPE = `SELECT CATEGORY AS VALUE, CATEGORY_NAME AS TEXT FROM CATEGORY WHERE CATEGORY_TYPE = :categoryType`;
  return pool(SQL_CATEGORY_BY_TYPE, bindings);
};

module.exports.getRecordHystory = ({ cookietoken }) => {
  const bindings = { cookietoken: cookietoken };

  const SQL_GET_RECORD_HISTORY = ` 
                              SELECT RH.RECORD_HISTORY, RH.RECORD_TYPE, RH.BANK_ACCOUNT, RH.AMOUNT, RH.DESCRIPTION, RH.RECORD_DATE, RH.CATEGORY, C.CURRENCIE_SYMBOL 
                                FROM RECORD_HISTORY RH
                                INNER JOIN BANK_ACCOUNT BA ON RH.BANK_ACCOUNT = BA.BANK_ACCOUNT
                                INNER JOIN CURRENCIE C ON BA.CURRENCIE = C.CURRENCIE 
                                INNER JOIN PERSON P ON BA.PERSON_ACCOUNT = P.PERSON  
                                WHERE P.PERSON_TOKEN=:cookietoken`;
  return pool(SQL_GET_RECORD_HISTORY, bindings);
};

module.exports.getRecordHystoryByType = ({ cookietoken, recordType }) => {
  const bindings = { cookietoken: cookietoken, recordType: recordType };

  const SQL_GET_RECORD_HISTORY_BY_TYPE = ` 
                              SELECT RH.RECORD_HISTORY, RH.RECORD_TYPE, RH.BANK_ACCOUNT, RH.AMOUNT, RH.DESCRIPTION, RH.RECORD_DATE, RH.CATEGORY, C.CURRENCIE_SYMBOL 
                                FROM RECORD_HISTORY RH
                                INNER JOIN BANK_ACCOUNT BA ON RH.BANK_ACCOUNT = BA.BANK_ACCOUNT
                                INNER JOIN CURRENCIE C ON BA.CURRENCIE = C.CURRENCIE 
                                INNER JOIN PERSON P ON BA.PERSON_ACCOUNT = P.PERSON  
                                WHERE P.PERSON_TOKEN=:cookietoken AND RH.RECORD_TYPE = :recordType`;
  return pool(SQL_GET_RECORD_HISTORY_BY_TYPE, bindings);
};

/*
  https://github.com/oracle/node-oracledb/blob/main/examples/plsqlfunc.js#L73
  https://oracle.github.io/node-oracledb/
  https://github.com/oracle/node-oracledb/tree/main/examples
*/
