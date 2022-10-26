// const oracledb = require("oracledb");
const sql = require("../utils/mysql");
const bycript = require("bcryptjs");
// const { pool } = require("../utils/oracle");

module.exports.register = ({ email, password, first_name, last_name }) => {
  password = bycript.hashSync(password, 8);

  // const bindings = {
  //   email,
  //   password,
  //   first_name,
  //   last_name,
  //   person_token: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  // };

  sql.query(
    `INSERT INTO PERSONAL (id_personal, P_nombre, P_apellido, P_DPI, P_edad, P_nit, P_telefono) values `
  );
  // const SQL_REGISTER_PERSON = `INSERT INTO PERSON(PERSON, EMAIL,PASSWORD, PERSON_TOKEN, FIRST_NAME,LAST_NAME)
  //                               VALUES(SQ_PERSON.NEXTVAL, :email, :password, API_TOKEN(TO_CHAR(SYSDATE, 'DD-MM-YYYY HH24:MI:SS')||:password),:first_name, :last_name)
  //                               RETURNING PERSON_TOKEN INTO :person_token`;

  // return pool(SQL_REGISTER_PERSON, bindings, { autoCommit: true });
};

module.exports.hashPassword = ({ email }) => {
  const bindings = {
    email,
  };

  const SQL_HASHPASSWORD = `SELECT PASSWORD FROM PERSON WHERE EMAIL=:email`;

  // return pool(SQL_HASHPASSWORD, bindings);
};

module.exports.login = ({ email, password }) => {
  const bindings = {
    email,
    password,
    person_token: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    first_name: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    last_name: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };

  const SQL_LOGIN_PERSON = `UPDATE PERSON
                            SET PERSON_TOKEN =API_TOKEN(TO_CHAR(SYSDATE, 'DD-MM-YYYY HH24:MI:SS')||:password),
                            MOD_DATE =SYSDATE
                            WHERE EMAIL=:email
                            RETURNING PERSON_TOKEN, FIRST_NAME, LAST_NAME INTO :person_token, :first_name, :last_name`;

  // return pool(SQL_LOGIN_PERSON, bindings, { autoCommit: true });
};

module.exports.getPersonData = ({ cookieToken }) => {
  const bindings = {
    token: cookieToken,
  };
  const SQL_GETPERSONDATA = `SELECT PERSON, EMAIL, FIRST_NAME, LAST_NAME FROM PERSON WHERE PERSON_TOKEN=:token`;

  // return pool(SQL_GETPERSONDATA, bindings);
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
