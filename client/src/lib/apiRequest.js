import axios from "axios";

const apiRequest = axios.create({
  baseURL:
    import.meta.env.PROD
      ? "https://homes-api-7oh9.onrender.com/api" // ✅ your actual backend API
      : "http://localhost:8000/api",              // ✅ for local development
  withCredentials: true,
});

export default apiRequest;
