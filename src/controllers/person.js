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
    const { outBinds } = await Person.register(args);
    const { person_token } = outBinds;

    res
      .status(200)
      .json({ message: "User Register Succes!", person_token: person_token });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.loginPerson = async (req, res, next) => {
  const args = {
    email: req.body.email,
    password: bycript.hashSync(req.body.password),
  };

  try {
    const { rows: hashPasswordRow } = await Person.hashPassword(args);
    if (hashPasswordRow) {
      const hasPassword = hashPasswordRow[0]["PASSWORD"];
      if (bycript.compare(args.password, hasPassword)) {
        const { outBinds } = await Person.login(args);
        const { person_token } = outBinds;
        return res
          .status(200)
          .json({ message: "Login Succes!", person_token: person_token });
      }
    }
    res.status(403).json({ message: "Invalid credential" });
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

  try {
    const { rows: PersonData } = await Person.getPersonData(args);
    if (PersonData) {
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
