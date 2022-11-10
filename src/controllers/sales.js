const bycript = require("bcryptjs");
const Sales = require("../models/sales");
const customId = require("custom-id");

module.exports.postSales = async (req, res, next) => {
  try {
    console.log({ req });
    const response = await Sales.postSales(req.body);

    res.status(200).json({
      message: "Venta registrado correctamente",
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getExtractionMaterialBlock = async (req, res, next) => {
  try {
    const response = await Sales.getExtractionMaterialBlock();

    res.status(200).json({
      message: "Materias prima block",
      data: [...response],
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getExtractionMaterialPiso = async (req, res, next) => {
  try {
    const response = await Sales.getExtractionMaterialPiso();

    res.status(200).json({
      message: "Materias prima piso",
      data: [...response],
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getAllSales = async (req, res, next) => {
  try {
    const response = await Sales.getAllSales();

    res.status(200).json({
      message: "Todas las ventas",
      data: [...response],
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
