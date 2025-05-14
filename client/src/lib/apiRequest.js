import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? "https://spacekc-ajy7.onrender.com/api"   // ✅ Actual backend URL on Render
    : "http://localhost:8000/api",         // ✅ Local backend for dev
  withCredentials: true, // ✅ Needed for cookies/auth headers
});

export default apiRequest;
