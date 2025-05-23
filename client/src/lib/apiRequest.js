import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? "https://spacekc-ajy7.onrender.com/api" // Match frontend URL
    : "http://localhost:8000/api",
  withCredentials: true,
});

export default apiRequest;
