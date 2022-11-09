const express = require("express");
const app = express();
const cors = require("cors");
const cookies = require("cookie-parser");
// const oracle = require("./src/utils/oracle");
const { server } = require("./src/config/config");
const guard = require("./src/guard/guard");
const personInfo = require("./src/routes/person_info");
const trucks = require("./src/routes/trucks");
const extraction = require("./src/routes/extraction");
const sales = require("./src/routes/sales");
const transportRental = require("./src/routes/transportRental");
const general = require("./src/routes/general");
const personRoutes = require("./src/routes/person");
const bankAccountRoutes = require("./src/routes/bankAccount");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookies());

app.use(personRoutes);

// app.use(guard);
app.use(personInfo);
app.use(bankAccountRoutes);
app.use(trucks);
app.use(extraction);
app.use(sales);
app.use(transportRental);
app.use(general);

app.listen(server.port, () => {
  console.log(`Server running on port: http://localhost:${server.port}`);
});

// oracle
//   .start()
//   .then(() => {
//     console.log("Oracle DB connected!");
//     app.listen(server.port, () => {
//       console.log(`Server running on port: http://localhost:${server.port}`);
//     });
//   })
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
