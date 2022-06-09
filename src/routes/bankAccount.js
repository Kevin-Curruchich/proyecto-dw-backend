const express = require("express");
const router = express.Router();

const { recodIncome, recordExpense } = require("../controllers/bankAccount");

router.post("/recordincome", recodIncome);
router.post("/recordexpense", recordExpense);

module.exports = router;
