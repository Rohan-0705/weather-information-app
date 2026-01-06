const axios = require("axios");

const API_KEY = process.env.OPENWEATHER_API_KEY;

exports.getLocation = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: "City is required" });
  }

  try {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    const response = await axios.get(url);

    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ message: "City not found" });
    }

    const { name, lat, lon } = response.data[0];

    return res.json({
      city: name,
      lat,
      lon,
    });
  } catch (error) {
    console.error(
      "Geocoding API error:",
      error.response?.data || error.message
    );
    return res.status(500).json({ message: "Location fetch failed" });
  }
};
