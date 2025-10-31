import axios from "axios";

export const API = axios.create({
  baseURL: "/api", // ✅ use relative path
});
