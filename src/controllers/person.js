const bycript = require("bcryptjs");
const Person = require("../models/person");
const customId = require("custom-id");

module.exports.registerPerson = async (req, res, next) => {
  const args = {
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };

  try {
    const response = await Person.register(args);

    res.status(200).json({
      message: "User Register Succes!",
      data: {
        first_name: args.first_name,
        last_name: args.last_name,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.loginPerson = async (req, res, next) => {
  const args = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const result = await Person.hashPassword(args);
    console.log({ result });
    if (result.length) {
      const hasPassword = result[0]["password"];
      console.log({ hasPassword });
      if (bycript.compareSync(args.password, hasPassword)) {
        // const { outBinds } = await Person.login(args);
        const { first_name, last_name } = result[0];
        console.log({ first_name, last_name });
        return res.status(200).json({
          message: "Login Succes!",
          data: {
            first_name,
            last_name,
          },
        });
      }
    }
    res
      .status(403)
      .clearCookie("auth_token", {
        sameSite: "none",
        secure: true,
      })
      .json({ message: "Invalid credential" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.addBank = async (req, res) => {
  let args = {
    cookieToken: req.body.cookieToken,
    bankName: req.body.bankName,
    amount: req.body.amount,
    currencie: req.body.currencie,
  };

  if (args.amount > 1 && args.amount < 10)
    return res.status(403).json({
      message: "Amount min 10",
    });

  try {
    const { rows: PersonData } = await Person.getPersonData(args);
    if (PersonData.length > 0) {
      const personData = PersonData[0];
      args = {
        ...args,
        bankAccount: customId({
          email: personData["EMAIL"],
          bankName: args.bankName,
          date: new Date(),
          randomLength: 2,
        }),
        personAccount: personData["PERSON"],
      };
      const { outBinds } = await Person.addBankAccount(args);
      const { addDate } = outBinds;
      return res.json({
        message: "You register a new bank!",
        details: {
          person: `${personData["FIRST_NAME"]} ${personData["LAST_NAME"]}`,
          bank: args.bankName,
          amount: args.amount,
          currencie: args.currencie,
        },
        addDate: addDate,
      });
    }
    res.status(400).json({ message: "Bad Request" });
  } catch (error) {
    res.json({ message: error });
  }
};
