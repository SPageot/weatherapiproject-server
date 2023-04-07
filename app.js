require("dotenv").config();
const express = require("express");
const cors = require("cors");
const forecast = require("./controllers/forecast.controller");

const PORT = process.env.PORT || 3005;
const app = express();

app.use(cors());

app.get("/forecast", forecast);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
