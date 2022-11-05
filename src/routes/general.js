const express = require("express");
const router = express.Router();

const {
  getAllDepartments,
  getAllTransportRentalTypes,
} = require("../controllers/general");

router.get("/get-departments", getAllDepartments);
router.get("/get-transport-rental-types", getAllTransportRentalTypes);

module.exports = router;
