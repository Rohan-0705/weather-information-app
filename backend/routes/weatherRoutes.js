const express = require("express");
const {
  getCurrentWeather,
  getForecast
} = require("../controllers/weatherController");

const router = express.Router();

// GET /api/weather/current?lat=&lon=
router.get("/weather/current", getCurrentWeather);

// GET /api/weather/forecast?lat=&lon=
router.get("/weather/forecast", getForecast);

module.exports = router;
