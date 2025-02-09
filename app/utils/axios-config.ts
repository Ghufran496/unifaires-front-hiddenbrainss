import { getSession } from 'next-auth/react';
import config from './config';
import axios from 'axios';

// Singleton instance of Axios Auth Client
let axiosAuthClientInstance: ReturnType<typeof axiosAuthClient> | null = null;

/**
 * Get Axios Auth Client Instance
 * @dev - critical wrapper for handling api authorization to the backend
 *
 * Returns the singleton instance of the Axios Auth Client. If the instance
 * does not exist, it creates one.
 *
 * @returns {AxiosInstance} The singleton Axios instance.
 */
export const getAxiosAuthClientInstance = () => {
  if (!axiosAuthClientInstance) {
    axiosAuthClientInstance = axiosAuthClient();
  }
  return axiosAuthClientInstance;
};

/**
 * Axios Auth Client
 *
 * Creates an Axios instance configured to include the authorization token
 * from the NextAuth session in the request headers. This instance is created
 * once and reused throughout the application.
 *
 * @returns {AxiosInstance} The configured Axios instance.
 */
const axiosAuthClient = () => {
  const axiosInstance = axios.create({
    baseURL: config.API.API_URL,
  });

  axiosInstance.interceptors.request.use(async (config) => {
    const session = await getSession();

    if (session?.user?.token) {
      config.headers['x-token'] = session?.user?.token;
    }

    return config;
  });

  return axiosInstance;
};

export default getAxiosAuthClientInstance();
