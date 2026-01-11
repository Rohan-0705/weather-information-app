import axios from "axios";

/* ===================== CURRENT WEATHER ===================== */
export const getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.query;

    const response = await axios.get(
      "https://api.weatherapi.com/v1/current.json",
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: `${city},India`, // ✅ COUNTRY FIX
        },
      }
    );

    const data = response.data;

    res.json({
      city: data.location.name,
      current: {
        temp_c: data.current.temp_c,
        humidity: data.current.humidity,
        wind_kph: data.current.wind_kph,
        condition: data.current.condition.text,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
};

/* ===================== FORECAST ===================== */
export const getForecast = async (req, res) => {
  try {
    const { city } = req.query;

    const response = await axios.get(
      "https://api.weatherapi.com/v1/forecast.json",
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: `${city},India`, // ✅ COUNTRY FIX (IMPORTANT)
          days: 7,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Forecast unavailable" });
  }
};

/* ===================== HISTORICAL ===================== */
export const getHistoricalWeather = async (req, res) => {
  try {
    const { city, date } = req.query;

    const response = await axios.get(
      "https://api.weatherapi.com/v1/history.json",
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: `${city},India`, // ✅ COUNTRY FIX
          dt: date,
        },
      }
    );

    const day = response.data.forecast.forecastday[0].day;

    res.json({
      date,
      condition: day.condition.text,
      maxTemp: day.maxtemp_c,
      minTemp: day.mintemp_c,
      rainChance: day.daily_chance_of_rain,
    });
  } catch {
    res.status(500).json({ error: "Historical weather unavailable" });
  }
};
