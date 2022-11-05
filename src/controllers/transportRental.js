const bycript = require("bcryptjs");
const TransportRental = require("../models/transportRental");
const customId = require("custom-id");

module.exports.getTruckBrands = async (req, res, next) => {
  try {
    const response = await TransportRental.getTruckBrands();

    res.status(200).json({
      message: "Marca de camiones",
      data: [...response],
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getTruckTons = async (req, res, next) => {
  try {
    const response = await TransportRental.getTruckTons();

    res.status(200).json({
      message: "Toneladas de camiones",
      data: [...response],
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getAllTrucks = async (req, res, next) => {
  try {
    const response = await TransportRental.getAllTrucks();

    res.status(200).json({
      message: "Camiones registrados",
      data: [...response],
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.postTransportRental = async (req, res, next) => {
  try {
    console.log({ req });
    const response = await TransportRental.postTransportRental(req.body);

    res.status(200).json({
      message: "Alquieler registrado",
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
