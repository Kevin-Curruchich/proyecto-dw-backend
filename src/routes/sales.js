const express = require("express");
const router = express.Router();

const { postSales } = require("../controllers/sales");

// router.get("/get-raw-material-floor", getRawMaterialFloor);
// router.get("/get-raw-material-block", getRawMaterialBlock);
router.post("/post-sales", postSales);
// router.post("/addbank", addBank);

module.exports = router;
