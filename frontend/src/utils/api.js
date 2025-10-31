import axios from "axios";

export const API = axios.create({
  baseURL: "https://fastor-restaurant-app.onrender.com/api", // your backend base URL
});
