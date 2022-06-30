module.exports.infoPerson = (req, res) => {
  res.status(200).json({
    message: "succes",
    data: [
      {
        first_name: req.person.first_name,
        last_name: req.person.last_name,
      },
    ],
  });
};
