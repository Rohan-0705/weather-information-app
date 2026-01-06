# 🌦️ Weather Information App (MERN + Open APIs)

## 📌 Overview
A MERN stack based Weather Information App that allows users to search for a city and view current weather conditions along with a 5–7 day forecast using OpenWeather APIs.

---

## 🧰 Tech Stack
- Frontend: React (Vite)
- Backend: Node.js, Express
- APIs: OpenWeather Geocoding API, OpenWeather Weather API
- Styling: CSS
- Database: ❌ Not used
- Authentication: ❌ Not used

---

## 🚀 Features
- Search weather by city name
- Convert city name to latitude & longitude (backend)
- Display current weather:
  - Temperature (°C)
  - Weather condition
  - Humidity
  - Wind speed
- Display 5–7 day weather forecast
- Weather summary message
- Error handling for invalid city names
- API keys secured using `.env`

---

## 🔌 Backend APIs
- `GET /api/location?city=`
- `GET /api/weather/current?lat=&lon=`
- `GET /api/weather/forecast?lat=&lon=`

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Rohan-0705/weather-information-app.git
cd weather-information-app
