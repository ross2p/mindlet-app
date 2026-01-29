import axios from "axios";

interface ClientConfig {
  baseUrl: string;
}

export const getApiClient = ({ baseUrl }: ClientConfig) => {
  const client = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return client;
};
