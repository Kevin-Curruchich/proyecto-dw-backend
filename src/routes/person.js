const express = require("express");
const router = express.Router();

const {
  registerPerson,
  loginPerson,
  addBank,
} = require("../controllers/person");

router.post("/register", registerPerson);
router.post("/login", loginPerson);
router.post("/addbank", addBank);

module.exports = router;
