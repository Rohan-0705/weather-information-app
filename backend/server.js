import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes.js";

dotenv.config();

const app = express();

/* ✅ CORS – allow frontend & testing */
app.use(
  cors({
    origin: "*", // allow all origins (safe for now)
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

app.use("/api/weather", weatherRoutes);

/* ✅ Use Render-provided port */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
