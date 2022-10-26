const axios = require("axios");
// const { errorOnConcurrentExecute } = require("oracledb");
const { api_exchange } = require("../config/config");
const BankAccount = require("../models/bankAccount");

//Reviso que cuentas de banco tiene el usuario con el token
module.exports.getBankAccounts = async (req, res) => {
  const args = {
    cookietoken: req.params.cookietoken,
  };

  try {
    const { rows: bankAccounts } = await BankAccount.getBankAccounts(args);
    if (bankAccounts.length > 0) {
      return res.status(200).json({
        message: "All your bank accounts",
        bankAccounts: bankAccounts,
      });
    }
    res.json({ message: "No bank register" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//Informacion del banco
module.exports.getBankData = async (req, res) => {
  const args = {
    bankAccount: req.body.bankAccount,
  };

  try {
    const { rows } = await BankAccount.getBankAccountData(args);
    res.json({ message: "Your bank account data", data: rows });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//registro un nuevo ingreso
module.exports.recodIncome = async (req, res, next) => {
  const args = {
    bankAccount: req.body.bankAccount,
    category: req.body.category,
    amount: req.body.amount,
    description: req.body.description,
  };
  try {
    const { outBinds } = await BankAccount.recordIncome(args);
    const { statusTransaction } = outBinds;
    if (statusTransaction === "commit") {
      res
        .status(201)
        .json({ recordCompleted: true, message: "You register a new Income" });
    } else if (statusTransaction === "rollback") {
      res.status(403).json({
        recordCompleted: false,
        message: "Check your data and try again",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//registro un nuevo egreso
module.exports.recordExpense = async (req, res, next) => {
  const args = {
    bankAccount: req.body.bankAccount,
    category: req.body.category,
    amount: req.body.amount,
    description: req.body.description,
  };
  try {
    const { outBinds } = await BankAccount.recordExpense(args);
    const { statusTransaction } = outBinds;
    if (statusTransaction === "commit") {
      return res.status(201).json({
        recordCompleted: true,
        message: "You register a new Expense",
      });
    }
    res.status(403).json({
      recordCompleted: false,
      message: "Check your data and try again",
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//transfiero dinero entre cuentas ya con el cambio de monedas
module.exports.transferMoney = async (req, res) => {
  const apiUrl = "https://api.apilayer.com/exchangerates_data/convert";

  let args = {
    bankAccountOut: req.body.bankAccountOut,
    bankAccountIn: req.body.bankAccountIn,
    amountOut: req.body.amountOut,
    description: req.body.description,
  };

  //no puedo transferir entre la misma cuenta
  if (args.bankAccountOut === args.bankAccountIn) {
    return res.status(403).json({
      transferCompleted: false,
      message: "You cant transfer between same account",
    });
  }

  //Comienzo a hacer la transferencia
  try {
    //Hago la consulta de que moneda tienen las cuentas
    const { rows: currencieOut } = await BankAccount.getCurrencieSymbol({
      bankAccount: args.bankAccountOut,
    });

    const { rows: currencieIn } = await BankAccount.getCurrencieSymbol({
      bankAccount: args.bankAccountIn,
    });

    const currSymbolOut = currencieOut[0]["CURRENCIE_SYMBOL"];
    const currSymbolIn = currencieIn[0]["CURRENCIE_SYMBOL"];

    //verifico si las cuentas tienen la misma moneda
    if (currSymbolOut === currSymbolIn) {
      //agrego la misma cantidad de ingreso y egreso a los argumentos
      args.amountIn = args.amountOut;
      const { outBinds } = await BankAccount.transferMoney(args);
      const { statusTransaction } = outBinds;

      //Si hago commit a la transaccion mando la respuesta
      if (statusTransaction === "commit") {
        return res.status(200).json({
          transferCompleted: true,
          message: "You register a new Transfer",
          transferData: {
            bankAccountOut: args.bankAccountOut,
            bankAccountIn: args.bankAccountIn,
            [`Expense to:${args.bankAccountOut}`]: `${args.amountOut} ${currSymbolOut}`,
            [`Income to:${args.bankAccountIn}`]: `${args.amountIn} ${currSymbolIn}`,
            description: args.description,
          },
        });
      } else {
        //No se termina la transaccion
        res.status(403).json({
          transferCompleted: false,
          message: "Check your data and try again",
        });
      }
    }

    //Si las cuentas no tienen la misma moneda hago el cambio
    const { data: exchange } = await axios.get(apiUrl, {
      headers: {
        apikey: api_exchange.api_key,
      },
      params: {
        to: currSymbolIn,
        from: currSymbolOut,
        amount: args.amountOut,
      },
    });

    args.amountIn = exchange.result;
    const { outBinds } = await BankAccount.transferMoney(args);
    const { statusTransaction } = outBinds;

    //Si hago commit a la transaccion mando la respuesta
    if (statusTransaction === "commit") {
      return res.status(200).json({
        transferCompleted: true,
        message: "You register a new Transfer",
        transferData: {
          bankAccountOut: args.bankAccountOut,
          bankAccountIn: args.bankAccountIn,
          [`Expense to:${args.bankAccountOut}`]: `${args.amountOut} ${currSymbolOut}`,
          [`Income to:${args.bankAccountIn}`]: `${args.amountIn} ${currSymbolIn}`,
          description: args.description,
        },
      });
    } else {
      //No se termina la transaccion
      res.status(403).json({
        transferCompleted: false,
        message: "Check your data and try again",
      });
    }

    //capturo el error
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getBankNames = async (req, res) => {
  try {
    const { rows: nameBanks } = await BankAccount.getBankNames();
    res.status(200).json(nameBanks);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getCurrencies = async (req, res) => {
  try {
    const { rows: currencies } = await BankAccount.getCurrencies();
    res.status(200).json(currencies);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getRecordType = async (req, res) => {
  try {
    const { rows: recordTypes } = await BankAccount.getRecordTypes();
    res.status(200).json(recordTypes);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getCategories = async (req, res) => {
  const args = {
    categoryType: req.params.category,
  };
  try {
    const { rows: categoryByType } = await BankAccount.getCategoriesByType(
      args
    );
    res.status(200).json(categoryByType);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getRecordHistory = async (req, res) => {
  const args = {
    cookietoken: req.params.cookietoken,
  };
  try {
    const { rows: recordHistory } = await BankAccount.getRecordHystory(args);
    res.status(200).json({ message: "Your records", data: recordHistory });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getRecordHistoryByType = async (req, res) => {
  const args = {
    cookietoken: req.params.cookietoken,
    recordType: req.params.recordType,
  };
  try {
    const { rows: recordHistory } = await BankAccount.getRecordHystoryByType(
      args
    );
    res.status(200).json({ message: "Your records", data: recordHistory });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
