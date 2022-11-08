const express = require("express");
const router = express.Router();

const {
  getRawMaterialFloor,
  getRawMaterialBlock,
  addTruck,
} = require("../controllers/extraction");

router.get("/get-raw-material-floor", getRawMaterialFloor);
router.get("/get-raw-material-block", getRawMaterialBlock);
// router.post("/addtruck", addTruck);
// router.post("/addbank", addBank);

module.exports = router;
