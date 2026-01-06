const weatherRoutes = require("./routes/weatherRoutes");

const locationRoutes = require("./routes/locationRoutes");


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api", locationRoutes);
app.use("/api", weatherRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
