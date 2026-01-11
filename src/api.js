import axios from "axios";

const API = axios.create({
  baseURL: "https://weather-information-app-ix1s.onrender.com/api",
});


export default API;
