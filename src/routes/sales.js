const express = require("express");
const router = express.Router();

const {
  postSales,
  getExtractionMaterialBlock,
  getExtractionMaterialPiso,
  getAllSales,
} = require("../controllers/sales");

// router.get("/get-raw-material-floor", getRawMaterialFloor);
router.get("/get-extraction-material-block", getExtractionMaterialBlock);
router.get("/get-extraction-material-piso", getExtractionMaterialPiso);
router.get("/get-all-sales", getAllSales);
router.post("/post-sales", postSales);
// router.post("/addbank", addBank);

module.exports = router;
