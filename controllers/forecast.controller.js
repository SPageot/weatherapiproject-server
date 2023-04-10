require("dotenv").config();
const states = require("../states/states");

const forecast = async (req, res) => {
  if (req.query.location) {
    const userQuery = req.query.location;
    const city = userQuery.split(",")[0];
    const StateAbbrev =
      states[userQuery.split(",")[1].replace(/\s/g, "").toUpperCase()];
    if (StateAbbrev) {
      const userState = StateAbbrev.toLowerCase();

      const forecastDetails = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${userState}&appid=${process.env.WEATHER_API_KEY}`
      ).then((response) => response.json());

      return res.status(200).json({ forecastDetails });
    } else {
      return res.status(404).json("State Not Found");
    }
  } else if (req.query.zip) {
    const userZipQuery = req.query.zip;

    const forecastDetails = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${userZipQuery}&appid=${process.env.WEATHER_API_KEY}`
    ).then((response) => response.json());

    return res.status(200).json({ forecastDetails });
  } else if (req.query.state) {
    const userStateQuery = req.query.state;

    const forecastDetails = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${userStateQuery}&appid=${process.env.WEATHER_API_KEY}`
    ).then((response) => response.json());

    if (forecastDetails.cod != "404") {
      return res.status(200).json({ forecastDetails });
    } else {
      return res.status(404).json("City/State Not Found");
    }
  }
};

module.exports = forecast;
