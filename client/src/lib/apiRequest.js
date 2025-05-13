import axios from "axios";

// Dynamically set the base URL based on environment
const apiRequest = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? "https://spacekc.onrender.com/api"  // Production base URL
    : "http://localhost:8000/api",         // Local development base URL
  withCredentials: true, // If you need to handle cookies/sessions
});

export default apiRequest;
