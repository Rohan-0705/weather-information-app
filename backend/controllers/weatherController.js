import axios from "axios";

export const getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city || city.trim().length < 2) {
      return res.status(400).json({ error: "Invalid city name" });
    }

    const response = await axios.get(
      "https://api.weatherapi.com/v1/current.json",
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: `${city},India`, // ✅ force India
          aqi: "no",
        },
      }
    );

    const location = response.data.location;

    // ✅ country validation
    if (location.country !== "India") {
      return res.status(404).json({ error: "City not found in India" });
    }

    res.json({
  temperature: response.data.current.temp_c,
  condition: response.data.current.condition.text,
  humidity: response.data.current.humidity,
  windSpeed: response.data.current.wind_kph,
  city: response.data.location.name,
  country: response.data.location.country,
});

  } catch (error) {
    if (error.response?.status === 400) {
      return res.status(404).json({ error: "Invalid city name" });
    }
    res.status(500).json({ error: "Weather service unavailable" });
  }
};


export const getForecast = async (req, res) => {
  try {
    const { city } = req.query;

    const response = await axios.get(
      "https://api.weatherapi.com/v1/forecast.json",
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: `${city},India`,
          days: 7,
          aqi: "no",
          alerts: "no",
        },
      }
    );

    const forecast = response.data.forecast.forecastday.map((day) => ({
      date: day.date,
      minTemp: day.day.mintemp_c,
      maxTemp: day.day.maxtemp_c,
      condition: day.day.condition.text,
      icon: day.day.condition.icon,
    }));

    res.json(forecast);
  } catch (error) {
    res.status(500).json({ error: "Forecast fetch failed" });
  }
};
