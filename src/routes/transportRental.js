const express = require("express");
const router = express.Router();

const {
  // getTruckBrands,
  // getTruckTons,
  // getAllTrucks,
  postTransportRental,
} = require("../controllers/transportRental");

// router.get("/gettruckbrands", getTruckBrands);
// router.get("/gettrucktons", getTruckTons);
// router.get("/get-all-trucks", getAllTrucks);
router.post("/post-transport-rental", postTransportRental);
// router.post("/addbank", addBank);

module.exports = router;
