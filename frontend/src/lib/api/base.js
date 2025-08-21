import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: "https://countcorner-backend.vercel.app",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  function (config) {
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
