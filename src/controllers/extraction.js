const bycript = require("bcryptjs");
const Extraction = require("../models/extraction");
const customId = require("custom-id");

module.exports.getRawMaterialFloor = async (req, res, next) => {
  try {
    const response = await Extraction.getRawMaterialFloor();

    res.status(200).json({
      message: "Materias prima piso",
      data: [...response],
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getRawMaterialBlock = async (req, res, next) => {
  try {
    const response = await Extraction.getRawMaterialBlock();

    res.status(200).json({
      message: "Materias prima block",
      data: [...response],
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.addExtraction = async (req, res, next) => {
  try {
    console.log({ req });
    const response = await Extraction.addExtraction(req.body);

    res.status(200).json({
      message: "Camion Registrado correctamente",
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
