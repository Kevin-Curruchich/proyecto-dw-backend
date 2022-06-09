const BankAccount = require("../models/bankAccount");

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
      res.json({ recordCompleted: true, message: "You register a new Income" });
    } else if (statusTransaction === "rollback") {
      res.json({
        recordCompleted: false,
        message: "Check your data and try again",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

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
      res.json({
        recordCompleted: true,
        message: "You register a new Expense",
      });
    } else if (statusTransaction === "rollback") {
      res.json({
        recordCompleted: false,
        message: "Check your data and try again",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
