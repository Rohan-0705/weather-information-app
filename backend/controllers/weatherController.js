import axios from "axios";

export const getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.query;

    const response = await axios.get(
      "https://api.weatherapi.com/v1/current.json",
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: city,
          aqi: "no",
        },
      }
    );

    res.json({
      temperature: response.data.current.temp_c,
      condition: response.data.current.condition.text,
      humidity: response.data.current.humidity,
      windSpeed: response.data.current.wind_kph,
    });
  } catch (error) {
    res.status(500).json({ error: "Weather fetch failed" });
  }
};
