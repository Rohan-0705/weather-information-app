const axios = require("axios");

const API_KEY = process.env.OPENWEATHER_API_KEY;

exports.getCurrentWeather = async (req, res) => {
  const formatted = dailyForecast.map(item => ({
  date: item.dt_txt.split(" ")[0],
  minTemp: item.main.temp_min,
  maxTemp: item.main.temp_max,
  condition: item.weather[0].main,
  icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
}));


  if (!lat || !lon) {
    return res.status(400).json({ message: "Latitude and longitude required" });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(url);

    const data = response.data;

    // Simple weather summary logic
    let summary = "Normal weather conditions";
    if (data.main.temp > 30) summary = "Hot weather, stay hydrated";
    if (data.weather[0].main === "Rain") summary = "Not ideal for travel";
    if (data.weather[0].main === "Clear") summary = "Good weather for travel";

    res.json({
  temperature: data.main.temp,
  condition: data.weather[0].description,
  humidity: data.main.humidity,
  windSpeed: data.wind.speed,
  summary,
  icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
});


  } catch (error) {
    console.error(
      "Current weather error:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Weather fetch failed" });
  }
};

exports.getForecast = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ message: "Latitude and longitude required" });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(url);

    // Pick one forecast per day (12:00 PM)
    const dailyForecast = response.data.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    );

    const formatted = dailyForecast.map(item => ({
      date: item.dt_txt.split(" ")[0],
      minTemp: item.main.temp_min,
      maxTemp: item.main.temp_max,
      condition: item.weather[0].main
    }));

    res.json(formatted);

  } catch (error) {
    console.error(
      "Forecast error:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Forecast fetch failed" });
  }
};

