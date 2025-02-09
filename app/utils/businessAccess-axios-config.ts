import axios from "axios";
import { getSession } from "next-auth/react";
import config from "./config";

const axiosAccessInstance = axios.create({
  baseURL: config.API.API_URL,
});

axiosAccessInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  const businessAccess = (session && session.user.businessAccess) || null;

  if (
    typeof session?.user?.token === "string" &&
    session.user.token.trim() !== ""
  ) {
    config.headers["x-token"] = session.user.token;
    if (businessAccess !== null) {
      config.headers["owner-type"] = businessAccess?.ownerType;
      config.headers["owners-id"] = businessAccess?.ownersId;
    }
  }

  return config;
});

export default axiosAccessInstance;
