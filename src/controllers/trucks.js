const bycript = require("bcryptjs");
const Trucks = require("../models/trucks");
const customId = require("custom-id");

module.exports.getTruckBrands = async (req, res, next) => {
  try {
    const response = await Trucks.getTruckBrands();

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
    const response = await Trucks.getTruckTons();

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
    const response = await Trucks.getAllTrucks();

    res.status(200).json({
      message: "Camiones registrados",
      data: [...response],
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.addTruck = async (req, res, next) => {
  try {
    console.log({ req });
    const response = await Trucks.postNewTruck(req.body);

    res.status(200).json({
      message: "Camion Registrado correctamente",
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
