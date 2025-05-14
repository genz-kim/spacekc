import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? "https://spacekc-ajy7.onrender.com/api" // This should match your actual backend URL
    : "http://localhost:8000/api",
  withCredentials: true,
});

export default apiRequest;
