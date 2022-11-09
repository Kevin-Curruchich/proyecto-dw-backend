const express = require("express");
const router = express.Router();

const {
  addExtraction,
  getRawMaterialFloor,
  getRawMaterialBlock,
} = require("../controllers/extraction");

router.get("/get-raw-material-floor", getRawMaterialFloor);
router.get("/get-raw-material-block", getRawMaterialBlock);
router.post("/post-extraction", addExtraction);
// router.post("/addbank", addBank);

module.exports = router;
