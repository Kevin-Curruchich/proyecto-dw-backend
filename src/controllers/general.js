const General = require("../models/general");

module.exports.getAllDepartments = async (req, res, next) => {
  try {
    const response = await General.getAllDepartments();

    res.status(200).json({
      message: "departamentos",
      data: [...response],
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getAllTransportRentalTypes = async (req, res, next) => {
  try {
    const response = await General.getAllTransportRentalTypes();

    res.status(200).json({
      message: "departamentos",
      data: [...response],
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
