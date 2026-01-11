import express from "express";
import {
  getCurrentWeather,
  getForecast,
  getHistoricalWeather,
} from "../controllers/weatherController.js";

const router = express.Router();

router.get("/current", getCurrentWeather);
router.get("/forecast", getForecast);
router.get("/history", getHistoricalWeather);

export default router;
