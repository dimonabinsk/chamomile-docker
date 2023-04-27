import axios from "axios";
import { toast } from "react-toastify";
import config from "../config/config.json";
import authService from "./auth.service";
import localStorageService from "./localStorage.service";

const http = axios.create({
  baseURL: config.API_BASE_URL,
});

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpired = refreshToken && expiresDate < Date.now();

    if (isExpired) {
      const data = await authService.refresh();
      localStorageService.setTokens(data);
    }

    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    res.data = { content: res.data };
    return res;
  },
  function (e) {
    const isExpectedError =
      e.response && e.response.status >= 400 && e.response.status < 500;
    if (!isExpectedError) {
      console.log(e);
      toast.error(
        "Произошла непредвиденная ошибка, пожалуйста, попробуйте зайти позже"
      );
    }
    return Promise.reject(e);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
