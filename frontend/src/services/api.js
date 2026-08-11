import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const storeWeatherData = async (weatherRequest) => {
  const response = await api.post(
    "/store-weather-data",
    weatherRequest
  );

  return response.data;
};

export const listWeatherFiles = async () => {
  const response = await api.get(
    "/list-weather-files"
  );

  return response.data;
};

export const getWeatherFileContent = async (filename) => {
  const response = await api.get(
    `/weather-file-content/${encodeURIComponent(filename)}`
  );

  return response.data;
};

export default api;