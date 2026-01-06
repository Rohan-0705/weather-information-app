import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/api/weather", weatherRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
