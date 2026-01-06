export const getForecast = async (req, res) => {
  try {
    const { city } = req.query;

    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json`,
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: city,
          days: 5,
        },
      }
    );

    const forecast = response.data.forecast.forecastday.map(day => ({
      date: day.date,
      minTemp: day.day.mintemp_c,
      maxTemp: day.day.maxtemp_c,
      condition: day.day.condition.text,
    }));

    res.json(forecast);
  } catch (error) {
    res.status(500).json({ error: "Forecast fetch failed" });
  }
};
