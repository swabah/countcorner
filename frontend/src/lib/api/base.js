import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);

export default axiosInstance;
