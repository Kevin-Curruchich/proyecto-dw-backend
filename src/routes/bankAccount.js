const express = require("express");
const router = express.Router();

const {
  recodIncome,
  recordExpense,
  transferMoney,
  getBankAccounts,
  getBankData,
  getBankNames,
  getCurrencies,
  getRecordType,
  getCategories,
  getRecordHistory,
  getRecordHistoryByType,
} = require("../controllers/bankAccount");

router.post("/recordincome", recodIncome);
router.post("/recordexpense", recordExpense);
router.post("/transfermoney", transferMoney);
router.get("/getbankaccounts/:cookietoken", getBankAccounts);
router.get("/getbankdata", getBankData);
router.get("/getbanknames", getBankNames);
router.get("/getcurrencies", getCurrencies);
router.get("/getrecordtypes", getRecordType);
router.get("/getcategories/:category", getCategories);
router.get("/getrecordhistory/:cookietoken/", getRecordHistory);
router.get(
  "/getrecordhistory/:cookietoken/:recordType",
  getRecordHistoryByType
);

module.exports = router;
