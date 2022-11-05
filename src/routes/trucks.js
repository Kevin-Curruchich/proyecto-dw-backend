const express = require("express");
const router = express.Router();

const {
  getTruckBrands,
  getTruckTons,
  addTruck,
  getAllTrucks,
} = require("../controllers/trucks");

router.get("/gettruckbrands", getTruckBrands);
router.get("/gettrucktons", getTruckTons);
router.get("/get-all-trucks", getAllTrucks);
router.post("/addtruck", addTruck);
// router.post("/addbank", addBank);

module.exports = router;
