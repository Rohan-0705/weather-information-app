import axios from "axios";

export const getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.query;

    const response = await axios.get(
      "https://api.weatherapi.com/v1/current.json",
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: `${city},India`,

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


export const getForecast = async (req, res) => {
  try {
    const { city } = req.query;

    const response = await axios.get(
      "https://api.weatherapi.com/v1/forecast.json",
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: city,
          days: 3,
        },
      }
    );

    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Forecast unavailable" });
  }
};

export const getHistoricalWeather = async (req, res) => {
  try {
    const { city, date } = req.query;

    const response = await axios.get(
      "https://api.weatherapi.com/v1/history.json",
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: `${city},India`,
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
