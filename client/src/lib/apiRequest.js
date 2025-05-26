import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? " https://homes-7oh9.onrender.com" // Match frontend URL
    : "http://localhost:8000/api",
  
  withCredentials: true,
});

export default apiRequest;
