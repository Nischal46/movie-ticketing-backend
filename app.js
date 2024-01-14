const express = require("express");
const app = express();
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config({path: "./.env"})

const filimRoute = require("./route/filimRoute");
const userRoute = require("./route/userRoute");
const handleGlobalError = require('./controller/errorController')

const DB = require("./database/dbconnection");
const AppError = require("./reusable/handleAppError");


DB.databaseConnection()
  .then(() => console.log("Database Connection Established Successfully"))
  .catch((err) => console.log("Database Connection Failed", err));

app.use(cors());

app.use(express.json());

app.use("/api/v1/filim", filimRoute);
app.use("/api/v1/user", userRoute);

app.use('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404))
})


app.use(handleGlobalError);

app.listen(3000, function () {
  console.log("App is running in port");
});
