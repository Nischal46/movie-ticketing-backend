const express = require("express");
const app = express();

const filimRoute = require("./route/filimRoute");
const userRoute = require("./route/userRoute");

const DB = require("./database/dbconnection");

app.use(express.json());

DB.databaseConnection()
  .then(() => console.log("Database Connection Established Successfully"))
  .catch((err) => console.log("Database Connection Failed", err));

app.use("/api/v1/filim", filimRoute);
app.use("/api/v1/user", userRoute);

app.listen(8000, function () {
  console.log("App is running in port");
});
