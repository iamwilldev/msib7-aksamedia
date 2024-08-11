import axios from "axios";

const isDevelopment = false;
const axiosClient1 = axios.create({
  baseURL: isDevelopment
    ? "http://127.0.0.1:8000/api"
    : "https://aksamedia2.kai-dev.my.id/api",
});
const axiosClient2 = axios.create({
  baseURL: isDevelopment
    ? "http://127.0.0.1:8001/api"
    : "https://aksamedia3.kai-dev.my.id/api",
});

const setupInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      try {
        const { response } = error;
        if (response.status === 401) {
          localStorage.removeItem("ACCESS_TOKEN");
        }
      } catch (error) {
        console.error(error);
      }
      throw error;
    }
  );
};

setupInterceptors(axiosClient1);
setupInterceptors(axiosClient2);

export { axiosClient1, axiosClient2 };
