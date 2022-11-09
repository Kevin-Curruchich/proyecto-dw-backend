const express = require("express");
const router = express.Router();

const {
  getAllDepartments,
  getAllTransportRentalTypes,
  getAllTransportRental,
  getBudget,
  getEmployees,
} = require("../controllers/general");

router.get("/get-departments", getAllDepartments);
router.get("/get-transport-rental-types", getAllTransportRentalTypes);
router.get("/get-all-transport-rental", getAllTransportRental);
router.get("/get-budget", getBudget);
router.get("/get-employees", getEmployees);

module.exports = router;
