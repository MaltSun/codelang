import axios from "axios";

const api = axios.create({
  baseURL: "https://codelang.vercel.app",
});

export default api;
