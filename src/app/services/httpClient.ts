import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
import sleep from "../../utils/sleep";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})


httpClient.interceptors.request.use(async (config) => {
  await sleep(300);

  const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (storedAccessToken) {
    config.headers.Authorization = `Bearer ${storedAccessToken}`;
  }

  return config;
})