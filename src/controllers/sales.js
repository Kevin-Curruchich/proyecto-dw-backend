const bycript = require("bcryptjs");
const Sales = require("../models/sales");
const customId = require("custom-id");

module.exports.postSales = async (req, res, next) => {
  try {
    console.log({ req });
    const response = await Sales.postSales(req.body);

    res.status(200).json({
      message: "Extraccion registrado correctamente",
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
