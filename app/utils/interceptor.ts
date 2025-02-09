import axios from "axios";
import config from "./config";

export const api = axios.create({
  baseURL: config.API.API_URL,
});

const addAuthorizationHeader = (config: any) => {
  const userToken: any = localStorage.getItem("token");
  config.headers.set("x-token", userToken);

  return config;
};

api.interceptors.request.use(addAuthorizationHeader);
